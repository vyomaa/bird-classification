![image](https://github.com/user-attachments/assets/3f565713-0c67-4c18-8e84-ee5f989672cd)
This project is an application for identifying birds on upload of an image. I was inspired to make it after my parents kept sending pictures of birds around their house in the family group. The application is not perfect and only identifies 524 species of birds. Nevertheless, I think it is very cool that now every time my parents see a bird flying about they can find out what bird it is. Or at least a very good guess at what bird it might be.
## How it works

The core of the project is an EfficientNet classification algorithm that has been trained and validated on a dataset of 524 bird species images. This dataset was taken from Kaggle. The model was then saved and I used a Python Flask server to load the model and run a preprocessed user input image through the model to find the prediction. I developed the front-end using HTML, CSS and JS so that it looks user-friendly and immersive. Everything comes together and is deployed on AWS EC2 on an NGINX server from where it is accessible to the general public. (In specific, my parents)

## Usage

1. Clone the repository.
2. Create an EC2 Instance and a key-pair. SSH into the EC2 instance and upload the repository files.
3. Configure the nginx.conf file. Then run the python Flask server.
4. Now you can share the IP/DNS address to others so they can access the application.

## Dataset Credit

https://www.kaggle.com/datasets/gpiosenka/100-bird-species

(Also credit to the author of the dataset for the cool easter eggs)
