<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    // add account companyleader
    public function addAdmin() {
        $user = Auth::user();
        if($user->email === "admin@gmail.com") {

        }
    }

    public function me() {
        // Lấy thông tin người dùng đang đăng nhập thông qua token
        $user = Auth::user();
        $type = $user->getUserType();
        // Kiểm tra xem người dùng có thông tin từ bảng company_leaders không
        $userWithMore = User::with($type)->find($user->id);

        return response()->json([
            "user" => $userWithMore,
        ]);
    }
    public function dashboard() {
        return response()->json([
            "ping" => "success",
        ]);
    }
}
