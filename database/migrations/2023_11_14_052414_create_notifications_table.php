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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('good_id')->nullable();
            $table->string('content');
            $table->enum('type', ['shipment', 'delivery'])->default('shipment');
            $table->enum('status', ['unread', 'read'])->default('unread');
            $table->timestamps();
            // Khóa ngoại đến người gửi nguoi gui nhan vien
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            // Khóa ngoại đến người nhận nhan vien.
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
            // Khóa ngoại đến đơn hàng
            $table->foreign('good_id')->references('id')->on('goods')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
