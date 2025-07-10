<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Clients;
use App\Models\Tickets;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\RedirectResponse;
use PHPUnit\Framework\Attributes\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;


class TicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $clients = Clients::select(['id', 'name', 'lastname'])->get()->keyBy('id');

        $tickets = Tickets::select('*')
            ->orderBy('id', 'desc')
            ->paginate();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'clients' => $clients,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $clients = Clients::select(['id', 'name', 'lastname'])->pluck('name', 'id');
        $users = User::select(['id', 'name'])->pluck('name', 'id');
        return Inertia::render('Tickets/Create', compact('users', 'clients'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request): RedirectResponse
    {
        // Start transaction in case anything fails
        DB::beginTransaction();

        try {
            // Create the ticket first
            $ticket = Tickets::create($request->validated());

            // Generate ticket number with date prefix and ticket ID
            $prefix = now()->format('my'); // Format: DDMMYY
            $ticket->ticket_number = $prefix . $ticket->id;

            // Save the ticket number
            $ticket->save();

            DB::commit();

            return redirect()->route('tickets.index')
                ->with('message', __('Ticket created successfully'));
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->route('tickets.index')
                ->with('error', __('Failed to create ticket: ') . $e->getMessage());
        }
    }
    /**
     * Display the specified resource.
     */


    public function edit(Tickets $ticket): Response
    {
        // dd($ticket);
        $clients = Clients::select(['id', 'name'])
            ->get()
            ->map(function ($client) {
                return [
                    'value' => $client->id,
                    'label' => $client->name,
                ];
            });

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'clients' => $clients,
        ]);
    }

    public function show(Tickets $ticket)
    {
        $ticket->load('comments.user'); // eager load comments with user

        return Inertia::render('Tickets/View', [
            'ticket' => $ticket,
            'clients' => Clients::all()->map(fn($client) => [
                'value' => $client->id,
                'label' => $client->name
            ]),
            'assignedUser' => $ticket->assignedUser,
        ]);
    }



    public function update(Tickets $ticket, UpdateTicketRequest $request)
    {

        //dd($request->all());
        // dd($tickets);

        $ticket->update($request->validated());

        //  dd($tickets);

        return redirect()->route('tickets.index')
            ->with('message', __('Ticket updated successfully'));
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tickets $ticket): RedirectResponse
    {
        $ticket->delete();

        return redirect()->route('tickets.index')
            ->with('message', __('Task deleted successfully'));
    }
}
