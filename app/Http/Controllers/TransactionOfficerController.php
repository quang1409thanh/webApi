<?php

namespace App\Http\Controllers;

use App\Models\AggregationPoint;
use App\Models\TransactionOfficer;
use App\Models\TransactionPointHead;
use App\Models\TransactionPoint;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use JetBrains\PhpStorm\NoReturn;

class TransactionOfficerController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();

        if ($user->relationLoaded('transactionPointHead')) {
            // Lấy giá trị của aggregation_point_head có user_id tương ứng
            $transactionPointHead = $user->transactionPointHead;

            $transactionOfficer = TransactionOfficer::with('user')
                ->where('transaction_point_id', $transactionPointHead->transaction_point_id)
                ->get();

            return response()->json(['transactionOfficer' => $transactionOfficer]);

        } else {
            return response()->json(['message' => 'Khong có giá trị nào !'],);

        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->isTransactionPointHead()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $user->transactionOfficer()->create([
                'transaction_point_id' => $request->transaction_point_id,
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

    public function show(string $id)
    {
        $transactionOfficer = TransactionOfficer::with('user')->find($id);

        if (!$transactionOfficer) {
            return response()->json(['error' => 'Không tìm thấy nhân viên giao dịch'], 404);
        }

        return response()->json(['transactionOfficer' => $transactionOfficer]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $transactionOfficer = TransactionOfficer::find($id);

        if (!$transactionOfficer) {
            return response()->json(['error' => 'Không tìm thấy nhân viên giao dịch'], 404);
        }

        if (Auth::user()->isTransactionPointHead()) {
            $transactionOfficer->user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $transactionOfficer->update([
                'transaction_point_id' => $request->transaction_point_id,
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
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        try {
            $transactionOfficer = TransactionOfficer::with('user')->findOrFail($id);

            if (Auth::user()->isTransactionPointHead()) {
                // Delete the TransactionOfficer record
                $transactionOfficer->delete();

                // Delete the associated user record
                $transactionOfficer->user->delete();
                // You may also want to delete associated records or perform other cleanup tasks.

                return response()->json(['message' => 'Xóa nhân viên giao dịch thành công!']);
            } else {
                return response()->json(['error' => 'Không đủ quyền hạn'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa nhân viên giao dịch.'], 500);
        }
    }


    #[NoReturn] public function find_office(Request $request): \Illuminate\Http\JsonResponse
    {
        // Lấy giá trị của tỉnh, huyện và xã từ query parameters
        $provinceName = $request->province;
        $districtName = $request->district;
        $wardName = $request->ward;

        // Kiểm tra nếu có giá trị tỉnh
        if ($provinceName !== null) {
            $query = TransactionPoint::with(['address'])
                ->whereHas('address', function ($query) use ($provinceName) {
                    $query->where('province', $provinceName);
                });

            // Kiểm tra xem có giá trị huyện không
            if ($districtName !== null) {
                $query->whereHas('address', function ($query) use ($districtName) {
                    $query->where('district', $districtName);
                });
            }

            // Kiểm tra xem có giá trị xã không
            if ($wardName !== null) {
                $query->whereHas('address', function ($query) use ($wardName) {
                    $query->where('ward', $wardName);
                });
            }

            // Lấy các điểm giao dịch
            $offices = $query->get();

            // Trả về kết quả
            return response()->json($offices, 200);
        }

        return response()->json(['error' => 'Missing provinceName'], 400);
    }

    #[NoReturn] public function list_aggregation(Request $request): \Illuminate\Http\JsonResponse
    {
        // Lấy giá trị của tỉnh, huyện và xã từ query parameters
        $provinceName = $request->province;
        $districtName = $request->district;
        $wardName = $request->ward;

        // Kiểm tra nếu có giá trị tỉnh
        if ($provinceName !== null) {
            $query = AggregationPoint::with(['address'])
                ->whereHas('address', function ($query) use ($provinceName) {
                    $query->where('province', $provinceName);
                });

            // Kiểm tra xem có giá trị huyện không
            if ($districtName !== null) {
                $query->whereHas('address', function ($query) use ($districtName) {
                    $query->where('district', $districtName);
                });
            }

            // Kiểm tra xem có giá trị xã không
            if ($wardName !== null) {
                $query->whereHas('address', function ($query) use ($wardName) {
                    $query->where('ward', $wardName);
                });
            }

            // Lấy các điểm giao dịch
            $offices = $query->get();

            // Trả về kết quả
            return response()->json($offices, 200);
        }

        return response()->json(['error' => 'Missing provinceName'], 400);
    }
}
