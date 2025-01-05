<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'board_id',
        'position'
    ];

    public $timestamps = true;

    public function board()
    {
        return $this->belongsTo(Board::class, 'board_id');
    }

    public function cards()
    {
        return $this->hasMany(Card::class, 'id');
    }
}
