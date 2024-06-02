<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sales;
use App\Models\Kategori;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SalesResource;
use Carbon\Carbon;

class SalesController extends Controller
{
    public function index(Request $request)
    {
        $filter = Sales::query();

        // searching
        if ($request->filled('searching')) {
            $searchQuery = $request->input('searching');
            $filter->where('nama_barang', 'like', "%$searchQuery%");
        }

        // jenis barang
        if ($request->filled('jenisBarang') && $request->jenis_barang !== 'All') {
            $filter->where('id_kategoriBarang', $request->input('jenisBarang'));
        }

        // filter kalender
        if ($request->filled(['startDate', 'endDate'])) {
            $startDate = Carbon::parse($request->input('startDate'));
            $endDate = Carbon::parse($request->input('endDate'));
            $filter->whereBetween('tanggal_transaksi', [$startDate, $endDate]);
        }

        // terjual or stok
        if ($request->filled('terjualOrStok')) {
            if ($request->input('terjualOrStok') === 'terjual') {
                $filter->orderBy('terjual', 'ASC');
            } elseif ($request->input('terjualOrStok') === 'stok') {
                $filter->orderBy('stok', 'ASC');
            }
        }

        // urutan
        if ($request->filled('urutkan') && $request->urutkan !== 'All') {
            $filter->orderBy($request->input('urutkan'), 'ASC');
        } else {
            $filter->orderBy('id', 'DESC');
        }

        $sales = $filter->get();


        return response(SalesResource::collection($sales));
    }

    function count(Request $request) {
        $totalProduct = Sales::distinct('nama_barang')->count('nama_barang');
        $totalStok = Sales::sum('stok');
        $totalTerjual = Sales::sum('terjual');
        $totalJenis = Kategori::count();

        return response()->json([
            'totalProduct' => $totalProduct,
            'totalStok' => $totalStok,  
            'totalTerjual' => $totalTerjual,
            'totalJenis' => $totalJenis,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_barang' => 'required',
            'stok' => 'required|int',
            'terjual' => 'required|int',
            'tanggal_transaksi' => 'required',
            'jenis_barang' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ],400);
        }

        $sales = new Sales;
        $sales->nama_barang = $request->nama_barang;
        $sales->stok = $request->stok;
        $sales->terjual = $request->terjual;
        $sales->tanggal_transaksi = $request->tanggal_transaksi;
        $sales->id_kategoriBarang = $request->jenis_barang;
        $sales->save();

        return response()->json([
            'messages' => 'success',
            'data' => $sales,
        ],200);
    }

    public function show(string $id)
    {
        $sales = Sales::select('sales.*', 'kategoris.nama_kategori AS jenis_barang')
                ->join('Kategoris', 'kategoris.id','=','sales.id_kategoriBarang')
                ->where('sales.id', $id)
                ->first();

        return response()->json([
            'messagess' => 'success',
            'data' => $sales,
        ],200);

    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_barang' => 'required',
            'stok' => 'required',
            'terjual' => 'required',
            'tanggal_transaksi' => 'required',
            'jenis_barang' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ],400);
        }

        $sales = Sales::findOrNew($id);
        $sales->nama_barang = $request->nama_barang;
        $sales->stok = $request->stok;
        $sales->terjual = $request->terjual;
        $sales->tanggal_transaksi = $request->tanggal_transaksi;
        $sales->id_kategoriBarang = $request->jenis_barang;
        $sales->save();

        return response()->json([
            'messages' => 'success',
            'data' => $sales,
        ],200);
    }

    public function destroy(string $id)
    {
        $sales = Sales::find($id);
        $sales->delete();

        return response()->json(null, 204);
    }
}
