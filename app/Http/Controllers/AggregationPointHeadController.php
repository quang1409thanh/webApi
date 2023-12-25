<?php

namespace App\Http\Controllers;

use App\Models\TransactionPoint;
use App\Models\User;
use App\Models\AggregationPointHead;
use http\Env\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class AggregationPointHeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $aggregationPointHead = AggregationPointHead::with('user')->get();

        return response()->json(['aggregationPointHead' => $aggregationPointHead]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $aggregationPointHead = $user->aggregationPointHead()->create([
            'aggregation_point_id' => $request->aggregation_point_id,
            'phone' => $request->phone,
            'details' => $request->details,
        ]);
        $aggregationPointHead->address()->create([
            'province' => $request->input('province', 'default aggregationPointHead'),
            'district' => $request->input('district', 'default aggregationPointHead'),
            'ward' => $request->input('ward', 'default aggregationPointHead'),
            'detailed_address' => $request->input('detailed_address', 'default aggregationPointHead'),
        ]);
        return response()->json([
            'message' => "tao tai khoan thanh cong !",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $aggregationPointHead = AggregationPointHead::with('user')->findOrFail($id);
        return response()->json($aggregationPointHead);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        // xử lý sau
        // Validate if the aggregation_point_id is available
//        $exists = AggregationPointHead::where('aggregation_point_id', $request->aggregation_point_id)
//            ->exists();
//        if ($exists) {
//            // Trả về thông báo lỗi hoặc thực hiện xử lý phù hợp
//            return response()->json([
//                'error' => 'Aggregation Point already has a head.',
//            ], 422); // 422 là mã lỗi không hợp lệ (Unprocessable Entity)
//        }

        // If the aggregation_point_id is available, proceed with the update
        $aggregationPointHead = AggregationPointHead::with('user')->findOrFail($id);
        $aggregationPointHead->user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Cập nhật thông tin trong bảng CompanyLeader
        $aggregationPointHead->update([
            'aggregation_point_id' => $request->aggregation_point_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'details' => $request->details,
        ]);

        return response()->json([
            'message' => 'Cập nhật thành công!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $aggregationPointHead = AggregationPointHead::with('user')->findOrFail($id);
        $aggregationPointHead->delete();

        // Xóa thông tin trong bảng User
        $aggregationPointHead->user->delete();

        return response()->json([
            'message' => 'Xóa tài khoản thành công!',
        ]);
    }

    public function listTransaction() {
        $user = Auth::user();
        $id = $user->aggregationPointHead()->value('id');
        $transactionList = TransactionPoint::where('aggregation_point_id', $id)->get();
        return $transactionList;
    }
}
