<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Laravel Insta App

Laravel Insta App is laravel app simple instagram clone. Built with Laravel 12, Inertia.js, and Tailwind CSS.

Demo Application: [Youtube Link](https://youtu.be/UCZx62qwzNE)

### Features

- [x] User Authentication (register, login, logout)
- [x] Post Creation (Text and image)
- [x] Like and comment Functionality
- [x] Authorization Management

### Installation Instructions

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd laravel-insta
    ```

2. **Install dependencies**

    ```bash
    composer install
    ```

3. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Database setup**

    ```bash
    # Create SQLite database (default)
    touch database/database.sqlite

    # Run migrations and seeders
    php artisan migrate --seed
    ```

5. **Start the development server**
    ```bash
    # Install npm dependencies
    npm install && npm run dev
   
    # Start the server
    php artisan serve
    ```