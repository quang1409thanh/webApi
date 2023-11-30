<?php

namespace App\Http\Controllers;

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

    public function ping() {
        return response()->json([
            "ping" => "success",
        ]);
    }
}
