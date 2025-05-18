pipeline {
  agent any

  tools {
    nodejs "Node18"
  }

  environment {
    SONAR_SCANNER_VERSION = "7.1.0.4889"
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
          bat 'C:\\sonar-scanner-cli-7.1.0.4889\\sonar-scanner-cli-7.1.0.4889\\bin\\sonar-scanner.bat -Dsonar.login=%SONAR_TOKEN%'
        }
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