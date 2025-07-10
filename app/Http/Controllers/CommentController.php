<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Request $request, Tickets $ticket)
    {
        $request->validate([
            'comment' => 'required|string',
        ]);

        $ticket->comments()->create([
            'user_id' => auth()->id(),
            'comment' => $request->comment,
        ]);

        return redirect()->back();
    }
}
