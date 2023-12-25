<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('goods', function (Blueprint $table) {
            $table->id();

            $randomCode = preg_replace('/[^A-Za-z0-9]/', '', Str::random(10));
            $table->string('code')->default($randomCode)->unique();

            $table->unsignedBigInteger('sending_transaction_point_id')->nullable();
            $table->unsignedBigInteger('receiving_transaction_point_id')->nullable();
            //
            $table->string('shipment_id');
            //
            $table->text('goods_information')->nullable();
            //
            // Thêm các trường mới
            $table->string('loai_hang')->default('Tài liệu');
            $table->float('weight')->default(0);
            $table->string('chi_dan_gui')->default('Chuyển hoàn ngay');
            $table->string('chu_dan_nv')->default('ed');
            $table->string('dich_vu')->default('ed');
            $table->float('cuoc_chinh')->default(34);
            $table->float('phu_thu')->default(0);
            $table->float('thu_ho')->default(0);

            $table->enum('status', [
                'Chấp nhận gửi',
                'Đang gửi',
                'Đã gửi',
                'Đang giao hàng',
                'Hoàn thành giao hàng',
                'Giao hàng thất bại'
            ])->default('Chấp nhận gửi');

            $table->json('history')->nullable();

            $table->unsignedBigInteger('current_location_id')->nullable();
            $table->string('current_location_type')->nullable();
            $table->timestamps();

            $table->foreign('sending_transaction_point_id')->references('id')->on('transaction_points')->onDelete('set null');
            $table->foreign('receiving_transaction_point_id')->references('id')->on('transaction_points')->onDelete('set null');
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
