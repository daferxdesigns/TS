<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Clients extends Model
{
    protected $fillable = [
        'name',
        'lastname',
        'phone',
        'email_address',
        'address',
        'suburb',
        'state',
        'postcode'
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Tickets::class, 'the_client');
    }
}
