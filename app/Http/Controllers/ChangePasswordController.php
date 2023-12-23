<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    //
    public function update(Request $request): JsonResponse
    {
        // Validation rules for the request
        $request->validate([
            'current_password' => 'required',
            'new_password' => ['required', 'confirmed', 'min:8'],
        ]);

        // Retrieve the authenticated user from the request
        $user = $request->user();

        // Check if the provided current password matches the user's current hashed password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'error' => 'Current password is incorrect'
            ]);
        }

        // If the current password is correct, update the user's password with the new one
        $user->password = Hash::make($request->new_password);
        $user->save();

        // Return a success response
        return response()->json(['message' => 'Password changed successfully']);
    }

}
