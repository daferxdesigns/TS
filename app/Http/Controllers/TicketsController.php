<?php

namespace App\Http\Controllers;

//use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Clients;
use App\Models\Tickets;
use App\Models\Installers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User;
//use PHPUnit\Framework\Attributes\Ticket;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;


class TicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // Load clients keyed by id for easy lookup
        $clients = Clients::select(['id', 'name', 'lastname'])->get()->keyBy('id');

        // Prepare query to get tickets with latest comment eager loaded
        $query = Tickets::with(['comments' => function ($q) {
            $q->latest()->limit(1);
        }]);

        // Search filter for ticket_number, title, or serial_number
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ticket_number', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('serial_number', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Paginate tickets ordered by newest first
        $tickets = $query->orderBy('id', 'desc')->paginate(50)->withQueryString();

        // Attach latest comment date to each ticket
        $tickets->getCollection()->transform(function ($ticket) {
            $latestComment = $ticket->comments->first();
            $ticket->latest_comment_date = $latestComment ? $latestComment->created_at->format('Y-m-d H:i') : null;
            return $ticket;
        });

        // Return inertia view with data
        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'clients' => $clients,
            'filters' => $request->only(['search', 'status']),
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




    public function edit(Tickets $ticket): \Inertia\Response
    {
        $clients = Clients::select(['id', 'name', 'lastname'])
            ->get()
            ->map(function ($client) {
                return [
                    'value' => $client->id,
                    'label' => $client->name . ' ' . $client->lastname,
                ];
            });

        $users = User::select(['id', 'name'])
            ->get()
            ->map(function ($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name,
                ];
            });

        $installers = Installers::select(['id', 'first_name', 'last_name'])
            ->get()
            ->map(function ($installer) {
                return [
                    'value' => $installer->id,
                    'label' => $installer->first_name . ' ' . $installer->last_name,
                ];
            });

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'clients' => $clients,
            'users' => $users,
            'installers' => $installers, // ✅ Added
        ]);
    }

    public function show(Tickets $ticket)
    {
        // eager load installer as assignedInstaller, assignedUser, 
        // and comments ordered by created_at descending with user relation
        $ticket->load([
            'comments' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
            'comments.user',
            'assignedUser',
            'assignedInstaller'
        ]);

        return Inertia::render('Tickets/View', [
            'ticket' => $ticket,
            'clients' => Clients::all()->map(fn($client) => [
                'value' => $client->id,
                'label' => $client->name . ' ' . $client->lastname,
                'phone' => '0' . $client->phone,
                'address' => $client->address . ',' . $client->suburb . ',' . $client->state . ',' . $client->postcode
            ]),
            'assignedUser' => $ticket->assignedUser,
            'assignedInstaller' => $ticket->assignedInstaller
                ? [
                    'first_name' => $ticket->assignedInstaller->first_name,
                    'last_name' => $ticket->assignedInstaller->last_name,
                    'full_name' => $ticket->assignedInstaller->first_name . ' ' . $ticket->assignedInstaller->last_name,
                ]
                : null,
        ]);
    }



    public function update(Tickets $ticket, UpdateTicketRequest $request)
    {
        //dd($request);
        // Validate and update only the provided fields, e.g. description
        $validated = $request->validated();

        // Update the ticket (description or other fields)
        $ticket->update($validated);

        // If request expects JSON (Inertia), return back without redirecting to index
        if ($request->wantsJson()) {
            return response()->json(['message' => __('Ticket updated successfully'), 'ticket' => $ticket]);
        }

        // Otherwise redirect to the ticket view page (adjust route if needed)
        return redirect()->route('tickets.show', $ticket->id)
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
