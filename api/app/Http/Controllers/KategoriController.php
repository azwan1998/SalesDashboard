<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategori;
use Illuminate\Support\Facades\Validator;


class KategoriController extends Controller
{
    public function index(Request $request)
    {
        $filter = Kategori::select('*');

        if($request->jenis_kategori){
            $filter->where('jenis_kategori', $request->jenis_kategori);
        }

        $kategori = $filter->get();

        return response()->json([
            'messages' => 'success',
            'data' => $kategori
        ],200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_kategori' => 'required|string|max:255',
            'jenis_kategori' => 'required|in:barang,pembayaran',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ],400);
        }

        $kategori = Kategori::create($request->all());

        return response()->json([
            'messages' => 'success',
            'data' => $kategori
        ],200);

    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_kategori' => 'required|string|max:255',
            'jenis_kategori' => 'required|in:barang,pembayaran',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ],400);
        }

        $kategori = Kategori::findOrFail($id);
        $kategori->update($request->all());

        return response()->json([
            'messages' => 'success',
            'data' => $kategori
        ],200);
    }

    public function destroy(string $id)
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete(); 

        return response()->json(null, 204);
    }
}
