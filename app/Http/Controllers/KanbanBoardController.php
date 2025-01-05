<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Card;
use App\Models\Column;
use Illuminate\Http\Request;

class KanbanBoardController extends Controller
{
    public function columnIndex($id)
    {
        $columns = Column::where('board_id', $id)->orderBy('position')->get();

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

    public function columnStore(Request $request)
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

    public function columnUpdate(Request $request, $id)
    {
        $column = Column::findOrFail($id);
        $column->name = $request->input('name');
        $column->save();

        return response()->json(['data' => $column]);
    }

    public function columnDestroy($id)
    {
        $column = Column::findOrFail($id);
        $column->delete();

        return response()->json([
            'success' => true,
            'message' => 'Column berhasil dihapus'
        ]);
    }

    public function columnUpdatePositions(Request $request)
    {
        $validated = $request->validate([
            'positions' => 'required|array',
            'positions.*.id' => 'required|exists:columns,id',
            'positions.*.position' => 'required|integer',
        ]);

        foreach ($validated['positions'] as $positionData) {
            $column = Column::findOrFail($positionData['id']);
            $column->position = $positionData['position'];
            $column->save();  
        }

        return response()->json([
            'success' => true,
            'message' => 'Positions updated successfully.',
        ]);
    }

    //==========================================================================================

    public function cardIndex($id)
    {
        $cards = Card::where('column_id', $id)->orderBy('position')->get();

        if ($cards) {
            return response()->json([
                'data' => $cards
            ]);
        } else {
            return response()->json([
                'failed' => 'Data gagal, coba lagi'
            ]);
        }
    }

    public function cardStore(Request $request)
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

    public function cardUpdatePositions(Request $request)
    {
        $data = $request->validate([
            'positions' => 'required',
            'positions.*.id' => 'required|exists:columns,id',
            'positions.*.position' => 'required',
        ]);

        foreach ($data['positions'] as $positionData) {
            Card::where('id', $positionData['id'])
            ->update(['position' => $positionData['position']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Positions updated successfully.',
        ]);
    }

    public function cardUpdate(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'position' => 'required|integer',
            'color' => 'nullable',
            'member_id' => 'nullable',
        ]);

        $card = Card::findOrFail($id);
        $oldPosition = $card->position;
        $newPosition = $request->position;

        if ($oldPosition !== $newPosition) {
            if ($newPosition > $oldPosition) {
                Card::where('position', '>', $oldPosition)
                    ->where('position', '<=', $newPosition)
                    ->decrement('position');
            } else {
                Card::where('position', '<', $oldPosition)
                    ->where('position', '>=', $newPosition)
                    ->increment('position');
            }
        }

        $process = $card->update([
            'name' => $request->name,
            'description' => $request->description,
            'position' => $newPosition,
            'color' => $request->color,
            'member_id' => $request->member_id,
        ]);

        if ($process) {
            return response()->json(['data' => $process]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupload data'
            ]);
        }
    }

    public function cardDestroy($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return response()->json([
            'success' => true,
            'message' => 'Card berhasil dihapus'
        ]);
    }
}
