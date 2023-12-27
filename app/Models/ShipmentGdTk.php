<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShipmentGdTk extends Model
{
    use HasFactory;

    //
    protected $fillable = [
        'status',
        'sending_transaction_point_id',
        'receiving_aggregation_point_id',
    ];

    public function sendingTransactionPoint()
    {
        return $this->belongsTo(TransactionPoint::class, 'sending_transaction_point_id');
    }

    // Khai báo mối quan hệ với điểm thu gom (receiving_aggregation_point)
    public function receivingAggregationPoint()
    {
        return $this->belongsTo(AggregationPoint::class, 'receiving_aggregation_point_id');
    }
}
