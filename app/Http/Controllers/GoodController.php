<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GoodController extends Controller
{
    //

    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => "ping thanh cong",
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => "ping thanh cong",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => "ping thanh cong",
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => "ping thanh cong",
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => "ping thanh cong",
        ]);
    }

}
