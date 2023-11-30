<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AggregationPointHead extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'aggregation_point_id', 'phone', 'address', 'details'];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function aggregationPoint()
    {
        return $this->hasOne(AggregationPoint::class);
    }

    
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
