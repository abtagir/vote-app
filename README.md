Vote App Deployment on Kubernetes

This repository contains all the necessary files and instructions to deploy a simple vote application on a Kubernetes cluster. 

The application consists of two services:
- vote-client: A frontend service for user interaction.
- vote-server: A backend service for processing votes and communicating with a Redis instance.

Prerequisites
To deploy and run this application, ensure the following tools and accounts are set up:
- Docker: Installed and configured for building and pushing container images.
- Docker Hub Account: For hosting container images.
- Minikube or any other Kubernetes cluster.
- Kubectl: Installed and connected to your Kubernetes cluster.
- Git: For managing the repository.



Repository Structure

<img width="740" alt="image" src="https://github.com/user-attachments/assets/52a3e624-7491-413f-a0d2-b0aff7fe7bcc" />



Steps to Deploy the Application

1. Clone the Repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2. Build Docker Images
  Navigate to the repository root and build the Docker images for both services:

  Build vote-client:

  docker build -t <your-dockerhub-username>/vote-client:latest -f Dockerfile-client .

  Build vote-server:

  docker build -t <your-dockerhub-username>/vote-server:latest -f Dockerfile-server .

3. Push Images to Docker Hub:
  docker push <your-dockerhub-username>/vote-client:latest
  docker push <your-dockerhub-username>/vote-server:latest

4. Update Kubernetes Manifest
  Ensure the vote-app.yaml file contains the correct image paths for your Docker Hub repository:
  image: <your-dockerhub-username>/vote-client:latest
  image: <your-dockerhub-username>/vote-server:latest

5. Deploy to Kubernetes
  Apply the Kubernetes manifest:
  kubectl apply -f vote-app.yaml

6. Verify Deployment
  Check the status of the pods:
  kubectl get pods
  check http://<minikube-ip>:30001


Kubernetes Manifest Overview

The vote-app.yaml contains:
- Deployments for vote-client and vote-server
  
- Services for internal and external communication
  
- Environment Variables to configure the backend

Troubleshooting
ImagePullBackOff: Ensure the images are pushed to Docker Hub and the image paths in vote-app.yaml are correct.

Application Not Accessible: Confirm the vote-client service is exposed using minikube service or an equivalent command for your cluster.

Logs: View pod logs for debugging:
kubectl logs <pod-name>
