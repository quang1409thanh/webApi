<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    
    public function sentOrders()
    {
        return $this->hasMany(Goods::class, 'sender_id');
    }

    public function receivedOrders()
    {
        return $this->hasMany(Goods::class, 'receiver_id');
    }

    public function allOrders()
    {
        return $this->sentOrders()->orWhere($this->receivedOrders()->getQuery());
    }

}
