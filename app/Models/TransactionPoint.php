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
        'address',
        'phone',
        'email',
        'operatingHours',
        'aggregation_point_id',
        'status',
        'notes',
    ];

    // moi them luc nay 21/11/2023
    public function transactionPointHead()
    {
        return $this->hasOne(TransactionPointHead::class);
    }

    public function aggregationPoint()
    {
        return $this->belongsTo(AggregationPoint::class);
    }

    // goods
    public function sentGoods()
    {
        return $this->hasMany(Goods::class, 'sending_transaction_point_id');
    }

    public function receivedGoods()
    {
        return $this->hasMany(Goods::class, 'receiving_transaction_point_id');
    }

    public function currentLocationGoods()
    {
        return $this->hasMany(Goods::class, 'current_location_id');
    }
}