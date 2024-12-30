<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\UserController;

Route::prefix('api')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/user/photo', [UserController::class, 'updatePhoto']);

    Route::post('/login/post', [UserController::class, 'loginAuth']);
    Route::post('/register/post', [UserController::class, 'registerPost']);
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');

    Route::get('/board/index', [BoardController::class, 'index']);
    Route::post('/board/post', [BoardController::class, 'store']);
    Route::put('/board/put/{id}', [BoardController::class, 'update']);
    Route::get('/board/show/{id}', [BoardController::class, 'show']);
    Route::delete('/board/delete/{id}', [BoardController::class, 'destroy']);
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
