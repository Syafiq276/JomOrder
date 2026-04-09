<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['table_number', 'total_amount', 'status', 'payment_method', 'source'];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
