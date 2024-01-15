# CAN-Chariott Demos

The repository contains the instructions and code that allows you to create a dashboard demo using virtual can interface that leverages Chariott's service discovery

## What is Chariott?

Chariott is a [gRPC](https://grpc.io) service that provides a common interface for interacting with applications. It facilitates Service Discovery for applications to advertise their capabilities by registering themselves with Chariott's service registry. Other applications that need to consume resources and capabilities can Discover services through Chariott's service registry.

[Know more about Chariott](https://projects.eclipse.org/projects/automotive.chariott)

# Demo 1

## THIS DEMO WILL WORK BEST ON MUMBAI (ap-south-1) region

Deploy EC2 in Mumbai region

Please open the below link in new tab to ease the process

[![Launch](https://samdengler.github.io/cloudformation-launch-stack-button-svg/images/ap-south-1.svg)](https://ap-south-1.console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/quickcreate?templateURL=https%3A%2F%2Fs3.ap-south-1.amazonaws.com%2Fcf-templates-fui01m96flo3-ap-south-1%2F2024-01-11T062004.488Zwht-demo-1-dashboard-ec2-template.yml&stackName=Chariott-CAN-demo1)


The ```Chariott-CAN-demo1``` CloudFormation stack will take about **2 minutes** to be created. This cloudformation stack creates an ec2 instance named "Chariott-demo1" to deploy the demo, a security group, a key pair. The instance spun uses custom AMI based on Ubuntu 22.04 LTS (Jammy Jellyfish) that is preinstalled with all the dependencies needed for the demo to run.

### Locally downloading the Private key file

Follow the steps below to download the private .pem key file to SSH into the instance

Open cloudshell and run the following command

```sh 
aws ec2 describe-key-pairs --filters Name=key-name,Values=keypair-for-chariott-demo1 --query KeyPairs[*].KeyPairId --output text
```

The output will be the key ID. Note down it

Run the below command to save .pem file in the cloudshell directory

Change the keyid paramater to the output of previous command

```sh
aws ssm get-parameter --name /ec2/keypair/<keyid here> --with-decryption --query Parameter.Value --output text > keypair-for-chariott-demo1.pem
```

<img width="932" alt="Screenshot 2024-01-11 123931" src="https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/2c462316-e862-4693-a40c-1c6d2253a8db">


Go to actions -> download file and paste this path "/home/cloudshell-user/keypair-for-chariott-demo1.pem" inside the path field to save .pem key file locally

<img width="450" alt="Screenshot 2024-01-11 124035" src="https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/97d1d419-b526-47cc-9ef5-be5349f4a53f">


If you go to ec2 instances page, you will find a newly created instance named "Chariott-demo1". SSH into the instance using the key file  that you have previously downloaded

After you SSH into the instance, you can see that the demo's docker image is running in the instance. To verify, run the below command

```sh
docker ps
```

Copy the "CONTAINER ID" from the result of the above command as it will be helpful in the next step.

<img width="638" alt="Screenshot 2024-01-11 124844" src="https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/4b47e721-b20a-4a89-8552-009b13a66b11">


To pass the CAN signals, run the below command. Use the "CONTAINER ID" copied in the before step inplace <container_id> in the below command

```sh
docker exec -it <container_id> sh -c "node car.js"
```

This command should simulate the CAN signals like below

<img width="357" alt="Screenshot 2024-01-11 125912" src="https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/8d7c4353-46ad-4963-82fd-fd4d24f568f3">


To visualize the demo give the address -> http://<instance_public_ip>:8081 in any browser of your choice

To get the instance public ip, navigate to AWS Console home -> EC2, then select the instance named "Chariott-demo1". Under the info, copy the Public IPv4 address.

<img width="753" alt="Screenshot 2024-01-11 131200" src="https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/d6188224-7d0e-4856-9436-78874c9962dc">


To visualize the demo give the address -> http://<instance_public_ip>:8081 in any browser of your choice

You should see something similar to the below gif

![giphy](https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/8c09eb31-4c46-4a1d-adcf-27c971ab6ebe)


Can also verify the stream of messages passing by opening the browser developer tools (for chrome browser, use ctrl + shift + i or right-click and choose "inspect"). It should look something similar to the below image

![Screenshot (420)](https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/4ab11442-6711-4558-81f9-4b6d225bc301)


# Demo 2

## THIS DEMO WILL WORK BEST ON MUMBAI (ap-south-1) region

Deploy EC2 in Mumbai region

Please open the below link in new tab to ease the process

[![Launch](https://samdengler.github.io/cloudformation-launch-stack-button-svg/images/ap-south-1.svg)](https://ap-south-1.console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/quickcreate?templateURL=https%3A%2F%2Fs3.ap-south-1.amazonaws.com%2Fcf-templates-fui01m96flo3-ap-south-1%2F2024-01-15T082243.326Zjni-demo-2-chariott-cfn.yml&stackName=Service-discovery-demo2)

The ```Service-discovery-demo2``` CloudFormation stack will take about **2 minutes** to be created. This cloudformation stack creates an ec2 instance named "Service-discovery-demo2" to deploy the demo, a security group, a key pair. The instance spun uses custom AMI based on Ubuntu 22.04 LTS (Jammy Jellyfish) that is preinstalled with all the dependencies needed for the demo to run.

Now go to the EC2 instance page, choose the instance named **Service-discovery-demo2**. Choose "Connect" option and select "EC2-Instance connect" option. Change the username to "ubuntu" and select "connect". The instance will be connected via SSH. 

![Screenshot (423)](https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/70fa1355-0a43-4dbd-8333-4b9c91f5f588)


Run the below command to know the status of the docker container

```sh
docker ps
```

Copy the Container ID and run the below command to see the logs of the container. The log should state that the Service registry is running at port 50000, something similar to the below image

```sh
docker logs <container id>
```

![Screenshot (422)](https://github.com/Prem-Kumar16/dash_grpcweb_v3/assets/75419846/4fcfe226-d254-4a41-be36-6d30c9d72a75)

