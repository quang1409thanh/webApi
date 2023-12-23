<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AggregationPoint;

class AggregationPointController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $aggregationPoints = AggregationPoint::with('address', 'aggregationPointHead.user')->get();
        return response()->json(['aggregationPoints' => $aggregationPoints]);
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
        $aggregationPoint = AggregationPoint::create([
            'name' => $request->name,
            'code' => $request->code, // ten viet tat cua tinh hien tai
            'phone' => $request->phone,
            'email' => $request->email,
            'operatingHours' => $request->operatingHours,
            'status' => $request->status,
            'notes' => $request->notes,
            'capacity' => $request->capacity,
            'current_load' => $request->current_load,
        ]);
        $aggregationPoint->address()->create([
            'province' => $request->input('province', 'default $aggregation'),
            'district' => $request->input('district', 'default $aggregation'),
            'ward' => $request->input('ward', 'default $aggregation'),
            'detailed_address' => $request->input('detailed_address', 'default $aggregation'),
        ]);
        return response()->json([
            'message' => "tạo điểm tập kết thành công !!!",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $aggregationPoint = AggregationPoint::with('address', 'aggregationPointHead.user')->findOrFail($id);
        //        dd($aggregationPoint);
        return response()->json(['aggregation' => $aggregationPoint]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $aggregationPoint = AggregationPoint::with('address')->findOrFail($id);

        // Update AggregationPoint data
        $aggregationPoint->update([
            'name' => $request->name,
            'code' => $request->code,
            'phone' => $request->phone,
            'email' => $request->email,
            'operatingHours' => $request->operatingHours,
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        // Update Address data if it exists
        if ($aggregationPoint->address) {
            $aggregationPoint->address->update([
                'province' => $request->input('province', $aggregationPoint->address->province),
                'district' => $request->input('district', $aggregationPoint->address->district),
                'ward' => $request->input('ward', $aggregationPoint->address->ward),
                'detailed_address' => $request->input('detailed_address', $aggregationPoint->address->detailed_address),
            ]);
        }

        return response()->json([
            'message' => "Cập nhật điểm giao dịch thành công.",
            'aggregation' => $aggregationPoint,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Lấy thông tin điểm tập kết và địa chỉ liên kết
        $aggregationPoint = AggregationPoint::with('address')->findOrFail($id);
        $address = $aggregationPoint->address;

        // Xóa bản ghi trong bảng AggregationPoint
        $aggregationPoint->delete();

        // Nếu tồn tại địa chỉ liên kết, xóa nó
        if ($address) {
            $address->delete();
        }

        return response()->json(['message' => 'Xóa điểm tập kết thành công.']);
    }
}
