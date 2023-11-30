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
                    sh "curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-\$(uname -s)-\$(uname -m) -o /usr/local/bin/docker-compose"
                    sh 'chmod +x /usr/local/bin/docker-compose'
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
                    
                    // Generate Laravel application key
                    sh 'php artisan key:generate'
                    
                    // Build and run Docker Compose
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Chạy các bài kiểm thử Laravel
                sh 'php artisan test'
            }
        }
    }

    post {
        always {
            // Dừng và xóa container sau khi chạy xong
            script {
                sh 'docker-compose down'
            }
        }
    }
}
