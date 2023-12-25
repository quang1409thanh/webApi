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
        'shipment_id',
        'goods_information',
        'loai_hang',
        'weight',
        'chi_dan_gui',
        'chu_dan_nv',
        'dich_vu',
        'cuoc_chinh',
        'phu_thu',
        'thu_ho',
        'status',
        'history',
        'current_location_id',
        'current_location_type'
    ];

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function currentLocation(): \Illuminate\Database\Eloquent\Relations\MorphTo
    {
        return $this->morphTo('current_location');
    }
}
