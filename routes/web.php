<?php

use App\Http\Controllers\wordleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::post('/checkword', [wordleController::class, 'checkWord']);
