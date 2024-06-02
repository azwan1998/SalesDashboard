<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Kategori;


class SalesResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $jenis_barang = Kategori::where('id', $this->id_kategoriBarang)->first();

        return [
            'id' => $this->id,
            'nama_barang' => $this->nama_barang,
            'stok' => $this->stok,
            'terjual' => $this->terjual,
            'tanggal_transaksi' => $this->tanggal_transaksi,
            'jenis_barang' => $jenis_barang->nama_kategori,
        ];
    }
}
