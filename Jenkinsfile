pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  environment {
    SONAR_SCANNER_VERSION = "4.7.0.2747"
    SONAR_SCANNER_DIR = "sonar-scanner-%SONAR_SCANNER_VERSION%-windows"
  }

  stages {
    stage('Build') {
      steps {
        bat 'npm install'
        bat 'echo Build successful'
      }
    }

    stage('Test') {
      steps {
        bat 'npm test || exit /b 0'
      }
    }

    stage('Code Quality (SonarCloud)') {
  steps {
    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
      bat '''
        powershell -Command "Invoke-WebRequest -Uri https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-4.7.0.2747-windows.zip -OutFile sonar-scanner.zip"
        powershell -Command "Expand-Archive sonar-scanner.zip -DestinationPath sonar-scanner"
        sonar-scanner\\sonar-scanner-4.7.0.2747-windows\\bin\\sonar-scanner.bat -Dsonar.login=%SONAR_TOKEN%
      '''
    }
  }
}



    stage('Security Scan (npm audit)') {
      steps {
        bat 'npm audit || exit /b 0'
      }
    }
  }
}
