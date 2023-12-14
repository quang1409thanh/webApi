<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AggregationPointHead extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'aggregation_point_id', 'phone', 'details'];


    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function aggregationPoint(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(AggregationPoint::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
    public function address(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }
}
