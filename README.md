# SocialHelp

SocialHelp is a social network that allows people to help each other.

## **Requirements:**
* *Docker* : https://www.docker.com/products/docker-desktop/
* *SocialHelp-be*: clone the SocialHelp-be project if you haven't already done -> https://github.com/ciroraggio/SocialHelp-be

## **Instructions**

1. From the command line, navigate to the project folder and build the server's docker container (it might take a while):

    ```
    cd SocialHelp
    docker build -t social-help-fe .
    ```

2. Follow the instructions in the server repository https://github.com/ciroraggio/SocialHelp-be which will allow you to build the server container and compose the application.

## **Suggestions**
1. If you want to simulate real use of SocialHelp:
   * register some users
   * log in with the different accounts
   * edit profile informations
   * follow some account
   * create posts
   * propose solutions
   * accept/reject solutions
  
- To log in with different accounts on the same computer, open a new browser window for each account.

