Untuk Menjalankan Applikasi ini Pastikan sudah terinstal node js, composer dan lain lain untuk menjalankan applikasi

Cara Install Back-end Laravel dan menjalankannya
1. buka folder Applikasinya setelah itu buka folder api
2. buat satu file .env diambil dari .env.example dan edit databasenya menjadi sales
3. buat database dengan nama sales
4. buka terminal dan arahkan terminal di folder Applikasinya/api
5. jalankan migrate nya dengan perintah "php artisan migrate"
6. jalankan perintah seed database dengan perintah "php artisan DB:seed"
7. composer install && compser update
8. jalankan perintah "php artisan serve"

Cara install Front-end dan menjalankannya
1. buka terminal dan arahkan ke folder applikasinya->client
2. jalankan perintah "npm install" dan "npm run dev"
3. setelah itu buka di browser "http://localhost:5173/"
