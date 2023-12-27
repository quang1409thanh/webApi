<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Good extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'sending_transaction_point_id',
        'receiving_transaction_point_id',
        'sender_name',
        'receiver_name',
        'shipment_id_gd_tk',
        'shipment_id_tk_tk',
        'shipment_id_tk_gd',
        'goods_information',
        'package_type',
        'weight',
        'instructions_send',
        'instructions_staff',
        'service',
        'main_fee',
        'surcharge',
        'collection_fee',
        'status',
        'history',
        'current_location_id',
        'current_location_type',
    ];

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function currentLocation(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo('current_location');
    }

    public function sendingTransactionPoint()
    {
        return $this->belongsTo(TransactionPoint::class, 'sending_transaction_point_id');
    }

    public function receivingTransactionPoint()
    {
        return $this->belongsTo(TransactionPoint::class, 'receiving_transaction_point_id');
    }

}
