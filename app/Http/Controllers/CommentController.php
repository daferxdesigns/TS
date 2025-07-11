<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Tickets;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Tickets $ticket)
    {
        //dd($request);
        $ticket->comments()->create([
            'user_id' => auth()->id(),
            'comment' => $request->comment,
        ]);

        return redirect()->back();
    }
}
