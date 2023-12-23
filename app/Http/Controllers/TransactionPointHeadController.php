<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\TransactionPointHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionPointHeadController extends Controller
{
    public function index()
    {
        //
        $transactionPointHead = TransactionPointHead::with('user')->get();

        return response()->json(['transactionPointHead' => $transactionPointHead]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->isCompanyLeader()) {

            $validator = Validator::make($request->all(), [
                'transaction_point_id' => 'required|numeric|unique_transaction_point',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            } else {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                $transactionPointHead = $user->transactionPointHead()->create([
                    'transaction_point_id' => $request->transaction_point_id,
                    'phone' => $request->phone,
                    'details' => $request->details,
                ]);
                $transactionPointHead->address()->create([
                    'province' => $request->input('province', 'default $transactionPointHead'),
                    'district' => $request->input('district', 'default $transactionPointHead'),
                    'ward' => $request->input('ward', 'default $transactionPointHead'),
                    'detailed_address' => $request->input('detailed_address', 'default $transactionPointHead'),
                ]);
                return response()->json([
                    'message' => "tao tai khoan thanh cong !",
                ]);
            }
        } else {
            return response()->json([
                'message' => "tao tai khoan thanh cong !",
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $transactionPointHead = TransactionPointHead::with('user')->findOrFail($id);
        return response()->json($transactionPointHead);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $transactionPointHead = TransactionPointHead::with('user')->findOrFail($id);
        $transactionPointHead->user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Cập nhật thông tin trong bảng CompanyLeader
        $transactionPointHead->update([
            'transaction_point_id' => $request->transaction_point_id,
            'phone' => $request->phone,
            'details' => $request->details,
        ]);
        $transactionPointHead()->address()->create([
            'province' => $request->input('province', 'default $transactionPointHead'),
            'district' => $request->input('district', 'default $transactionPointHead'),
            'ward' => $request->input('ward', 'default $transactionPointHead'),
            'detailed_address' => $request->input('detailed_address', 'default $transactionPointHead'),
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
        try {
            $transactionPointHead = TransactionPointHead::with('user')->findOrFail($id);

            if (Auth::user()->isCompanyLeader()) {
                // Delete the TransactionPointHead record
                $transactionPointHead->delete();
                // Delete the associated user record
                $transactionPointHead->user->delete();
                // You may also want to delete associated records or perform other cleanup tasks.
                return response()->json(['message' => 'Xóa tài khoản thành công!']);
            } else {
                return response()->json(['error' => 'Không đủ quyền hạn'], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa tài khoản.'], 500);
        }
    }
}
