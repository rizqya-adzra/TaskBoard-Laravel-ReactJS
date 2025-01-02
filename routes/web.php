<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\KanbanBoardController;
use App\Http\Controllers\UserController;

Route::prefix('api')->group(function () {
    Route::post('/login/post', [UserController::class, 'loginAuth']);
    Route::post('/register/post', [UserController::class, 'registerPost']);

    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/user/photo', [UserController::class, 'updatePhoto']);

    Route::get('/board/index', [BoardController::class, 'index']);
    Route::post('/board/post', [BoardController::class, 'store']);
    Route::put('/board/put/{id}', [BoardController::class, 'update']);
    Route::get('/board/show/{id}', [BoardController::class, 'show']);
    Route::delete('/board/delete/{id}', [BoardController::class, 'destroy']);

    Route::get('/kanban/column/index/{id}', [KanbanBoardController::class, 'ColumnIndex']);
    Route::post('/kanban/column/post', [KanbanBoardController::class, 'ColumnStore']);
    Route::put('/kanban/column/put/{id}', [KanbanBoardController::class, 'ColumnUpdate']);
    Route::delete('/kanban/column/delete/{id}', [KanbanBoardController::class, 'ColumnDestroy']);

    Route::get('/kanban/card/index/{id}', [KanbanBoardController::class, 'CardIndex']);
    Route::post('/kanban/card/post', [KanbanBoardController::class, 'CardStore']);
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
