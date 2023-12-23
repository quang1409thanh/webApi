<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('goods', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            //
//            $table->unsignedBigInteger('sender_id');
//            $table->unsignedBigInteger('receiver_id');
            //
            $table->unsignedBigInteger('sending_transaction_point_id')->nullable();
            $table->unsignedBigInteger('receiving_transaction_point_id')->nullable();
            //
//            $table->string('sender_address_id');
//            $table->string('receiver_address_id');
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
            //

            $table->unsignedBigInteger('current_location_id')->nullable();
            $table->string('current_location_type')->nullable();
            $table->timestamps();

//            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
//            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
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
