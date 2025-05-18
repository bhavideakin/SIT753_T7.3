pipeline {
  agent any

  tools {
    nodejs "Node18" // Ensure this matches your Jenkins NodeJS tool name
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

    stage('Security Scan (npm audit)') {
      steps {
        bat 'npm audit || exit /b 0'
      }
    }

    stage('Code Quality (SonarCloud)') {
  steps {
    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
      bat 'C:\\sonar-scanner-cli-7.1.0.4889\src\main\assembly\binsonar-scanner.bat -Dsonar.login=%SONAR_TOKEN%'
    }
  }
}


  post {
    always {
      echo 'Pipeline execution finished.'
    }
    success {
      echo 'All stages completed successfully!'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}

// pipeline {
//   agent any

//   tools {
//     nodejs "Node18" // Use the Node.js version installed in Jenkins (check Jenkins > Global Tool Configuration)
//   }

//   stages {
//     stage('Build') {
//       steps {
//         bat 'npm install'
//         bat 'echo Build successful'
//       }
//     }

//     stage('Test') {
//       steps {
//         bat 'npm test || exit /b 0' // Run tests, continue even if they fail
//       }
//     }

//     stage('Security Scan (npm audit)') {
//       steps {
//         bat 'npm audit || exit /b 0' // Run audit, don’t fail build if vulnerabilities exist
//       }
//     }
//   }

//   post {
//     always {
//       echo 'Pipeline execution finished.'
//     }
//     success {
//       echo 'All stages completed successfully!'
//     }
//     failure {
//       echo 'One or more stages failed.'
//     }
//   }
// }


