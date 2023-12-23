<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;


    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function address(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }
    public function sentOrders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Good::class, 'sender_id');
    }

    public function receivedOrders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Good::class, 'receiver_id');
    }

    public function allOrders()
    {
        return $this->sentOrders()->orWhere($this->receivedOrders()->getQuery());
    }

}
