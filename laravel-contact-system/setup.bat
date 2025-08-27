@echo off
echo 🚀 Setting up Laravel Contact System...

REM Check if PHP is installed
php --version >nul 2>&1
if errorlevel 1 (
    echo ❌ PHP is not installed or not in PATH. Please install PHP 8.1 or higher.
    pause
    exit /b 1
)

REM Check if Composer is installed
composer --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Composer is not installed or not in PATH. Please install Composer.
    pause
    exit /b 1
)

REM Install Laravel dependencies
echo 📦 Installing Laravel dependencies...
call composer install

REM Copy environment file
echo ⚙️  Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo ✅ .env file created from .env.example
) else (
    echo ⚠️  .env file already exists
)

REM Generate application key
echo 🔑 Generating application key...
call php artisan key:generate

REM Create storage link
echo 🔗 Creating storage link...
call php artisan storage:link

REM Run migrations (if needed)
echo 🗄️  Running migrations...
call php artisan migrate

REM Clear config cache
echo 🧹 Clearing config cache...
call php artisan config:clear
call php artisan cache:clear
call php artisan route:clear
call php artisan view:clear

echo.
echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Configure your email settings in .env file
echo 2. Set up your database configuration in .env
echo 3. Run: php artisan serve
echo 4. Visit: http://localhost:8000/contact
echo.
echo 📧 Email Configuration:
echo Update these values in .env:
echo MAIL_USERNAME=your-email@gmail.com
echo MAIL_PASSWORD=your-app-password
echo.
echo 🎉 Happy coding!
pause
