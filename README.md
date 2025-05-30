# 🚀 Petunjuk Setup Proyek dengan Docker + Sequelize (untuk Windows)

---
## Jalankan MySQL di Docker
Buka **Command Prompt atau Git Bash**, lalu jalankan:

```bash
docker run -d --name mysql-sirenta -e MYSQL_ROOT_PASSWORD=root -p 3307:3306 mysql:latest
```

---
## Restore Database dari File Dump
Simpan file **sirenta_dump.sql** dalam folder dan buka folder dalam **Command Prompt atau Git Bash**, lalu jalankan:

```bash
docker cp sirenta_dump.sql mysql-sirenta:/sirenta_dump.sql
```
Lalu import dump ke database:

```bash
docker exec -i mysql-sirenta sh -c "mysql -uroot -proot sirenta_db < /sirenta_dump.sql"
```
---
## Cek Apakah Database Berhasil di Import
Masuk ke MySQL di dalam container dengan menjalankan:

```bash
docker exec -it mysql-sirenta mysql -uroot -proot
```

Setelah berhasil masuk, prompt-nya akan menjadi seperti ini:

```bash
mysql>
```
Dalam prompt di atas, lihat daftar database dengan menggunakan perintah:

```bash
SHOW DATABASES;
```
Pastikan database **sirenta_db** muncul, lalu gunakan database tersebut:

```bash
USE sirenta_db;
```
Lalu tampilkan tabel:

```bash
SHOW TABLES;
```
Jika output muncul, maka file berhasil di-import.

---
## Menjalankan Migration dan Seeders
Pastikan file **.env** telah dibuat dan buka **terminal/git bash** lalu pastikan direktori project seperti ini:

```bash
~/sirenta-2025/server$
```
Lalu jalankan migration:

```bash
npx sequelize-cli db:migrate
```
Lalu jalankan juga seeders:

```bash
npx sequelize-cli db:seed:all
```

---
