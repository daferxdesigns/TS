<?php

namespace App\Http\Controllers;

use id;
use Inertia\Inertia;
use App\Models\Clients;
use App\Models\JobNote;
use App\Models\Installers;
use Illuminate\Http\Request;
use App\Models\OutstandingJobs;

class OutstandingJobsController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->input('search', ''));

        $jobs = OutstandingJobs::with(['client', 'installer'])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    // --- Search in clients ---
                    $q->orWhereHas('client', function ($clientQ) use ($search) {
                        $clientQ->where('name', 'like', "%{$search}%")
                            ->orWhere('lastname', 'like', "%{$search}%");
                    });

                    // --- Search in installers ---
                    $q->orWhereHas('installer', function ($installerQ) use ($search) {
                        $installerQ->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%");
                    });

                    // --- Search in outstandingjobs own fields ---
                    $q->orWhere('componentry', 'like', "%{$search}%")
                        ->orWhere('notes', 'like', "%{$search}%")
                        ->orWhere('sales', 'like', "%{$search}%")
                        ->orWhere('rebate', 'like', "%{$search}%")
                        ->orWhere('pre_approval', 'like', "%{$search}%")
                        ->orWhere('installation_date', 'like', "%{$search}%");
                });
            })
            ->orderBy('installation_date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Jobs/Index', [
            'jobs'    => $jobs,
            'filters' => $request->only('search'),
        ]);
    }
    public function create()
    {
        $clients = Clients::all();
        $installers = Installers::all();

        return Inertia::render('OutstandingJobsCreate', [
            'clients' => $clients,
            'installers' => $installers,
        ]);
    }
    public function show($id)
    {
        // Eager-load client, installer, and notes with their user
        $job = OutstandingJobs::with([
            'client',
            'installer',
            'notes' => function ($query) {
                $query->orderBy('created_at', 'desc'); // newest first
            },
            'notes.user'
        ])->findOrFail($id);



        // Transform notes for React
        $notesArray = [];
        if ($job->notes && $job->notes->count() > 0) {
            foreach ($job->notes as $note) {
                $notesArray[] = [
                    'id' => $note->id,
                    'content' => $note->content ?? '',
                    'user' => $note->user ? [
                        'id' => $note->user->id,
                        'name' => $note->user->name,
                    ] : null,
                    'created_at' => $note->created_at ? $note->created_at->format('Y-m-d H:i') : null,
                ];
            }
        }

        return Inertia::render('Jobs/Show', [
            'job' => [
                'id' => $job->id,
                'componentry' => $job->componentry,
                'installation_date' => $job->installation_date,
                'pre_approval' => $job->pre_approval,
                'sales' => $job->sales,
                'rebate' => $job->rebate,
                'client' => $job->client,
                'installer' => $job->installer,
                'notes' => $notesArray, // pass safe array to React
            ],
        ]);
    }





    public function storeNote(Request $request, $id)
    {
        $request->validate(['note' => 'required|string|max:1000']);

        $job = OutstandingJobs::findOrFail($id);

        $job->notes()->create([
            'content' => $request->note,
            'user_id' => auth()->id(),
        ]);

        return back();
    }

    public function updateNote(Request $request, $jobId, $noteId)
    {
        $request->validate(['note' => 'required|string|max:1000']);

        $note = JobNote::where('job_id', $jobId)->findOrFail($noteId);

        if ($note->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $note->update(['content' => $request->note]);

        return back();
    }

    public function destroyNote($jobId, $noteId)
    {
        $note = JobNote::where('job_id', $jobId)->findOrFail($noteId);

        if ($note->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $note->delete();

        return back();
    }


    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'installer_id' => 'required|exists:installers,id',
            'componentry' => 'required|string',
            'installation_date' => 'required|date',
            'notes' => 'nullable|string',
            'pre_approval' => 'nullable|string',
            'sales' => 'nullable|numeric',
            'rebate' => 'nullable|numeric',
        ]);

        OutstandingJobs::create($request->all());

        return redirect()->route('Jobs.index')->with('success', 'Outstanding job created successfully.');
    }

    public function edit(OutstandingJobs $outstandingjob)
    {
        $clients = Clients::all();
        $installers = Installers::all();

        return Inertia::render('OutstandingJobsEdit', [
            'job' => $outstandingjob,
            'clients' => $clients,
            'installers' => $installers,
        ]);
    }

    public function update(Request $request, OutstandingJobs $outstandingjob)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'installer_id' => 'required|exists:installers,id',
            'componentry' => 'required|string',
            'installation_date' => 'required|date',
            'notes' => 'nullable|string',
            'pre_approval' => 'nullable|string',
            'sales' => 'nullable|numeric',
            'rebate' => 'nullable|numeric',
        ]);

        $outstandingjob->update($request->all());

        return redirect()->route('Jobs.index')->with('success', 'Outstanding job updated successfully.');
    }

    public function destroy(OutstandingJobs $outstandingjob)
    {
        $outstandingjob->delete();

        return redirect()->route('Jobs.index')->with('success', 'Outstanding job deleted successfully.');
    }
}
