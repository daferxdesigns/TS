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
        'electrical_contractor_number',
        'certificate_of_currency',
        'email_address',
        'address',
        'latitude',
        'state',
        'longitute',
        'grid',
        'battery',
        'solar',
        'forklift',
        'expiry_date',
        'wkt',
        'updated_at',
        'created_at'
    ];
}
