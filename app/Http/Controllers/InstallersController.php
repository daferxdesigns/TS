<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Installers;
use Illuminate\Http\Request;


class InstallersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $installers = Installers::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->orderBy('id')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Installers/Index', [
            'installers' => $installers,
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
        return Inertia::render('Installers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'email', 'max:255'],
            'address' => ['required', 'string', 'max:500'],
            'suburb' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:100'],
            'postcode' => ['required', 'string', 'max:10'],

            // Accept boolean values directly
            'battery' => ['nullable'],
            'grid' => ['nullable'],
            'solar' => ['nullable'],
        ]);

        // Force values to integers (0 or 1)
        $validated['battery'] = $request->boolean('battery') ? 1 : 0;
        $validated['grid'] = $request->boolean('grid') ? 1 : 0;
        $validated['solar'] = $request->boolean('solar') ? 1 : 0;

        Installers::create($validated);

        return redirect()->route('installers.index')->with('success', 'Installer added successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Installers $installers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Installers $installer)
    {
        return Inertia::render('Installers/Edit', [
            'installer' => $installer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Installers $installer)
    {

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email_address' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:100',
            'business' => 'nullable|string|max:20',
            'grid' => 'nullable|int|max:1',
            'solar' => 'nullable|int|max:1',
            'battery' => 'nullable|int|max:1',
        ]);

        $installer->update($validated);

        return redirect()->route('installer.show', $installer->id)->with('success', 'Installer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Installers $installer)
    {
        $installer->delete();

        return redirect()->route('installers.index')->with('success', 'Client deleted successfully.');
    }
}
