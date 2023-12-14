<?php

namespace App\Http\Controllers;

use App\Models\CompanyLeader;
use App\Models\User;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyLeaderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::User()->isAdminSystem()) {
            // Nếu là admin, lấy thông tin của tất cả company leaders và eager load thông tin của user
            $companyLeaders = CompanyLeader::with(['user', 'images'])->get();
            return response()->json(['companyLeaders' => $companyLeaders]);
        } else {
            // Nếu không phải admin, trả về lỗi quyền hạn
            return response()->json(['error' => 'Không đủ quyền hạn!'], 403);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $user = Auth::user();
        if ($user->isAdminSystem()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $companyLeader = $user->companyLeader()->create([
                'phone' => $request->phone,
                'details' => $request->details,
            ]);

            $companyLeader->address()->create([
                'province' => $request->input('province', 'default'),
                'district' => $request->input('district', 'default'),
                'ward' => $request->input('ward', 'default'),
                'detailed_address' => $request->input('detailed_address', 'default'),
            ]);

            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->storeAs('photos', uniqid() . '.' . $request->file('photo')->extension(), 'public');

                $companyLeader->images()->create([
                    'path' => $photoPath,
                    'caption' => 'User photo',
                    'alt_text' => 'User photo',
                ]);
            } else {
                // Nếu không có file, sử dụng ảnh mặc định
                $companyLeader->images()->create([
                    'path' => 'https://image.img',
                    'caption' => 'Default photo',
                    'alt_text' => 'Default photo',
                ]);
            }
            return response()->json([
                'message' => "tao tai khoan thanh cong !",
            ]);
        } else {
            return response()->json(['error' => 'Khong du tham quyen !!!'], 403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        // You can implement the logic to retrieve and return a specific company leader here.
        $companyLeader = CompanyLeader::with('user')->findOrFail($id);

        return response()->json($companyLeader);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $companyLeader = CompanyLeader::with('user')->findOrFail($id);
        $user = Auth::user();

        if ($user->isAdminSystem()) {
            // Update User information
            $userData = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            if ($request->has('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $companyLeader->user->update($userData);

            // Update CompanyLeader information
            $companyLeader->update([
                'phone' => $request->phone,
                'address' => $request->address,
                'details' => $request->details,
            ]);

            // Update User photo if a new one is provided
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->storeAs('photos/' . $companyLeader->user->id, uniqid() . '.' . $request->file('photo')->extension(), 'public');

                // Update Image information
                $companyLeader->images()->update([
                    'path' => $photoPath,
                    'caption' => 'User photo',
                    'alt_text' => 'User photo',
                ]);
            }

            return response()->json([
                'message' => 'Cập nhật thành công!',
            ]);
        } else {
            return response()->json(['error' => 'Không đủ quyền hạn!'], 403);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Tìm company leader và eager load thông tin của user
        $companyLeader = CompanyLeader::with('user')->findOrFail($id);
        // Kiểm tra quyền hạn của người dùng
        if (Auth::user()->isAdminSystem()) {
            // Xóa thông tin trong bảng CompanyLeader
            $companyLeader->delete();

            // Xóa thông tin trong bảng User
            $companyLeader->user->delete();

            return response()->json([
                'message' => 'Xóa tài khoản thành công!',
            ]);
        } else {
            return response()->json(['error' => 'Không đủ quyền hạn!'], 403);
        }
    }
}
