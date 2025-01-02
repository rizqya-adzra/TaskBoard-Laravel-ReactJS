<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Card;
use App\Models\Column;
use Illuminate\Http\Request;

class KanbanBoardController extends Controller
{
    public function ColumnIndex($id)
    {
        $columns = Column::with('board')->where('board_id', $id)->get();

        if($columns) {
            return response()->json([
                'data' => $columns
            ]);
        } else {
            return response()->json([
                'failed' => 'Data gagal, coba lagi'
            ]);
        }
    }

    public function ColumnStore(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'board_id' => 'required|exists:boards,id', 
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'board_id.required' => 'Board ID tidak boleh kosong',
            'board_id.exists' => 'Board tidak ditemukan',
        ]);

        $boardId = $request->board_id; 

        $board = Board::find($boardId);

        if (!$board) {
            return response()->json([
                'success' => false,
                'message' => 'Board ID tidak ditemukan.',
            ], 400);
        }

        $column = Column::create([
            'name' => $request->name,
            'board_id' => $boardId,
            'position' => $this->getNextPosition($boardId),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Berhasil membuat column',
            'column' => $column,
        ]);
    }

    private function getNextPosition($boardId)
    {
        $lastColumn = Column::where('board_id', $boardId)->orderBy('position', 'desc')->first();
        return $lastColumn ? $lastColumn->position + 1 : 1;
    }

    public function ColumnUpdate(Request $request, $id)
    {
        $column = Column::findOrFail($id);
        $column->name = $request->input('name');
        $column->save();

        return response()->json(['data' => $column]);
    }

    public function ColumnDestroy($id)
    {
        $column = Column::findOrFail($id);
        $column->delete();

        return response()->json([
            'success' => true,
            'message' => 'Column berhasil dihapus'
        ]);
    }

    public function CardIndex($id)
    {
        $cards = Card::with('column')->where('column_id', $id)->get();

        return response()->json([
            'data' => $cards
        ]);
    }

    public function CardStore(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'column_id' => 'required|exists:columns,id',
        ], [
            'name.required' => 'Nama tidak boleh kosong',
            'column_id.required' => 'column ID tidak boleh kosong',
            'column_id.exists' => 'column tidak ditemukan',
        ]);

        $columnId = $request->column_id;

        $column = Column::find($columnId);

        if (!$column) {
            return response()->json([
                'success' => false,
                'message' => 'column ID tidak ditemukan.',
            ], 400);
        }

        $card = Card::create([
            'name' => $request->name,
            'description' => $request->description,
            'column_id' => $columnId,
            'position' => $this->getCardNextPosition($columnId),
        ]);

        if($card) {
            return response()->json([
                'success' => true,
                'message' => 'Berhasil membuat column',
                'card' => $card,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat column',
                'card' => $card,
            ]);
        }
    }

    private function getCardNextPosition($columnId)
    {
        $lastCard = Card::where('column_id', $columnId)->orderBy('position', 'desc')->first();
        return $lastCard ? $lastCard->position + 1 : 1;
    }

}
