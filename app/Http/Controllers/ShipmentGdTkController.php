<?php

namespace App\Http\Controllers;

use App\Models\AggregationPoint;
use App\Models\AggregationPointEmployee;
use App\Models\Good;
use App\Models\ShipmentGdTk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShipmentGdTkController extends Controller
{
    public function createShipment(Request $request)
    {
        // Lấy danh sách các ID đơn hàng từ request
        $goodIds = $request->input('good_ids', []);
        // Lấy giá trị từ request
        $status = $request->input('status');
        $sendingTransactionPointId = $request->input('sending_transaction_point_id');
        $receivingAggregationPointId = $request->input('receiving_aggregation_point_id');

        $aggregationPoint = AggregationPoint::find($receivingAggregationPointId);
        // Tạo túi hàng mới với các giá trị từ request
        $shipment = ShipmentGDTK::create([
            'status' => $status,
            'sending_transaction_point_id' => $sendingTransactionPointId,
            'receiving_aggregation_point_id' => $receivingAggregationPointId,
        ]);

        // Cập nhật trạng thái và shipment_id_gd_tk cho từng đơn hàng
        foreach ($goodIds as $goodId) {
            $good = Good::find($goodId);

            // Kiểm tra nếu history là một chuỗi, chuyển đổi thành mảng
            $history = is_array($good->history) ? $good->history : json_decode($good->history, true) ?? [];

            // Thêm trạng thái mới vào lịch sử
            $history[] = [
                'status' => $good->status,
                'updated_at' => now(),
            ];

            // Cập nhật thông tin đơn hàng
            $good->update([
                'status' => 'Đang gửi lên điểm tập kết ' . $aggregationPoint->name, // Cập nhật theo trạng thái mong muốn
                'shipment_id_gd_tk' => $shipment->id,
                'history' => $history,
            ]);
        }


        return response()->json(['message' => 'Shipment created successfully'], 200);
    }


    public function accept($id)
    {
        // Check if the shipment with the given ID exists
        $shipment = ShipmentGdTk::find($id);
        $aggregationPoint = AggregationPoint::find($shipment->receiving_aggregation_point_id);

        if (!$shipment) {
            return response()->json(['message' => 'Không tìm thấy túi hàng']);
        }
        $shipment->update([
            'status' => 'chuyển thành công',
        ]);

        // Retrieve goods associated with the shipment
        $goods = Good::where('shipment_id_gd_tk', $id)->get();

        // Cập nhật trạng thái và shipment_id_gd_tk cho từng đơn hàng
        foreach ($goods as $good) {
            // Decode existing history JSON data, or initialize an empty array
            $history = json_decode($good->history, true) ?? [];

            // Thêm trạng thái mới vào lịch sử
            $history[] = [
                'status' => $good->status,
                'updated_at' => now(),
            ];

            // Cập nhật thông tin của đơn hàng
            $good->update([
                'status' => 'Đã gửi đến điểm tập kết ' . $aggregationPoint->name,
                'history' => json_encode($history), // Encode lại thành JSON để lưu vào cơ sở dữ liệu
            ]);

            $good->currentLocation()->associate($aggregationPoint);
            $good->save();

        }

        return response()->json(['message' => 'Cập nhật đơn hàng thành công']);
    }


    public function list_outgoing_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            $shipmentGdTk = ShipmentGdTk::with(['sendingTransactionPoint', 'receivingAggregationPoint'])
                ->where('sending_transaction_point_id', $transactionOfficer->transaction_point_id)
                ->get();

            return response()->json(['shipmentGdTk' => $shipmentGdTk]);
        } else {
            return response()->json(['message' => 'Không có giá trị nào!']);
        }

    }

    public function list_incoming_from_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('aggregationPointEmployee')) {
            $aggregationPointEmployee = $user->aggregationPointEmployee;

            $shipmentGdTk = ShipmentGdTk::with(['sendingTransactionPoint', 'receivingAggregationPoint'])
                ->where('receiving_aggregation_point_id', $aggregationPointEmployee->aggregation_point_id)
                ->get();

            return response()->json(['shipmentGdTk' => $shipmentGdTk]);
        } else {
            return response()->json(['message' => 'Không có giá trị nào!']);
        }
    }

    public function list_outgoing_transaction_detail($id)
    {
        try {
            // Truy vấn dữ liệu từ cơ sở dữ liệu sử dụng ID
            $goods = Good::where('shipment_id_gd_tk', $id)
                ->get();
            // Trả về dữ liệu dưới dạng JSON hoặc tùy thuộc vào yêu cầu của bạn
            return response()->json(['goods' => $goods]);
        } catch (\Exception $e) {
            // Xử lý nếu có lỗi xảy ra
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function list_good_from_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('aggregationPointEmployee')) {
            $aggregationPointEmployee = $user->aggregationPointEmployee;

            // Lấy tất cả các ShipmentGdTk có status là "chuyển thành công đến điểm tập kết"
            $shipments = ShipmentGdTk::where('receiving_aggregation_point_id', $aggregationPointEmployee->aggregation_point_id)
                ->where('status', 'chuyển thành công')
                ->get();

            // Kiểm tra nếu có shipments
            if ($shipments->count() > 0) {
                // Tạo mảng để lưu trữ tất cả các good tương ứng
                $allGoods = [];

                foreach ($shipments as $shipment) {
                    // Lấy tất cả các good có trường shipment_id_gd_tk là ID của shipmentGdTk
                    $goods = Good::where('shipment_id_gd_tk', $shipment->id)->get();

                    // Thêm các good vào mảng tổng hợp
                    $allGoods = array_merge($allGoods, $goods->toArray());
                }

                return response()->json(['goods' => $allGoods], 200);
            } else {
                return response()->json(['message' => 'Không có shipment nào có status là "chuyển thành công đến điểm tập kết"'], 404);
            }
        } else {
            return response()->json(['message' => 'Không có giá trị nào!'], 404);
        }
    }
}
