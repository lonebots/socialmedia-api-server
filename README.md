
## Social Media Server
### Documentation
This is the **REST** based API implementation for a **Social Media** website. More details about the project is listed in this respository.


![Code base](https://github.com/lonebots/socialmedia-api-server/blob/main/resources/socialmedia-api-server.png)
[reference link](https://www.youtube.com/watch?v=goUbHgAzPCs&t=377s)

The technologies used are : 

- Node
- Express
- MongoDB
- Typescript

The tools used are : 

- VSCode
- Postman

### Run Locally
- **Setup the Repository**
    - clone the git respository
    - update the config variables in the **/config** folder - add the **dbUri**, **privateKey**, **publicKey** 
    - navigate to the directory **/socialmedia-api-server**
    - run the command in the terminal `yarn install` followed by `yarn dev`, it will start  the server in the default post or the port you set in the configuration.
- **Setup the Postman API Service**
    - Go to PostMan App.
    - Navigate to *import* on the *file* menu, upload the file *social-media-api-server.postman_collection.json* in the *resource* folder.
    - Create the **environment variables** mentioned bellow 
        -  port, accessToken, refreshToken, email, password, postId.

### Functionality
The basic functionality that can be acomplished by the server are listed bellow.
- For user 
    - Create user 
    - Create session - **login**
    - Delete session - **logout**
    - Retrieve user sessions

- For Post
    - Create post
    - Update post
    - Retrieve post 
    - Delete post






## API Reference

#### Create New User

```http
  POST /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. User email   |
| `password`| `string` | **Required**. User password|
| `name`    | `string` | **Required**. User's name  |

#### Create User Session

```http
  POST /api/sessions
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. User email          |
| `password`| `string` | **Required**. User password       |

Similar API are therer for the **POST** create, update and delete functionalities.


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [@lonebots](https://www.github.com/lonebots)

