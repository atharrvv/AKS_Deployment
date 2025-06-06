
# 🚀 Fullstack AKS Deployment Pipeline using Jenkins

This repository automates the **CI/CD deployment of a Fullstack application** (backend + frontend) on **Azure Kubernetes Service (AKS)** using **Jenkins**. The pipeline handles Azure login, Docker image builds, ACR pushes, Kubernetes secrets management, and service deployment using manifests.

---

## 📦 Tech Stack

- 🧱 **Terraform** (for infrastructure provisioning - optional)
- ☸️ **Azure Kubernetes Service (AKS)**
- 🐳 **Docker + Azure Container Registry (ACR)**
- 📦 **Backend & Frontend app**
- 🔐 **Jenkins Credentials**
- 🧾 **Kubernetes YAML files**

---

## 🧰 Jenkins Pipeline Overview

### ✅ Environment Variables

| Variable        | Description                  | Source (Jenkins Credentials)     |
|----------------|------------------------------|----------------------------------|
| `DB_URL`       | Database URL                 | `john_url`                       |
| `DB_USER`      | Database username            | `john_username`                 |
| `DB_PASSWORD`  | Database password            | `john_password`                 |
| `azure_principle` | Azure Service Principal (SPN) | Azure App Registration SPN     |

---

## 📋 Pipeline Stages Explained

### 🔐 1. AKS Configure
- Logs into Azure using a service principal.
- Fetches credentials for the AKS cluster named `dilli` in resource group `terra-resource`.

### 🔐 2. Azure Login
- Authenticates into Azure.
- Logs into ACR: `billgates.azurecr.io`.

### 🏗️ 3. Backend Build
- Builds the Docker image from the `./backend` directory.

### ☁️ 4. Backend Push to ACR
- Pushes the image to ACR:
  ```
  billgates.azurecr.io/backend
  ```

### 🔐 5. Kubernetes Secrets Creation
- Uses `kubectl` to create Kubernetes secrets:
  ```bash
  kubectl create secret generic db-credentials \
    --from-literal=DB_URL=$DB_URL \
    --from-literal=DB_USER=$DB_USER \
    --from-literal=DB_PASSWORD=$DB_PASSWORD
  ```

### 🚀 6. Backend Deployment
- Applies the `./yamlat/backend.yaml` manifest to deploy the backend.

### 🌐 7. IP Merge for Frontend
- Executes `./frontend/ip.sh` to dynamically configure frontend with backend IP (e.g., environment replacement).

### 🏗️ 8. Frontend Build
- Builds the frontend Docker image from `./frontend`.

### ☁️ 9. Frontend Push to ACR
- Pushes the image to:
  ```
  billgates.azurecr.io/frontend
  ```

### 🚀 10. Frontend Deployment
- Applies the `./yamlat/frontend.yaml` manifest to deploy the frontend.

---

## 🔐 Jenkins Credentials Required

| ID              | Description                                |
|-----------------|--------------------------------------------|
| `azure_principle` | Azure service principal for `az login`   |
| `john_url`       | DB URL for backend                        |
| `john_username`  | DB username for backend                   |
| `john_password`  | DB password for backend                   |

---

## ⚠️ Notes

- Ensure ACR is enabled for admin access or assign proper RBAC.
- The script assumes ACR is `billgates` and AKS is `dilli` in RG `terra-resource`.
- Update YAML files (`yamlat/backend.yaml` & `frontend.yaml`) to reference the correct image paths and secrets.

---

## 🧪 Useful Commands

```bash
# Test AKS credentials locally
az aks get-credentials --resource-group terra-resource --name dilli

# Verify deployment
kubectl get pods
kubectl describe svc <service-name>
```

---

## ✍️ Author

**atharrvv**  
🔗 [GitHub](https://github.com/atharrvv)
