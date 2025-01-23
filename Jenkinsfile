pipeline {
    agent any
    environment {
        DB_URL = credentials('john_url')
        DB_USER = credentials('john_username')
        DB_PASSWORD = credentials('john_password')
    }

    stages {
        stage ('AKS configure') {
             steps {
                 script {
                     withCredentials([azureServicePrincipal('azure_principle')]) {
                         sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                         sh  'az aks get-credentials --resource-group terra-resource --name dilli --overwrite-existing'
                     }
                 }
             }
         }
        stage ('AZ login') {
            steps {
                script {
                    withCredentials([azureServicePrincipal('azure_principle')]) {
                        sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
                        sh  'az acr login --name billgates'
                        }
                    }
                }
            }
        stage ('Backend Build') {
            steps {
                script {
                    docker.build('billgates.azurecr.io/backend', './backend')
                }
            }
        }
        stage ('Backend to ACR') {
            steps {
                script {
                    // docker.withRegistry('https://keanu.azurecr.io', 'acr') {
                    //     docker.image("keanu.azurecr.io/backendd:latest").push()
                    // }
                    sh "az acr login --name billgates && docker push billgates.azurecr.io/backend"
                }
            }
        }
        stage ('Backend Apply') {
            steps {
                script {
                    withCredentials([azureServicePrincipal('azure_principle')]) {
                        sh  'az aks get-credentials --resource-group terra-resource --name dilli --overwrite-existing'
                         sh """
                         kubectl create secret generic db-credentials \
                         --from-literal=DB_URL=${DB_URL} \
                         --from-literal=DB_USER=${DB_USER} \
                         --from-literal=DB_PASSWORD=${DB_PASSWORD}
                         """
                        sh 'kubectl apply -f ./yamlat/backend.yaml'
                    }
                }
            }
        }
        stage ('IP merege') {
            steps {
                script {
                    sh 'bash ./frontend/ip.sh'
                }
            }
        }
        stage ('frontend Build'){
            steps {
                script {
                    docker.build('billgates.azurecr.io/frontend', './frontend')
                }
            }
        }
        stage('Frontend to ACR') {
            steps {
                script {
                    // docker.withRegistry('https://keanu.azurecr.io', 'acr') {
                    //     docker.image("keanu.azurecr.io/frontendd:latest").push()
                    // }
                    sh "az acr login --name billgates && docker push billgates.azurecr.io/frontend"
                }
            }
        }
        stage ('Frontend apply') {
            steps {
                script {
                    withCredentials([azureServicePrincipal('azure_principle')]){
                        sh  'az aks get-credentials --resource-group terra-resource --name dilli --overwrite-existing'
                        sh 'kubectl apply -f ./yamlat/frontend.yaml'
                    }
                }
            }
        }        
    }
}
