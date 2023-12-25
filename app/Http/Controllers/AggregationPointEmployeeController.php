<?php

namespace App\Http\Controllers;

use App\Models\AggregationPointEmployee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AggregationPointEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() // GET
    {
        $user = Auth::user();

        if ($user->relationLoaded('aggregationPointHead')) {
            // Lấy giá trị của aggregation_point_head có user_id tương ứng
            $aggregationPointHead = $user->aggregationPointHead;

            // Lấy ra những AggregationPointEmployee có aggregation_point_id giống với aggregationPointHead
            $aggregationPointEmployee = AggregationPointEmployee::with('user')
                ->where('aggregation_point_id', $aggregationPointHead->aggregation_point_id)
                ->get();

            return response()->json(['aggregationPointEmployee' => $aggregationPointEmployee]);

        } else {
            return response()->json(['message' => 'Khong có giá trị nào !'],);

        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) //POST
    {
        //
        if (Auth::user()->isAggregationPointHead()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user->aggregationPointEmployee()->create([
                'aggregation_point_id' => $request->aggregation_point_id,
                'phone' => $request->phone,
                'position' => $request->position,
                'address' => $request->address,
                'details' => $request->details,
            ]);
            return response()->json([
                'message' => "tao tai khoan thanh cong !",
            ]);
        } else {
            return response()->json(['error' => 'Khong du quyen han !'], 403);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) //GET
    {
        //
        $aggregationPointEmployee = AggregationPointEmployee::with('user')->find($id);

        if (!$aggregationPointEmployee) {
            return response()->json(['error' => 'Không tìm thấy nhân viên giao dịch'], 404);
        }

        return response()->json(['aggregationPointEmployee' => $aggregationPointEmployee]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) //PUT
    {
        //
        $aggregationPointEmployee = AggregationPointEmployee::find($id);

        if (!$aggregationPointEmployee) {
            return response()->json(['error' => 'Không tìm thấy nhân viên giao dịch'], 404);
        }

        if (Auth::user()->isAggregationPointHead()) {
            $aggregationPointEmployee->user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $aggregationPointEmployee->update([
                'aggregation_point_id' => $request->aggregation_point_id,
                'phone' => $request->phone,
                'position' => $request->position,
                'address' => $request->address,
                'details' => $request->details,
            ]);

            return response()->json(['message' => 'Cập nhật thông tin nhân viên giao dịch thành công!']);
        } else {
            return response()->json(['error' => 'Không đủ quyền hạn'], 403);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            $aggregationPointEmployee = AggregationPointEmployee::with('user')->findOrFail($id);

            if (Auth::user()->isAggregationPointHead()) {
                // Delete the TransactionOfficer record
                $aggregationPointEmployee->delete();

                // Delete the associated user record
                $aggregationPointEmployee->user->delete();
                // You may also want to delete associated records or perform other cleanup tasks.

                return response()->json(['message' => 'Xóa nhân viên giao dịch thành công!']);
            } else {
                return response()->json(['error' => 'Không đủ quyền hạn'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa nhân viên giao dịch.'], 500);
        }

    }
}
