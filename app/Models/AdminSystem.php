<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminSystem extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'phone',
        'address',
        'details',
        'position',
        'birthday',
        // Không bao gồm 'profile_picture' vì hình ảnh được lưu trữ trong bảng riêng biệt
        // Không bao gồm 'notes' vì nó có thể chứa nhiều văn bản và không giới hạn độ dài
    ];
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
