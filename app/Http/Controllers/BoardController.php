<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::all();

        return response()->json(['data' => $boards]);
    }

    public function show($id)
    {
        $board = Board::with('user')->findOrFail($id);
        return response()->json([
            'data' => $board
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:20',
            'description' => 'nullable',
            'color_code' => 'nullable'
        ], [
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama Board maksimal 20 karakter',
        ]);

        $board = Board::create([
            'name' => $request->name,
            'description' => $request->description,
            'owner_id' => $request->user()->id,
            'color_code' => $request->color_code
        ]);

        if ($board) {
            return response()->json([
                'success' => true,
                'message' => 'Berhasil membuat board',
                'board' => $board
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat board, coba lagi'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $board = Board::findOrFail($id);
        $board->name = $request->input('name');
        $board->save();
        
        return response()->json(['data' => $board]);
    }

    public function destroy($id)
    {
        $board = Board::findOrFail($id);
        $board->delete();

        return response()->json(['message' => 'Board berhasil dihapus']);
    }
}

