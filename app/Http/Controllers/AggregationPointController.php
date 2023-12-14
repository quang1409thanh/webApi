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
        $aggregationPoints = AggregationPoint::all();
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
            'province' => $request->input('province', 'default $aggregationPoint'),
            'district' => $request->input('district', 'default $aggregationPoint'),
            'ward' => $request->input('ward', 'default $aggregationPoint'),
            'detailed_address' => $request->input('detailed_address', 'default $aggregationPoint'),
        ]);
        return response()->json([
            'message' => "tạo điểm giao dịch thành công bạn ơi.",
            'aggregationPoint' => $aggregationPoint,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $aggregationPoint = AggregationPoint::findOrFail($id);
        return response()->json(['aggregationPoint' => $aggregationPoint]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $aggregationPoint = AggregationPoint::findOrFail($id);

        $aggregationPoint->update([
            'name' => $request->name,
            'code' => $request->code,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'operatingHours' => $request->operatingHours,
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => "Cập nhật điểm giao dịch thành công.",
            'aggregationPoint' => $aggregationPoint,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $aggregationPoint = AggregationPoint::findOrFail($id);
        $aggregationPoint->delete();

        return response()->json(['message' => 'Xóa điểm tập kết thành công.']);
    }
}
