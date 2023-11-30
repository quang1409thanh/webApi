sau khi chay docker compose up -d
docker exec -it appForPostman /bin/bash
php artisan key:generate
php artisan config:cache
chuyển qua dbForPostman
docker exec -it dbForPostman /bin/bash
    mysql -u root -p -> pass: "root"
    GRANT ALL ON laravel_web.* TO 'root'@'%' IDENTIFIED BY '140903';
    FLUSH PRIVILEGES;
sau đó thóat ra kiểm tra phpmyadmin được chưa.