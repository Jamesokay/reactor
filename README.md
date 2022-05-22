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

<img width="700" alt="reactorfeed" src="https://user-images.githubusercontent.com/78640728/169686283-143d2f8e-dfae-4ea2-933e-deaffcf75b6a.png">
<br>
<img width="700" alt="reactorprofile" src="https://user-images.githubusercontent.com/78640728/169686379-0cddac62-2977-473c-ad77-47858f67d163.png">
<br>
<img width="700" alt="reactorpost" src="https://user-images.githubusercontent.com/78640728/169686470-3a056d79-b13e-4609-8a4f-21cb837cccb2.png">
