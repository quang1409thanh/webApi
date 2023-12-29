<?php

namespace App\Http\Controllers;

use App\Models\Good;
use App\Models\ShipmentTkGd;
use App\Models\ShipmentTkTk;
use App\Models\TransactionPoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShipmentTkGdController extends Controller
{
    //
    public function createShipment(Request $request)
    {
        // Lấy danh sách các ID đơn hàng từ request
        $goodIds = $request->input('good_ids', []);
        // Lấy giá trị từ request
        $status = $request->input('status');
        $sendingAggregationPointId = $request->input('sending_aggregation_point_id');
        $receivingTransactionPointId = $request->input('receiving_transaction_point_id');

        $transactionReceive = TransactionPoint::find($receivingTransactionPointId);
        // Tạo túi hàng mới với các giá trị từ request
        $shipment = ShipmentTkGd::create([
            'status' => $status,
            'sending_aggregation_point_id' => $sendingAggregationPointId,
            'receiving_transaction_point_id' => $receivingTransactionPointId,
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
                'status' => 'Đang gửi về điểm giao dịch nhận ' . $transactionReceive->name, // Cập nhật theo trạng thái mong muốn
                'shipment_id_tk_gd' => $shipment->id,
                'history' => $history,
            ]);
        }


        return response()->json(['message' => 'Shipment created successfully'], 200);
    }

    public function list_incoming_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            $shipmentGdTk = ShipmentTkGd::with(['sendingAggregationPoint', 'receivingTransactionPoint'])
                ->where('receiving_transaction_point_id', $transactionOfficer->transaction_point_id)
                ->get();

            return response()->json(['shipmentTkGd' => $shipmentGdTk]);
        } else {
            return response()->json(['message' => 'Không có giá trị nào!']);
        }

    }

    public function accept($id)
    {
        // Check if the shipment with the given ID exists
        $shipment = ShipmentTkGd::find($id);

        $transactionReceive = TransactionPoint::find($shipment->receiving_transaction_point_id);
        if (!$shipment) {
            return response()->json(['message' => 'Không tìm thấy túi hàng']);
        }
        $shipment->update([
            'status' => 'chuyển thành công',
        ]);

        // Retrieve goods associated with the shipment
        $goods = Good::where('shipment_id_tk_gd', $id)->get();

        // Cập nhật trạng thái và shipment_id_gd_tk cho từng đơn hàng
        foreach ($goods as $good) {

            $history = json_decode($good->history, true) ?? [];

            // Thêm trạng thái mới vào lịch sử
            $history[] = [
                'status' => $good->status,
                'updated_at' => now(),
            ];
            $good->update([
                'status' => 'Đang gửi về điểm giao dịch nhận ' . $transactionReceive->name,
                'history' => json_encode($history), // Encode lại thành JSON để lưu vào cơ sở dữ liệu
            ]);
            $good->currentLocation()->associate($transactionReceive);
            $good->save();
        }

        return response()->json(['message' => 'Cập nhật đơn hàng thành công']);
    }

}
