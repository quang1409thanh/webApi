<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Lưu trữ hình ảnh trong thư mục 'photos' của disk 'public' với tên duy nhất
        $photoPath = $request->file('photo')->storeAs('photos', uniqid() . '.' . $request->file('photo')->extension(), 'public');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User and admin system created successfully'], 201);

        event(new Registered($user));

        Auth::login($user);

        $token = $request->user()->createToken('api-token');

        return response()->json([
            'message' => 'User and admin system created successfully',
            'user' => $user,
            'token' => $token->plainTextToken,
        ]);
    }
}
