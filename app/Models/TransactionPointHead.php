<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionPointHead extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'transaction_point_id', 'phone', 'address', 'details'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function transactionPoint() {
        return $this->belongsTo(TransactionPoint::class, 'transaction_point_id');

    }
}
