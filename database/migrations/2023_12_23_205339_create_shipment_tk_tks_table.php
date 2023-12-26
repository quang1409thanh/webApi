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
        Schema::create('shipment_tk_tks', function (Blueprint $table) {
            $table->id();

            $table->enum('status', ['đang chờ chuyển ', 'chuyển thành công', 'thất bại'])->default('đang chờ chuyển');

            $table->timestamps();
            // Khóa ngoại đến điểm gửi hàng (nếu có)
            $table->unsignedBigInteger('sending_aggregation_point_id')->nullable();
            $table->foreign('sending_aggregation_point_id')->references('id')->on('aggregation_points')->onDelete('set null');
            $table->unsignedBigInteger('receiving_aggregation_point_id')->nullable();
            $table->foreign('receiving_aggregation_point_id')->references('id')->on('aggregation_points')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipment_tk_tks');
    }
};
