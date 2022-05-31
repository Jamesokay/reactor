# Reactor

MERN stack photo-sharing application for desktop with responsive design for mobile. Users are able to upload, share, like and comment on photos.
-	[Back-end](https://github.com/Jamesokay/reactor-api) comprising REST API with login, register and all CRUD operations.
-	Routing handled with Express.
-	Express connected to MongoDB database via Mongoose middleware.
-	Express ‘upload’ and ‘delete’ routes also connected to Cloudinary, a SaaS platform for hosting images and optimizing them for performance. Upon upload, the newly-created Cloudinary image URL is stored in MongoDB. Connection with Cloudinary achieved using Multer middleware.
-	Front-end built with React, CSS and Material UI icons.
-	Requests to API handled with Axios. 
-	Front-end routing handled with React Router.
-	Deployed on [Heroku](https://reactorsocialmedia.herokuapp.com/)
<br>

<img width="700" alt="reactor login page" src="https://user-images.githubusercontent.com/78640728/171156184-96f0d426-0dce-442b-ad6a-12d9bcb5f616.png">
<br>
<img width="700" alt="reactor feed" src="https://user-images.githubusercontent.com/78640728/171156527-f57a0e77-e9cd-4f27-a70e-5e04046aa188.png">
<br>
<img width="700" alt="reactor profile" src="https://user-images.githubusercontent.com/78640728/171156761-93a779f7-09fe-4e1b-8724-162ceec0a53b.png">
<br>
<img width="700" alt="reactor post" src="https://user-images.githubusercontent.com/78640728/171156845-e4d45cb4-9733-4c23-b470-02bdaae21934.png">
<br>
<img width="700" alt="reactor upload" src="https://user-images.githubusercontent.com/78640728/171157091-36b6fd46-7f2b-41d6-a900-701182347f37.png">
