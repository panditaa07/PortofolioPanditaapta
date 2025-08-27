<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route untuk form hubungi saya
Route::post('/contact-send', [ContactController::class, 'sendMessage'])->name('contact.send');

// Route untuk menampilkan form kontak
Route::get('/contact', function () {
    return view('contact');
});

// Route testing email (temporary - untuk debugging)
Route::get('/test-email', function() {
    try {
        Mail::raw('Test email dari Laravel Contact System', function($message) {
            $message->to('panditaaptasyujadhipura7@gmail.com')
                   ->subject('Test Email - Laravel Contact');
        });
        return '✅ Email berhasil dikirim! Check email panditaaptasyujadhipura7@gmail.com (termasuk folder spam)';
    } catch (\Exception $e) {
        return '❌ Error: ' . $e->getMessage() . '<br><br>Silakan cek file TROUBLESHOOTING.md untuk solusi lengkap';
    }
});

// Route untuk cek konfigurasi email
Route::get('/email-config', function() {
    return response()->json([
        'mail_host' => config('mail.mailers.smtp.host'),
        'mail_port' => config('mail.mailers.smtp.port'),
        'mail_username' => config('mail.mailers.smtp.username'),
        'mail_from_address' => config('mail.from.address'),
        'mail_from_name' => config('mail.from.name'),
    ]);
});
