<?php

namespace App\Http\Controllers;

use App\Models\Good;
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

        $transactionPoint = TransactionPoint::find(2);
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
            $goods = Good::where('sending_transaction_point_id', $transactionOfficer->id)
                ->get();

            return response()->json(['goods' => $goods]);
        } else {
            return response()->json(['message' => 'Không có giá trị nào!']);
        }
    }
}
