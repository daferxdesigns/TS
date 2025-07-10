<?php

namespace App\Models;

use App\Models\Tickets;
use Illuminate\Database\Eloquent\Model;


class Comment extends Model
{
    protected $fillable = ['ticket_id', 'user_id', 'comment'];

    public function ticket()
    {
        return $this->belongsTo(Tickets::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
