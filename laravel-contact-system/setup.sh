#!/bin/bash

# Laravel Contact System Setup Script
# This script helps set up the Laravel contact system

echo "🚀 Setting up Laravel Contact System..."

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP 8.1 or higher."
    exit 1
fi

# Check if Composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed. Please install Composer."
    exit 1
fi

# Install Laravel dependencies
echo "📦 Installing Laravel dependencies..."
composer install

# Copy environment file
echo "⚙️  Setting up environment file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env file created from .env.example"
else
    echo "⚠️  .env file already exists"
fi

# Generate application key
echo "🔑 Generating application key..."
php artisan key:generate

# Create storage link
echo "🔗 Creating storage link..."
php artisan storage:link

# Run migrations (if needed)
echo "🗄️  Running migrations..."
php artisan migrate

# Clear config cache
echo "🧹 Clearing config cache..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your email settings in .env file"
echo "2. Set up your database configuration in .env"
echo "3. Run: php artisan serve"
echo "4. Visit: http://localhost:8000/contact"
echo ""
echo "📧 Email Configuration:"
echo "Update these values in .env:"
echo "MAIL_USERNAME=your-email@gmail.com"
echo "MAIL_PASSWORD=your-app-password"
echo ""
echo "🎉 Happy coding!"
