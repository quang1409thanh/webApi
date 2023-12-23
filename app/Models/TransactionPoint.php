<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'phone',
        'email',
        'operatingHours',
        'aggregation_point_id',
        'status',
        'notes',
        'capacity',
        'current_load',
    ];

    public function address(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    // moi them luc nay 21/11/2023
    public function transactionPointHead(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(TransactionPointHead::class);
    }

    public function aggregationPoint(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(AggregationPoint::class);
    }

    // goods
    public function sentGoods()
    {
        return $this->hasMany(Good::class, 'sending_transaction_point_id');
    }

    public function receivedGoods()
    {
        return $this->hasMany(Good::class, 'receiving_transaction_point_id');
    }

    public function currentLocationGoods()
    {
        return $this->hasMany(Good::class, 'current_location_id');
    }

}
