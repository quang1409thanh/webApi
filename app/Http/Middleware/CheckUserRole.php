<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (Auth::check()) {
            // Lấy giá trị 'role' từ route parameters
            $user = Auth::user();
//            dd($user->getUserType(),$role);
            if ($user->getUserType() === $role) {
                return $next($request);
            } else {
                return response()->json(['error' => 'Khong du tham quyen !!!'], 403);
            }
        }
        return $next($request);
    }
}
