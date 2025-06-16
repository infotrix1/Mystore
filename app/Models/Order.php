<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Order extends Authenticatable
{
    protected $fillable = ['user_id', 'total_amount', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }

}
