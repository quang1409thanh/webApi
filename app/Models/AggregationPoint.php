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
        'phone',
        'email',
        'operatingHours',
        'status',
        'notes',
        'capacity',
        'current_load',
    ];

    // moi them luc nay 21/11/2023
    public function aggregationPointHead(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(AggregationPointHead::class);
    }

    public function transactionPoints(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TransactionPoint::class);
    }

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    // goods
    public function currentLocationGoods(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Good::class, 'current_location_id');
    }

    public function address(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

}

