<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Clients;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $clients = Clients::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('lastname', 'like', "%{$search}%");
                });
            })
            ->orderBy('id')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    public function store(Request $request)
    {

        // dd($request);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email_address' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'suburb' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:100',
            'postcode' => 'nullable|string|max:20',
        ]);

        Clients::create($validated);

        return redirect()->route('clients.index')->with('success', 'Client added successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //  dd($id);
        $clients = Clients::with('tickets')->findOrFail($id);
        // dd($clients);
        return Inertia::render('Clients/Show', [
            'clients' => $clients
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Clients $client)
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Clients $client)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email_address' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:100',
            'postcode' => 'nullable|string|max:20',
        ]);

        $client->update($validated);

        return redirect()->route('clients.show', $client->id)->with('success', 'Client updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Clients $clients)
    {
        //
    }
}
