<?php

namespace App\Http\Controllers;

use App\Models\Good;
use App\Models\ShipmentTkGd;
use App\Models\TransactionPoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class GoodController extends Controller
{
    //

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => "ping thanh cong",
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|unique:goods',
            'sending_transaction_point_id' => 'nullable|exists:transaction_points,id',
            'receiving_transaction_point_id' => 'nullable|exists:transaction_points,id',
            'sender_name' => 'nullable',
            'receiver_name' => 'nullable',
            'shipment_id' => 'nullable',
            'goods_information' => 'nullable',
            'package_type' => 'nullable',
            'weight' => 'nullable',
            'instructions_send' => 'nullable',
            'instructions_staff' => 'nullable',
            'service' => 'nullable',
            'main_fee' => 'nullable',
            'surcharge' => 'nullable',
            'collection_fee' => 'nullable',
            'status' => 'required|in:Chấp nhận gửi,Đang gửi,Đã gửi,Đang giao hàng,Hoàn thành giao hàng,Giao hàng thất bại',
            'history' => 'nullable',
            'current_location_id' => 'nullable',
            'current_location_type' => 'nullable'
        ]);

        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;
            $id = $transactionOfficer->transaction_point_id;
        } else $id = 1;
        $transactionPoint = TransactionPoint::find($id);
        // Tạo giá trị status mới với tên điểm giao dịch
        $status = 'Chấp nhận gửi tại địa điểm giao dịch ' . $transactionPoint->name;

        // Gán giá trị status vào dữ liệu
        $data['status'] = $status;


        // Tìm điểm giao dịch mới
        // Tạo mã ngẫu nhiên cho đơn hàng
        $randomCode = preg_replace('/[^A-Za-z0-9]/', '', Str::random(30));

        $good = new Good;
        $good->fill($data);
        $good->code = $randomCode; // Gán mã ngẫu nhiên cho trường code
        $good->currentLocation()->associate($transactionPoint);
        $good->save();
        return response()->json(['good' => $good], 201);
    }

// Hàm hiển thị chi tiết một đơn hàng
    public function show($id)
    {
        $good = Good::find($id);

        if (!$good) {
            return response()->json(['error' => 'Đơn hàng không tồn tại'], 404);
        }

        return response()->json(['good' => $good], 200);
    }

