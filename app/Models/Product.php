<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Product  extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    protected $fillable = ['name', 'description', 'price', 'category_id', 'stock', 'image_url'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
