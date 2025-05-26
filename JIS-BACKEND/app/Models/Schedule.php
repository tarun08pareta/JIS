<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Schedule extends Model
{
     use HasUuids,HasFactory;

    protected $fillable = [
        'id',
        'case_id',
        'date',
        'location',
        'description',
        'status'
    ];

    protected $casts = [
        'date' => 'datetime'
    ];

    /**
     * Get the court case associated with the schedule.
     */
    public function courtCase()
    {
        return $this->belongsTo(CourtCase::class, 'case_id');
    }
}
