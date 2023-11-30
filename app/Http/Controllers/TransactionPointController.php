<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransactionPoint;

class TransactionPointController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactionPoints = TransactionPoint::all();
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
        $transactionPoint = TransactionPoint::create([
            'name' => $request->name,
            'code' => $request->code, // ten viet tat cua tinh hien tai
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'operatingHours' => $request->operatingHours,
            'aggregation_point_id' => $request->aggregation_point_id,
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'message' => "tạo điểm giao dịch thành công bạn ơi.",
            'transactionPoint' => $transactionPoint,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transactionPoint = TransactionPoint::findOrFail($id);
        return response()->json(['transactionPoint' => $transactionPoint]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $transactionPoint = TransactionPoint::findOrFail($id);

        $transactionPoint->update([
            'name' => $request->name,
            'code' => $request->code,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'operatingHours' => $request->operatingHours,
            'aggregation_point_id' => $request->aggregation_point_id,
            'status' => $request->status,
            'notes' => $request->notes,
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
        $transactionPoint = TransactionPoint::findOrFail($id);
        $transactionPoint->delete();

        return response()->json(['message' => 'Xóa điểm giao dịch thành công.']);
    }
}
