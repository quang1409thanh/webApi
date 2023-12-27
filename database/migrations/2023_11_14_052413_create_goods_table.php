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

            $randomCode = preg_replace('/[^A-Za-z0-9]/', '', Str::random(30));
            $table->string('code')->default($randomCode)->unique();

            $table->unsignedBigInteger('sending_transaction_point_id')->nullable();
            $table->unsignedBigInteger('receiving_transaction_point_id')->nullable();
            // Thêm các trường mới
            $table->string('sender_name')->nullable();
            $table->string('receiver_name')->nullable();
            $table->string('shipment_id_gd_tk')->nullable();
            $table->string('shipment_id_tk_tk')->nullable();
            $table->string('shipment_id_tk_gd')->nullable();

            $table->text('goods_information')->nullable();
            $table->string('package_type')->default('Document');
            $table->float('weight')->default(0);
            $table->string('instructions_send')->default('Return immediately');
            $table->string('instructions_staff')->default('');
            $table->string('service')->default('');
            $table->float('main_fee')->default(0);
            $table->float('surcharge')->default(0);
            $table->float('collection_fee')->default(0);
            $table->string('status')->default('Chấp nhận gửi');
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
