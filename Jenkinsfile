pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_VERSION = '1.29.2'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Docker Compose') {
            steps {
                script {
                    // Cài đặt Docker Compose
                    sh 'sudo curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose'
                    sh 'sudo chmod +x /usr/local/bin/docker-compose'
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Copy .env.example to .env
                    sh 'cp .env.example .env'
                    
                    // Cài đặt composer dependencies
                    sh 'composer install'
                    
                    // Build and run Docker Compose
                    sh 'sudo docker-compose up -d'
                }
            }
        }
        stage('Setup Database') {
            steps {
                script {
                    sh 'sudo docker exec dbForPostman mysql -u root -proot -e "GRANT ALL ON postmanTest.* TO \'root\'@\'%\' IDENTIFIED BY \'140903\'; FLUSH PRIVILEGES;"'
                }
            }
        }
        stage('Check before Database') {
            steps {
                script {
                    sh 'sudo docker exec -i dbForPostman mysql -u root -proot -e "DROP DATABASE IF EXISTS postmanTest;"'
                    sh 'sudo docker exec -i dbForPostman mysql -u root -proot -e "CREATE DATABASE postmanTest;"'
                }
            }
        }

        stage('Setup Application') {
            steps {
                script {
                    sh 'sudo docker exec appForPostman bash -c "php artisan key:generate && php artisan config:cache && php artisan migrate"'
                }
            }
        }

        stage('Check after Database') {
            steps {
                script {
                    sh 'sudo docker exec -i dbForPostman mysql -u root -proot -e "USE postmanTest; SHOW TABLES;"'
                    sh 'sudo docker-compose up -d'
                    sh 'sudo docker ps'
                }

            }
        }

        stage('Run Newman Tests') {
            steps {
                script {
                    sh 'newman run Testing26.postman_collection.json -e workspace.postman_globals.json'
                }
            }
        }

    }

    post {
        always {
            // Dừng và xóa container sau khi chạy xong
            script {
                sh 'sudo docker-compose down'

            }
        }
    }
}
