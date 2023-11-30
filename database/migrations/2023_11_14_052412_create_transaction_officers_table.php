<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_officers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('transaction_point_id'); // Khóa ngoại đến bảng điểm tập kết
            $table->string('name');
            $table->string('position');
            // Thêm các trường khác mô tả nhân viên nếu cần
            $table->string('phone');
            $table->string('address');
            $table->string('details');
            $table->timestamps();
            // Khóa ngoại đến bảng điểm tập kết
            $table->foreign('transaction_point_id')->references('id')->on('transaction_points')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_officers');
    }
};
