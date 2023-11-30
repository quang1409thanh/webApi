#!/bin/bash
# Wait for the database to be ready
while ! mysqladmin ping -h"$DB_HOST" --silent; do
    sleep 1
done

# Run the setup commands
php artisan key:generate
php artisan config:cache
php artisan migrate
