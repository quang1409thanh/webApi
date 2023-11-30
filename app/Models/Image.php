<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'caption',
        'alt_text',
        // Các trường khác nếu có
    ];

}
