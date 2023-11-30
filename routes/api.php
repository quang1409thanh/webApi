<?php

use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyLeaderController;
use App\Http\Middleware\checkUserRole;
use App\Http\Controllers\AggregationPointHeadController;
use App\Http\Controllers\TransactionPointHeadController;
use App\Http\Controllers\TransactionOfficerController;
use App\Http\Controllers\AggregationPointEmployeeController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ShipperController;
use App\Http\Controllers\AdminSystemController;
use PHPUnit\Metadata\Group;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    // Nhóm chức năng cho những người dùng khác nhau

    // quyen chi co admin he thong co the lam duoc
    Route::group(['middleware' => ['role:Admin System']], function () {

        Route::apiResource('companyLeader', App\Http\Controllers\CompanyLeaderController::class);
        Route::get('/getAdmin', [\App\Http\Controllers\AdminSystemController::class, 'index']);
    });

    // quyen cua lanh dao cong ty
    Route::group(['middleware' => ['role:Company Leader']], function () {
        Route::apiResource('aggregationPoint', App\Http\Controllers\AggregationPointController::class);
        Route::apiResource('transactionPoint', App\Http\Controllers\TransactionPointController::class);
        Route::apiResource('aggregationHead', App\Http\Controllers\AggregationPointHeadController::class);
        Route::apiResource('transactionHead', App\Http\Controllers\TransactionPointHeadController::class);
    });

    // Nhóm route cho Aggregation Point Head
    Route::group(['middleware' => ['role:Aggregation Point Head']], function () {
        // Các route cho Aggregation Point Head
        Route::apiResource('aggregationPointEmployee', App\Http\Controllers\AggregationPointEmployeeController::class);
        Route::get('/ping', [App\Http\Controllers\AggregationPointEmployeeController::class, 'resolve']);
    });

    // Nhóm route cho Transaction Point Head
    Route::group(['middleware' => ['role:Transaction Point Head']], function () {
        // Các route cho Transaction Point Head
    });

    // Nhóm route cho Transaction Officer
    Route::group(['middleware' => ['role:Transaction Officer']], function () {
        // Các route cho Transaction Officer
    });

    // Nhóm route cho Aggregation Point Employee
    Route::group(['middleware' => ['role:Aggregation Point Employee']], function () {
        // Các route cho Aggregation Point Employee
    });

    // Nhóm route cho Customer
    Route::group(['middleware' => ['role:Customer']], function () {
        // Các route cho Customer
    });

    // Nhóm route cho Shipper
    Route::group(['middleware' => ['role:Shipper']], function () {
        // Các route cho Shipper
    });
});
