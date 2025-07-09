<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tickets extends Model
{
    /** @use HasFactory<\Database\Factories\TicketsFactory> */
    use HasFactory;

    protected $fillable = [



        'title',
        'description',
        'the_client',
        'user_id'

    ];

    public function clients()
    {
        return $this->belongsTo(Client::class, 'the_client'); // 'the_client' is your foreign key
    }

    public function user()
    {
        return $this->belongsTo(User::class); // ✅ No 's' — it's 'user', singular
    }
}
