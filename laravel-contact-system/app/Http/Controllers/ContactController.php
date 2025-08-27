<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function sendMessage(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'pesan' => 'required|string|min:10',
        ]);

        try {
            // Log untuk debugging
            Log::info('Attempting to send contact email', [
                'from' => $validated['email'],
                'to' => 'panditaaptasyujadhipura7@gmail.com',
                'data' => $validated
            ]);

            // Kirim email
            Mail::to('panditaaptasyujadhipura7@gmail.com')->send(new ContactMessage($validated));
            
            // Log sukses
            Log::info('Contact email sent successfully', [
                'from' => $validated['email'],
                'to' => 'panditaaptasyujadhipura7@gmail.com'
            ]);
            
            // Redirect dengan pesan sukses
            return redirect()->back()->with('success', 'Pesan berhasil dikirim');
            
        } catch (\Exception $e) {
            // Log error detail
            Log::error('Failed to send contact email', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $validated
            ]);
            
            // Redirect dengan pesan error detail
            return redirect()->back()
                ->withInput()
                ->with('error', 'Gagal mengirim pesan: ' . $e->getMessage());
        }
    }
}
