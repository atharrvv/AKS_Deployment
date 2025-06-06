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
