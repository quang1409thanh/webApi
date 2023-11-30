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
        Schema::create('goods', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('sending_transaction_point_id')->nullable();
            $table->unsignedBigInteger('receiving_transaction_point_id')->nullable();
            $table->string('sender_address');
            $table->string('receiver_address');
            $table->string('shipment_id');
            $table->text('goods_information')->nullable(); // để lưu những thông tin như khách hàng gọi không được.
            $table->enum('status', ['pending', 'shipped', 'delivered'])->default('pending');
            $table->json('history')->nullable();
            $table->unsignedBigInteger('current_location_id')->nullable();
            $table->timestamps();
            // khóa ngoại :>
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('sending_transaction_point_id')->references('id')->on('transaction_points')->onDelete('set null');
            $table->foreign('receiving_transaction_point_id')->references('id')->on('transaction_points')->onDelete('set null');
            // Khóa ngoại đa hình cho current_location_id
            // Khóa ngoại đa hình cho current_location_id
            $table->foreign('current_location_id')->references('id')->on('transaction_points')->onDelete('set null')->name('goods_transaction_point_foreign');
            $table->foreign('current_location_id')->references('id')->on('aggregation_points')->onDelete('set null')->name('goods_aggregation_point_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goods');
    }
};
