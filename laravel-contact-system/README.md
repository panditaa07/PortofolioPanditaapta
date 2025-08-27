# Laravel Contact System

Sistem fitur "Hubungi Saya" untuk Laravel yang memungkinkan pengunjung website mengirim pesan melalui form kontak.

## ⚠️ PERHATIAN: Server Laravel vs React

**Perbedaan Penting:**
- **Laravel** menggunakan `php artisan serve` (port 8000)
- **React/Vite** menggunakan `npm run dev` (port 5173)
- **Laravel Contact System** adalah sistem backend yang berbeda dari project React Anda

## 🚀 Cara Menjalankan Laravel Contact System

### 1. Setup Laravel (Backend)
```bash
# Masuk ke folder laravel-contact-system
cd laravel-contact-system

# Install dependencies Laravel
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Jalankan Laravel server
php artisan serve
# Laravel akan berjalan di: http://localhost:8000
```

### 2. Konfigurasi Email di Laravel
```bash
# Update .env dengan konfigurasi email
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=panditaaptasyujadhipura7@gmail.com
MAIL_PASSWORD=your_app_password_here
MAIL_ENCRYPTION=tls
```

### 3. Testing Email di Laravel
```bash
# Test email via Laravel
php artisan tinker
# Di tinker: Mail::raw('test', fn($m) => $m->to('panditaaptasyujadhipura7@gmail.com')->subject('test'))
```

## 🔗 Integrasi dengan React Anda

### A. React Frontend (Port 5173)
Jika Anda ingin menggunakan React frontend Anda dengan Laravel backend:

1. **React Form Component** (di project Anda):
```javascript
// src/components/ContactForm.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/contact-send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                nama: formData.nama,
                email: formData.email,
                pesan: formData.pesan,
                _token: 'your-csrf-token' // atau gunakan csrf token dari Laravel
            })
        });
        
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### B. Laravel Backend (Port 8000)
2. **Laravel CORS Setup** (jika React berbeda port):
```bash
# Install Laravel CORS
composer require fruitcake/laravel-cors
```

3. **Update ContactController** untuk handle JSON request:
```php
// Sudah included di ContactController.php
public function sendMessage(Request $request)
{
    $validated = $request->validate([
        'nama' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'pesan' => 'required|string|min:10',
    ]);

    try {
        Mail::to('panditaaptasyujadhipura7@gmail.com')->send(new ContactMessage($validated));
        return response()->json(['success' => true, 'message' => 'Pesan berhasil dikirim']);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}
```

## 🧪 Testing Email

### Testing via Laravel (Recommended)
1. Jalankan Laravel: `php artisan serve`
2. Buka: `http://localhost:8000/contact`
3. Isi form dan kirim pesan

### Testing via React
1. Jalankan React: `npm run dev` (di project React Anda)
2. Jalankan Laravel: `php artisan serve` (di folder laravel-contact-system)
3. Gunakan form React untuk kirim ke Laravel backend

## 📋 Checklist Setup

### Laravel Setup:
- [ ] `composer install`
- [ ] `cp .env.example .env`
- [ ] `php artisan key:generate`
- [ ] Update email config di .env
- [ ] `php artisan serve`

### Email Testing:
- [ ] Test via: `http://localhost:8000/test-email`
- [ ] Test via: `http://localhost:8000/contact`
- [ ] Check email panditaaptasyujadhipura7@gmail.com

## 🚨 Troubleshooting

### Jika React tidak bisa connect ke Laravel:
1. Pastikan Laravel berjalan di port 8000
2. Pastikan CORS sudah di-setup
3. Check firewall/antivirus

### Jika email tidak terkirim:
1. Jalankan: `http://localhost:8000/test-email`
2. Cek log: `storage/logs/laravel.log`
3. Follow panduan di `TROUBLESHOOTING.md`

## 📞 Support
Untuk bantuan lebih lanjut, cek file `TROUBLESHOOTING.md` untuk panduan detail mengatasi masalah email.
