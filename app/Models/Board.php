<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'color_code'
    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function catalogues()
    {
        return $this->hasMany(Column::class, 'id');
    }

    public function cardMembers()
    {
        return $this->hasMany(CardMember::class);
    }
}
