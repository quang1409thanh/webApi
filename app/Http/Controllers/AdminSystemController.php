<?php

namespace App\Http\Controllers;

use App\Models\AdminSystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminSystemController extends Controller
{
    //
    public function index()
    {
        if (Auth::user()->isAdminSystem()) {
            // Nếu là admin, lấy thông tin của tất cả company leaders và eager load thông tin của user
            $adminSystem = AdminSystem::with(['user', 'images'])->get();

            return response()->json(['adminSystem' => $adminSystem]);
        } else {
            // Nếu không phải admin, trả về lỗi quyền hạn
            return response()->json(['error' => 'Không đủ quyền hạn!'], 403);
        }
    }
}
