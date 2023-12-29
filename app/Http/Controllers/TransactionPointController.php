<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\AggregationPoint;
use Illuminate\Http\Request;
use App\Models\TransactionPoint;
use Illuminate\Support\Facades\Auth;

class TransactionPointController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactionPoints = TransactionPoint::with('address', 'transactionPointHead.user')->get();
        return response()->json(['transactionPoints' => $transactionPoints]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /**
         * validate:
         */
        // thieu validate de id khong tang linh tinh.
        //
        if (Auth::user()->isCompanyLeader()) {
            $transactionPoint = TransactionPoint::create([
                'name' => $request->name,
                'code' => $request->code, // ten viet tat cua tinh hien tai
                'phone' => $request->phone,
                'email' => $request->email,
                'operatingHours' => $request->operatingHours,
                'aggregation_point_id' => $request->aggregation_point_id,
                'status' => $request->status,
                'notes' => $request->notes,
                'capacity' => $request->capacity,
                'current_load' => $request->current_load,
            ]);
            $transactionPoint->address()->create([
                'province' => $request->input('province', 'default $transactionPoint'),
                'district' => $request->input('district', 'default $transactionPoint'),
                'ward' => $request->input('ward', 'default $transactionPoint'),
                'detailed_address' => $request->input('detailed_address', 'default $transactionPoint'),
            ]);
            return response()->json([
                'message' => "tạo điểm giao dịch thành công !!!",
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transactionPoint = TransactionPoint::with(['address', 'aggregationPoint.address'])->findOrFail($id);;
        return response()->json(['transactionPoint' => $transactionPoint]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        // Lấy thông tin điểm tập kết và địa chỉ liên kết
        $transactionPoint = TransactionPoint::with('address')->findOrFail($id);

        // Cập nhật thông tin điểm tập kết
        $transactionPoint->update([
            'name' => $request->name,
            'code' => $request->code,
            'phone' => $request->phone,
            'email' => $request->email,
            'operatingHours' => $request->operatingHours,
            'aggregation_point_id' => $request->aggregation_point_id,
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        // Cập nhật thông tin địa chỉ liên kết (hoặc tạo mới nếu chưa tồn tại)
        $transactionPoint->address->update([
            'province' => $request->input('province', $transactionPoint->address->province),
            'district' => $request->input('district', $transactionPoint->address->district),
            'ward' => $request->input('ward', $transactionPoint->address->ward),
            'detailed_address' => $request->input('detailed_address', $transactionPoint->address->detailed_address),
        ]);

        return response()->json([
            'message' => "Cập nhật điểm giao dịch thành công.",
            'transactionPoint' => $transactionPoint,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transactionPoint = TransactionPoint::with('address')->findOrFail($id);

        $address = $transactionPoint->address;

        $transactionPoint->delete();

        if ($address) {
            $address->delete();
        }

        return response()->json(['message' => 'Xóa điểm giao dịch thành công.']);
    }
}
