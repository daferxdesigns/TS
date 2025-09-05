<?php

namespace App\Models;

use GuzzleHttp\Client;
use Psy\VersionUpdater\Installer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OutstandingJobs extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment

    protected $table = 'outstandingjobs';

    protected $fillable = [
        'client_id',
        'installer_id',
        'componentry',
        'installation_date',
        'notes',
        'pre_approval',
        'sales',
        'rebate',
    ];

    // Relationships
    public function client()
    {
        return $this->belongsTo(Clients::class, 'client_id');
    }

    public function installer()
    {
        return $this->belongsTo(Installers::class, 'installer_id');
    }
    public function notes()
    {
        return $this->hasMany(JobNote::class, 'job_id');
    }
}
