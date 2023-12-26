<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShipmentTkGd extends Model
{
    use HasFactory;
    protected $fillable = [
        'status',
        'sending_aggregation_point_id',
        'receiving_transaction_point_id',
        // ... Thêm các trường khác nếu cần
    ];

    // Khai báo mối quan hệ với điểm gửi hàng (sending_aggregation_point)
    public function sendingAggregationPoint()
    {
        return $this->belongsTo(AggregationPoint::class, 'sending_aggregation_point_id');
    }

    // Khai báo mối quan hệ với điểm nhận hàng (receiving_transaction_point)
    public function receivingTransactionPoint()
    {
        return $this->belongsTo(TransactionPoint::class, 'receiving_transaction_point_id');
    }

}
