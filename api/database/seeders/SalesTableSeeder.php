<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SalesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sales')->insert([
            [
                'nama_barang' => 'Kopi',
                'stok' => 100,
                'terjual' => 10,
                'tanggal_transaksi' => Carbon::now()->subDays(7)->toDateString(),
                'id_kategoriBarang' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_barang' => 'Teh',
                'stok' => 100,
                'terjual' => 19,
                'tanggal_transaksi' => Carbon::now()->subDays(6)->toDateString(),
                'id_kategoriBarang' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_barang' => 'Kopi',
                'stok' => 90,
                'terjual' => 15,
                'tanggal_transaksi' => Carbon::now()->subDays(5)->toDateString(),
                'id_kategoriBarang' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_barang' => 'Pasta Gigi',
                'stok' => 100,
                'terjual' => 20,
                'tanggal_transaksi' => Carbon::now()->subDays(4)->toDateString(),
                'id_kategoriBarang' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_barang' => 'Sabun Mandi',
                'stok' => 100,
                'terjual' => 30,
                'tanggal_transaksi' => Carbon::now()->subDays(3)->toDateString(),
                'id_kategoriBarang' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_barang' => 'Sampo',
                'stok' => 100,
                'terjual' => 25,
                'tanggal_transaksi' => Carbon::now()->subDays(2)->toDateString(),
                'id_kategoriBarang' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_barang' => 'Teh',
                'stok' => 81,
                'terjual' => 5,
                'tanggal_transaksi' => Carbon::now()->subDays(1)->toDateString(),
                'id_kategoriBarang' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
