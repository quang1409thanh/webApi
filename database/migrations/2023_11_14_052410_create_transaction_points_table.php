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
        Schema::create('transaction_points', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->string('operatingHours');
            $table->unsignedBigInteger('aggregation_point_id'); // ID của điểm tập kết
            $table->foreign('aggregation_point_id')->references('id')->on('aggregation_points')->onDelete('cascade');
            $table->string('status')->nullable();
            $table->text('notes')->nullable();        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_points');
    }
};
