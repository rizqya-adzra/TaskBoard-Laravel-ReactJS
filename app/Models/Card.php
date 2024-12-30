<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'list_id',
        'position',
    ];

    public function catalogue()
    {
        return $this->belongsTo(Catalogue::class);
    }


}
