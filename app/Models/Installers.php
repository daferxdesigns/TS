<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Installers extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'business',
        'email_address',
        'address',
        'latitude',
        'longitute',
        'grid',
        'battery',
        'solar',
        'wkt',
        'updated_at',
        'created_at'
    ];
}
