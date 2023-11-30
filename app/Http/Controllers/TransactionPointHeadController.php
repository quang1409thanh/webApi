<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\TransactionPointHead;
use Illuminate\Http\Request;

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
        //
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->transactionPointHead()->create([
            'transaction_point_id' => $request->transaction_point_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'details' => $request->details,
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
        $transactionPointHead = TransactionPointHead::with('user')->findOrFail($id);
        $transactionPointHead->delete();

        // Xóa thông tin trong bảng User
        $transactionPointHead->user->delete();

        return response()->json([
            'message' => 'Xóa tài khoản thành công!',
        ]);
    }
}
