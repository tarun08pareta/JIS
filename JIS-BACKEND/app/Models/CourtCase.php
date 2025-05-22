<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class CourtCase extends Model
{
    use HasUuids;
     protected $table = 'court_cases'; 

    protected $fillable = [
        'defendantName',
        'defendantAddress',
        'crimeType',
        'dateCommitted',
        'locationCommitted',
        'arrestingOfficer',
        'CIN',
        'judge_id',
        'lawyer_id',
        'status',
        'victim',
    ];

    public function judge()
    {
        return $this->belongsTo(User::class, 'judge_id');
    }

    public function lawyer()
    {
        return $this->belongsTo(User::class, 'lawyer_id');
    }
}
