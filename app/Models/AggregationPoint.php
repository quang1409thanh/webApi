<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AggregationPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'address',
        'phone',
        'email',
        'operatingHours',
        'status',
        'notes',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    // moi them luc nay 21/11/2023
    public function aggregationPointHead()
    {
        return $this->belongsTo(AggregationPointHead::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    // goods
    public function currentLocationGoods()
    {
        return $this->hasMany(Goods::class, 'current_location_id');
    }
}
