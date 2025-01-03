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

    Route::get('/kanban/column/index/{id}', [KanbanBoardController::class, 'columnIndex']);
    Route::post('/kanban/column/post', [KanbanBoardController::class, 'columnStore']);
    Route::put('/kanban/column/put/{id}', [KanbanBoardController::class, 'columnUpdate']);
    Route::delete('/kanban/column/delete/{id}', [KanbanBoardController::class, 'columnDestroy']);
    Route::put('/kanban/column/position/put', [KanbanBoardController::class, 'columnUpdatePositions']);
    
    Route::get('/kanban/card/index/{id}', [KanbanBoardController::class, 'cardIndex']);
    Route::post('/kanban/card/post', [KanbanBoardController::class, 'cardStore']);
    // Route::get('/kanban/card/show/{id}', [KanbanBoardController::class, 'cardShow']);
    Route::put('/kanban/card/put', [KanbanBoardController::class, 'cardUpdate']);
    Route::put('/kanban/card/position/put', [KanbanBoardController::class, 'cardUpdatePositions']);
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
