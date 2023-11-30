<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AggregationPointEmployee extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'aggregation_point_id',
        'name',
        'position',
        'phone',
        'address',
        'details',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function aggregationPoint()
    {
        return $this->belongsTo(AggregationPoint::class);
    }
    
}
