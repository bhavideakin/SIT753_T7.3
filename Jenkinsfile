pipeline {
  agent any

  tools {
    nodejs "Node18" // This tells Jenkins to use Node.js version 18
  }

  environment {
    SONAR_SCANNER_VERSION = "4.7.0.2747"
    SONAR_SCANNER_DIR = "sonar-scanner-${SONAR_SCANNER_VERSION}-linux"
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test || true'
      }
    }

    stage('Code Quality (SonarCloud)') {
      steps {
        withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
          sh '''
            curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/${SONAR_SCANNER_DIR}.zip
            unzip -q sonar-scanner.zip
            ./${SONAR_SCANNER_DIR}/bin/sonar-scanner -Dsonar.login=$SONAR_TOKEN
          '''
        }
      }
    }

    stage('Security Scan (npm audit)') {
      steps {
        sh 'npm audit || true'
      }
    }
  }
}
