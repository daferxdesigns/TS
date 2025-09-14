<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientz extends Model
{
    use HasFactory;

    protected $table = 'clientz';

    protected $fillable = [
        'name',
        'phone_number',
        'address',
        'expiry_date',
        'rebate_type',
        'componentry',
        'installer',
        'date_of_install',
        'notes',
        'sales',
        'greendeal',
        'ces',
        'pre_approval',
    ];

    protected $casts = [
        'greendeal' => 'boolean',
        'ces' => 'boolean',
        'pre_approval' => 'boolean',
        'expiry_date' => 'date',
        'date_of_install' => 'date',
    ];
}
