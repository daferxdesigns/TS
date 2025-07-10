<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Clients extends Model
{
    protected $fillable = [
        'name',
        'last_name',
        'contact_number',
        'email',
        'address',
        'state',
        'zip_code'
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Tickets::class, 'the_client');
    }
}
