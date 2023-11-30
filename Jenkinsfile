pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Bước này để Jenkins checkout mã nguồn từ repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Bước này để cài đặt các dependency của Laravel
                sh 'composer install'
            }
        }

        stage('Run Tests') {
            steps {
                // Bước này để chạy các bài kiểm thử
                sh 'php artisan test'
            }
        }

        stage('Build and Deploy') {
            steps {
                // Bước này để xây dựng ứng dụng và triển khai nó
                sh 'php artisan key:generate'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
}
