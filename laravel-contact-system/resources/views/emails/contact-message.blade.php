<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesan Baru dari Form Hubungi Saya</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .content {
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 20px;
        }
        .label {
            font-weight: bold;
            color: #495057;
        }
        .message {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Pesan Baru dari Form Hubungi Saya</h2>
        <p>Anda telah menerima pesan baru dari pengunjung website Anda.</p>
    </div>

    <div class="content">
        <p><span class="label">Nama:</span> {{ $nama }}</p>
        <p><span class="label">Email:</span> {{ $email }}</p>
        
        <div>
            <span class="label">Pesan:</span>
            <div class="message">{{ $pesan }}</div>
        </div>
    </div>

    <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">
        Email ini dikirim otomatis dari form hubungi saya di website Anda.
    </p>
</body>
</html>
