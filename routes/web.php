<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TaskController;
use PHPUnit\Framework\Attributes\Ticket;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\InstallersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketsController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('tasks', TaskController::class);

    Route::resource('tickets', TicketsController::class);
    Route::put('/tickets/{ticket}/updates', [TicketsController::class, 'update'])->name('tickets.update');
    Route::post('/tickets/{ticket}/comments', [CommentController::class, 'store'])->name('comments.store');

    Route::resource('clients', ClientsController::class);
    Route::get('/clients/{client}/edit', [ClientsController::class, 'edit'])->name('clients.edit');
    Route::put('/clients/{client}', [ClientsController::class, 'update'])->name('clients.update');

    Route::resource('installers', InstallersController::class);
});

require __DIR__ . '/auth.php';
