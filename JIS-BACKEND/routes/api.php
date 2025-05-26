<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\CourtCaseController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/judges', [AuthController::class, 'getJudge']);
Route::get('/lawyers', [AuthController::class, 'getLawyer']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::prefix('registrar')->group(function () {
    Route::post('/case', [CourtCaseController::class, 'store']);
    Route::get('/case/{id}', [CourtCaseController::class, 'show']);
    Route::post('/case/{id}', [CourtCaseController::class, 'update']);
    Route::delete('/case/{id}', [CourtCaseController::class, 'destroy']);
    Route::get('/allcases', [CourtCaseController::class, 'index']);



    Route::prefix('schedules')->group(function () {
        // Create new schedule with manual case ID
        Route::post('/', [ScheduleController::class, 'store']);

        // Standard CRUD routes
        Route::get('/', [ScheduleController::class, 'index']); // Get all schedules
        Route::get('/{id}', [ScheduleController::class, 'show']);
        Route::post('/{id}', [ScheduleController::class, 'update']);
        Route::delete('/{id}', [ScheduleController::class, 'destroy']);
    });

    Route::get('/court-case/{id}/schedules', [ScheduleController::class, 'getCaseWithSchedules']);

});
