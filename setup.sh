#!/bin/bash

# Chờ đến khi các container khởi động hoàn toàn
echo "Waiting for containers to start..."
sleep 30

# Truy cập và cấu hình container dbForPostman
docker exec -it dbForPostman mysql -u root -p -e "GRANT ALL ON postmanTest.* TO 'root'@'%' IDENTIFIED BY '140903'; FLUSH PRIVILEGES;"

# Truy cập và cấu hình container appForPostman
docker exec -it appForPostman /bin/bash -c "php artisan key:generate && php artisan config:cache && php artisan migrate" && echo "Command executed successfully"

