<?php

namespace App\Models;

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

    /*
    protected $table = 'outstanding_jobs';

    protected $fillable = [
        'client_id',
        'installer_id',
        'name',
        'phone_number',
        'address',
        'expiry_date',
        'rebate_type',
        'componentry',
        'installer',
        'date_of_install',
        'notes',
        'sales',
        'greendeal',
        'ces',
        'pre_approval',
        'rebate',
    ];
*/
    // Relationships
    public function notes()
    {
        return $this->hasMany(JobNote::class, 'job_id');
    }

    public function client()
    {
        return $this->belongsTo(Clients::class, 'client_id');
    }

    public function installer()
    {
        return $this->belongsTo(Installers::class, 'installer_id');
    }
}
