<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'column_id',
        'position',
    ];

    public function column()
    {
        return $this->belongsTo(Column::class, 'column_id');
    }
}
