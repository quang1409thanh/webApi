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
        // Bảng lưu thông tin hình ảnh
            Schema::create('images', function (Blueprint $table) {
                $table->id();
                $table->string('path');
                $table->string('caption')->nullable();
                $table->string('alt_text')->nullable();
                $table->unsignedBigInteger('imageable_id'); // ID của đối tượng sở hữu
                $table->string('imageable_type'); // Loại của đối tượng sở hữu (tên class)
                $table->timestamps( );
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};