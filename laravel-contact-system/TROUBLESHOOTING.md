    # Troubleshooting Email Tidak Terkirim

## Masalah: Email tidak terkirim ke panditaaptasyujadhipura7@gmail.com

### Solusi Lengkap:

## 1. Konfigurasi Gmail yang Benar

### A. Setup Gmail App Password
1. Login ke akun Gmail panditaaptasyujadhipura7@gmail.com
2. Aktifkan 2FA (Two-Factor Authentication)
3. Buka: https://myaccount.google.com/apppasswords
4. Klik "Select app" → "Mail"
5. Klik "Select device" → "Other (Custom name)" → "Laravel Contact"
6. Copy 16-digit password yang muncul

### B. Update .env dengan konfigurasi benar
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=panditaaptasyujadhipura7@gmail.com
MAIL_PASSWORD=your_16_digit_app_password_here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=panditaaptasyujadhipura7@gmail.com
MAIL_FROM_NAME="Laravel Contact System"
```

## 2. Testing Email dengan Command

### A. Test via Artisan Tinker
```bash
php artisan tinker

# Di tinker prompt, ketik:
Mail::raw('Test email dari Laravel Contact System', function($message) {
    $message->to('panditaaptasyujadhipura7@gmail.com')
            ->subject('Test Email - Laravel Contact');
});
```

### B. Test via Route (temporary)
Tambahkan di routes/web.php:
```php
Route::get('/test-email', function() {
    try {
        Mail::raw('Test email dari Laravel Contact System', function($message) {
            $message->to('panditaaptasyujadhipura7@gmail.com')
                   ->subject('Test Email - Laravel Contact');
        });
        return 'Email berhasil dikirim! Check email Anda.';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});
```

## 3. Debugging Steps

### A. Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### B. Check Log File
```bash
# Windows
type storage\logs\laravel.log

# Unix/Linux/Mac
tail -f storage/logs/laravel.log
```

### C. Enable Debug Mode
Pastikan di .env:
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

## 4. Alternatif Email Services

### A. Mailtrap (untuk testing)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
```

### B. SendGrid
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key
MAIL_ENCRYPTION=tls
```

## 5. Script Testing Otomatis

### A. Windows (test-email.bat)
```batch
@echo off
echo Testing email configuration...
php artisan tinker --execute="Mail::raw('Test email', function($message) { $message->to('panditaaptasyujadhipura7@gmail.com')->subject('Test'); });"
pause
```

### B. Unix/Linux/Mac (test-email.sh)
```bash
#!/bin/bash
echo "Testing email configuration..."
php artisan tinker --execute="Mail::raw('Test email', function($message) { \$message->to('panditaaptasyujadhipura7@gmail.com')->subject('Test'); });"
```

## 6. Checklist Verifikasi

- [ ] Gmail 2FA aktif
- [ ] App password sudah di-generate
- [ ] .env sudah di-update dengan app password
- [ ] Cache sudah di-clear
- [ ] Test email berhasil via tinker
- [ ] Test email berhasil via form kontak
- [ ] Check folder spam/junk di email

## 7. Error Messages yang Umum

### "Failed to authenticate on SMTP server"
- Solusi: Pastikan app password benar, bukan password Gmail biasa

### "Connection could not be established"
- Solusi: Cek firewall/antivirus, pastikan port 587 tidak diblokir

### "Expected response code 250 but got code 535"
- Solusi: Aktifkan "Less secure app access" di Gmail (tidak direkomendasikan) atau gunakan app password

## 8. Verifikasi Akhir

Setelah semua konfigurasi benar:
1. Jalankan: `php artisan serve`
2. Akses: `http://localhost:8000/test-email`
3. Akses: `http://localhost:8000/contact` dan kirim test message
4. Cek email panditaaptasyujadhipura7@gmail.com (termasuk folder spam)

Jika masih mengalami masalah, jalankan script setup ulang:
- Windows: `setup.bat`
- Unix/Linux/Mac: `./setup.sh`
