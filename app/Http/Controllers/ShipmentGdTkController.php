<?php

namespace App\Http\Controllers;

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

        // Tạo túi hàng mới với các giá trị từ request
        $shipment = ShipmentGDTK::create([
            'status' => $status,
            'sending_transaction_point_id' => $sendingTransactionPointId,
            'receiving_aggregation_point_id' => $receivingAggregationPointId,
        ]);

        // Cập nhật trạng thái và shipment_id cho từng đơn hàng
        foreach ($goodIds as $goodId) {
            $good = Good::find($goodId);

            $history = $good->history ?? [];

            // Thêm trạng thái mới vào lịch sử
            $history[] = [
                'status' => $good->status,
                'updated_at' => now(),
            ];

            $good->update([
                'status' => 'Đang gửi lên điểm tập kết', // Cập nhật theo trạng thái mong muốn
                'shipment_id' => $shipment->id,
                'history' => $history,
            ]);
        }

        return response()->json(['message' => 'Túi hàng đã được tạo và cập nhật đơn hàng thành công']);
    }

    public function list_outgoing_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            $shipmentGdTk = ShipmentGdTk::where('sending_transaction_point_id', $transactionOfficer->id)
                ->get();

            // Initialize an array to store the results
            $resultArray = [];

            // Loop through each shipment and add the required fields to the result array
            foreach ($shipmentGdTk as $shipment) {
                $resultArray[] = [
                    'shipmentGdTk' => $shipment,
                    'sending_transaction_point' => $shipment->sendingTransactionPoint,
                    'receiving_aggregation_point' => $shipment->receivingAggregationPoint,
                    // Add other fields from $shipment as needed
                ];
            }

            return response()->json(['shipmentGdTk' => $resultArray]);
        } else {
            return response()->json(['message' => 'Không có giá trị nào!']);
        }

    }

}
