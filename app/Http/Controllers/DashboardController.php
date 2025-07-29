<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use Illuminate\Http\Request;
use App\Models\Tickets;
use App\Models\Clients;
use App\Models\Installers;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function statistics()
    {
        $ticketStatuses = Tickets::select('status')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        $totalTickets = Tickets::count();
        $totalOpen = Tickets::where('status', 'open')->count();
        $totalInProgress = Tickets::where('status', 'in_progress')->count();

        $totalClients = Clients::count();
        $totalInstallers = Installers::count();

        return Inertia::render('Dashboard', [
            'ticketStatuses' => $ticketStatuses,
            'totalTickets' => $totalTickets,
            'totalOpen' => $totalOpen,
            'totalInProgress' => $totalInProgress,
            'totalClients' => $totalClients,
            'totalInstallers' => $totalInstallers,
        ]);
    }




    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Dashboard $dashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dashboard $dashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dashboard $dashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dashboard $dashboard)
    {
        //
    }
}
