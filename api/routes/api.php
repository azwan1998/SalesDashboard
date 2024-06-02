<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\KategoriController;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(SalesController::class)->prefix('sales')->group(function () {
    Route::get('/', 'index');
    Route::get('/show/{id}', 'show');
    Route::post('/store', 'store');
    Route::get('/count', 'count');
    Route::put('/update/{id}', 'update');
    Route::delete('/delete/{id}', 'destroy');
});

Route::controller(kategoriController::class)->prefix('kategori')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::put('/update/{id}', 'update');
    Route::delete('/delete/{id}', 'destroy');
});
