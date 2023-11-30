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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->string('shipment_code')->unique();
            $table->unsignedBigInteger('shipper_id')->nullable();
            $table->foreign('shipper_id')->references('id')->on('shippers')->onDelete('set null');        
            $table->enum('status', ['pending', 'shipped', 'delivered'])->default('pending');
            $table->unsignedBigInteger('current_location_id')->nullable();
            $table->timestamps();
            // Khóa ngoại đến điểm gửi hàng (nếu có)
            $table->unsignedBigInteger('sending_transaction_point_id')->nullable();
            $table->foreign('sending_transaction_point_id')->references('id')->on('transaction_points')->onDelete('set null');
            $table->unsignedBigInteger('receiving_transaction_point_id')->nullable();
            $table->foreign('receiving_transaction_point_id')->references('id')->on('transaction_points')->onDelete('set null');
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
        Schema::dropIfExists('shipments');
    }
};
