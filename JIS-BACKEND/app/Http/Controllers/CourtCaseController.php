<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\CourtCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourtCaseController extends Controller
{
    // ✅ Add a New Case
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'defendantName' => 'required|string',
            'defendantAddress' => 'required|string',
            'crimeType' => 'required|string',
            'dateCommitted' => 'required|date',
            'locationCommitted' => 'required|string',
            'arrestingOfficer' => 'required|string',
            'CIN' => 'required|unique:court_cases,CIN',
            'judge_id' => 'required|uuid|exists:users,id',
            'lawyer_id' => 'required|uuid|exists:users,id',
            'status' => 'in:pending,ongoing,closed',
            'victim' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Check if the judge and lawyer roles are correct
        $judge = User::where('id', $request->judge_id)->where('role', 'Judge')->first();
        $lawyer = User::where('id', $request->lawyer_id)->where('role', 'Lawyer')->first();

        if (!$judge || !$lawyer) {
            return response()->json(['error' => 'Invalid judge or lawyer. They must exist and have correct roles.'], 400);
        }

        $case = CourtCase::create($request->all());

        return response()->json(['message' => 'Case added successfully', 'data' => $case], 201);
    }



    public function update(Request $request, $id)
    {
        $case = CourtCase::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'defendantName' => 'required|string',
            'defendantAddress' => 'required|string',
            'crimeType' => 'required|string',
            'dateCommitted' => 'required|date',
            'locationCommitted' => 'required|string',
            'arrestingOfficer' => 'required|string',
            'CIN' => 'required|unique:court_cases,CIN,' . $case->id,
            'judge_id' => 'required|uuid|exists:users,id,role,Judge',
            'lawyer_id' => 'required|uuid|exists:users,id,role,Lawyer',
            'status' => 'in:pending,ongoing,closed',
            'victim' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $case->update($request->all());

        return response()->json([
            'message' => 'Case updated successfully',
            'data' => $case->fresh()
        ]);
    }

    // ✅ Delete Case
    public function destroy($id)
    {
        $case = CourtCase::findOrFail($id);
        $case->delete();

        return response()->json(['message' => 'Case deleted successfully']);
    }

    // ✅ List All Cases (Optional)
    public function index( Request $request)
    {
        $query = CourtCase::with(['judge', 'lawyer']);

    if ($request->has('search')) {
        $searchTerm = $request->input('search');

        $query->where(function ($q) use ($searchTerm) {
            $q->where('defendantName', 'LIKE', "%{$searchTerm}%")
              ->orWhere('victim', 'LIKE', "%{$searchTerm}%")
              ->orWhere('arrestingOfficer', 'LIKE', "%{$searchTerm}%");
        });
    }

    return $query->get();
    }

    // ✅ Show a Single Case
    public function show($id)
    {
        $case = CourtCase::find($id);

        if (!$case) {
            return response()->json(['error' => 'Case not found'], 404);
        }

        return response()->json(['data' => $case], 200);
    }
}
