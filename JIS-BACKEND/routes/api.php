<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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
    Route::put('/case/{id}', [CourtCaseController::class, 'update']);
    Route::delete('/case/{id}', [CourtCaseController::class, 'destroy']);
    Route::get('/allcases', [CourtCaseController::class, 'index']);
});
