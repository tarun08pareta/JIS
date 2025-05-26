<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\CourtCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data including case_id
        $validator = Validator::make($request->all(), [
            'case_id' => 'required|exists:court_cases,id',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

       $courtCase = CourtCase::find($request->case_id); // ✅ FIXED
    if(!$courtCase) {
        return response()->json([
            'success' => false,
            'message' => 'Case not found'
        ]);
    }
        // Create the schedule
        $schedule = Schedule::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Schedule created successfully',
            'data' => $schedule
        ], 201);
    }

    /**
     * Get all schedules for a specific case.
     */


    /**
     * Display the specified schedule.
     */
    public function show($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Schedule not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $schedule
        ]);
    }

    /**
     * Update the specified schedule in storage.
     */
    public function update(Request $request, $id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Schedule not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'case_id' => 'sometimes|required|exists:court_cases,id',
            'date' => 'sometimes|required|date',
            'location' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $schedule->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Schedule updated successfully',
            'data' => $schedule
        ]);
    }

    /**
     * Remove the specified schedule from storage.
     */
    public function destroy($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Schedule not found'
            ], 404);
        }

        $schedule->delete();

        return response()->json([
            'success' => true,
            'message' => 'Schedule deleted successfully'
        ]);
    }

    /**
     * Get all schedules (for admin/reporting purposes)
     */
    public function index()
    {
        $schedules = Schedule::with('courtCase')
                            ->orderBy('date', 'asc')
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $schedules
        ]);
    }


    public function getCaseWithSchedules($id)
{
    $courtCase = CourtCase::with('schedules')->find($id);

    if (!$courtCase) {
        return response()->json([
            'success' => false,
            'message' => 'Court case not found',
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $courtCase
    ]);
}

}
