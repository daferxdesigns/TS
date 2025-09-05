<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobNote extends Model
{
    use HasFactory;

    protected $table = 'job_notes';

    protected $fillable = [
        'job_id',
        'user_id',
        'content',
    ];

    public function job()
    {
        return $this->belongsTo(OutstandingJobs::class, 'job_id'); // or 'outstanding_job_id' if that's your column
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