// Hàm cập nhật một đơn hàng
    public function update(Request $request, $id)
    {
        $good = Good::find($id);

        if (!$good) {
            return response()->json(['error' => 'Đơn hàng không tồn tại'], 404);
        }

        $data = $request->validate([
            'current_location_id' => 'nullable',
            'current_location_type' => 'nullable'
        ]);

        $currentLocation = $data['current_location_type']::find($data['current_location_id']);

        if (!$currentLocation) {
            return response()->json(['error' => 'Vị trí hiện tại không tồn tại'], 404);
        }

        $good->currentLocation()->associate($currentLocation);
        $good->save();

        return response()->json(['good' => $good], 200);
    }

    public function destroy($id)
    {
        $good = Good::find($id);

        if (!$good) {
            return response()->json(['error' => 'Đơn hàng không tồn tại'], 404);
        }

        $good->delete();

        return response()->json(['message' => 'Đơn hàng đã được xóa'], 200);
    }

    public function send_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            // Lấy giá trị của transactionOfficer có user_id tương ứng
            $transactionOfficer = $user->transactionOfficer;

            // Lấy ra những Goods có sending_transaction_point_id giống với transactionOfficer
            $goods = Good::with(['sendingTransactionPoint', 'receivingTransactionPoint'])->where('sending_transaction_point_id', $transactionOfficer->transaction_point_id)
                ->get();
            return response()->json(['goods' => $goods]);
        } else {
            return response()->json(['message' => 'Không có giá trị nào!']);
        }
    }

    public function receive_transaction()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            // Lấy tất cả các ShipmentGdTk có status là "chuyển thành công đến điểm tập kết"
            $shipments = ShipmentTKGd::where('receiving_transaction_point_id', $transactionOfficer->transaction_point_id)
                ->where('status', 'chuyển thành công')
                ->get();

            // Kiểm tra nếu có shipments
            if ($shipments->count() > 0) {
                // Tạo mảng để lưu trữ tất cả các good tương ứng
                $allGoods = [];

                foreach ($shipments as $shipment) {
                    // Lấy tất cả các good có trường shipment_id_gd_tk là ID của shipmentGdTk
                    $goods = Good::with(['sendingTransactionPoint', 'receivingTransactionPoint'])->where('shipment_id_tk_gd', $shipment->id)->get();

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


    public function search_good_by_code($code)
    {
        // Truy vấn CSDL để lấy đơn hàng có mã trường code
        $good = Good::with(['sendingTransactionPoint.address', 'receivingTransactionPoint.address', 'currentLocation'])->where('code', $code)->first();
        return $good;
    }


    public function change_status(Request $request)
    {
        try {
            $goodIds = $request->input('good_ids', []);
            $type = $request->input('type');

            foreach ($goodIds as $goodId) {
                $good = Good::find($goodId);

                if (!$good) {
                    return response()->json(['error' => 'Good not found'], 404);
                }

                // Kiểm tra nếu history là một chuỗi, chuyển đổi thành mảng
                $history = is_array($good->history) ? $good->history : json_decode($good->history, true) ?? [];

                // Thêm trạng thái mới vào lịch sử
                $history[] = [
                    'status' => $good->status,
                    'updated_at' => now(),
                ];

                $newStatus = '';
                switch ($type) {
                    case 'success':
                        $newStatus = 'chuyển thành công đến người nhận';
                        break;
                    case 'failure':
                        $newStatus = 'chuyển thất bại đến người nhận';
                        break;
                    case 'loss':
                        $newStatus = 'đơn hàng bị thất lạc';
                        break;
                    // Add more cases as needed
                    case 'custom_case_1':
                        $newStatus = 'Custom Case 1';
                        break;
                    case 'custom_case_2':
                        $newStatus = 'Custom Case 2';
                        break;
                    default:
                        // Handle default case or leave it empty
                        return response()->json(['error' => 'Invalid type'], 400);
                }

                $good->update([
                    'status' => $newStatus,
                    'history' => $history,
                ]);
            }

            return response()->json(['message' => 'Status updated successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function list_good_send_success()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            $goods = Good::with(['sendingTransactionPoint', 'receivingTransactionPoint'])
                ->where("receiving_transaction_point_id", $transactionOfficer->transaction_point_id)
                ->where('status', 'chuyển thành công đến người nhận')
                ->get();

            if ($goods->isEmpty()) {
                return response()->json(['message' => 'Không có hàng hoá nào thỏa mãn điều kiện.'], 404);
            }

            return response()->json(['goods' => $goods]);
        }

        // Nếu không có thông tin về transaction officer
        return response()->json(['error' => 'Không tìm thấy thông tin về người giao dịch.'], 404);
    }

    public function list_good_send_failure()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            $goods = Good::with(['sendingTransactionPoint', 'receivingTransactionPoint'])
                ->where("receiving_transaction_point_id", $transactionOfficer->transaction_point_id)
                ->where('status', 'chuyển thất bại đến người nhận')
                ->get();

            if ($goods->isEmpty()) {
                return response()->json(['message' => 'Không có hàng hoá nào thỏa mãn điều kiện.'], 404);
            }

            return response()->json(['goods' => $goods]);
        }

        // Nếu không có thông tin về transaction officer
        return response()->json(['error' => 'Không tìm thấy thông tin về người giao dịch.'], 404);
    }

    public function list_good_send_loss()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionOfficer')) {
            $transactionOfficer = $user->transactionOfficer;

            $goods = Good::with(['sendingTransactionPoint', 'receivingTransactionPoint'])
                ->where("receiving_transaction_point_id", $transactionOfficer->transaction_point_id)
                ->where('status', 'đơn hàng bị thất lạc')
                ->get();

            if ($goods->isEmpty()) {
                return response()->json(['message' => 'Không có hàng hoá nào thỏa mãn điều kiện.'], 404);
            }

            return response()->json(['goods' => $goods]);
        }

        // Nếu không có thông tin về transaction officer
        return response()->json(['error' => 'Không tìm thấy thông tin về người giao dịch.'], 404);
    }
}
