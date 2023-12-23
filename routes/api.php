<?php

use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\GoodController;
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

    Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
    Route::get('/me', [App\Http\Controllers\Controller::class, 'me']);
    Route::get('/dashboard', [App\Http\Controllers\Controller::class, 'dashboard']);
    Route::post('/change-password', [ChangePasswordController::class, 'update']);


    // Nhóm chức năng cho những người dùng khác nhau

    // quyen chi co admin he thong co the lam duoc
    Route::group(['middleware' => ['role:adminSystem']], function () {

        Route::apiResource('companyLeader', App\Http\Controllers\CompanyLeaderController::class);
        Route::get('/getAdmin', [\App\Http\Controllers\AdminSystemController::class, 'index']);
    });

    // quyen cua lanh dao cong ty
    Route::group(['middleware' => ['role:companyLeader']], function () {
        Route::apiResource('aggregationPoint', App\Http\Controllers\AggregationPointController::class);
        Route::apiResource('transactionPoint', App\Http\Controllers\TransactionPointController::class);
        Route::apiResource('aggregationHead', App\Http\Controllers\AggregationPointHeadController::class);
        Route::apiResource('transactionHead', App\Http\Controllers\TransactionPointHeadController::class);

    });

    // Nhóm route cho Aggregation Point Head
    Route::group(['middleware' => ['role:aggregationPointHead']], function () {
        // Các route cho Aggregation Point Head
        Route::apiResource('aggregationPointEmployee', App\Http\Controllers\AggregationPointEmployeeController::class);
        Route::get('/ping', [App\Http\Controllers\AggregationPointEmployeeController::class, 'resolve']);
    });

    // Nhóm route cho Transaction Point Head
    Route::group(['middleware' => ['role:transactionPointHead']], function () {
        // Các route cho Transaction Point Head
        // cung cap quan ly tai khoan nhan vien
        Route::apiResource("transactionOfficer", TransactionOfficerController::class);
    });

    // Nhóm route cho Transaction Officer
    Route::group(['middleware' => ['role:transactionOfficer']], function () {
        // Các route cho Transaction Officer
        /**Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng (tham khảo Hình 1 trong phụ lục).
         * Tạo đơn chuyển hàng gửi đến điểm tập kết mỗi/trước khi đem hàng gửi đến điểm tập kết.
         * Xác nhận (đơn) hàng về từ điểm tập kết.
         * Tạo đơn hàng cần chuyển đến tay người nhận.
         * Xác nhận hàng đã chuyển đến tay người nhận theo .
         * Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch.
         * Thống kê các hàng đã chuyển thành công, các hàng chuyển không thành công và trả lại điểm giao dịch.
         */
        Route::apiResource('good', GoodController::class);
    });


    // Nhóm route cho Aggregation Point Employee
    Route::group(['middleware' => ['role:aggregationPointEmployee']], function () {
        // Các route cho Aggregation Point Employee
    });

    // Nhóm route cho Customer
    Route::group(['middleware' => ['role:customer']], function () {
        // Các route cho Customer
    });

    // Nhóm route cho Shipper
    Route::group(['middleware' => ['role:shipper']], function () {
        // Các route cho Shipper
    });
});
