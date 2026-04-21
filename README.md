# FilmBox Course Project | Softuni "Angular" - April 2026

## Application Purpose
FilmBox is a web application designed to provide an interactive platform where users can discover, share, and review films. 
It allows users to browse a catalog of films, create and manage their own film entries, and interact with other users through likes and comments.
By combining browsing, personal collections, and community-driven feedback, FilmBox aims to enhance the overall film discovery and reviewing experience.

## User Roles
### Guest (Not Authenticated User)
- Can view the home page with the latest films
- Can browse the film catalog with filtering (recent, oldest, newest year, oldest year) and search by title or genre
- Can view detailed information about each film
- Can register or login to access additional features
### Authenticated User
- Can create (upload) new films
- Can edit and delete their own films
- Can like films created by other users
- Can add comments to films created by other users
- Can view their personal library (uploaded and liked films)
- Can see their latest liked films on the home page

## Features
### Public Features 
- Home Page – Displays the latest 5 added films
- Catalog Page – Browse all films with filtering (recent, oldest, newest year, oldest year) and search by title or genre
- Film Details Page – View film details (title, year, genre, description, upload date, creator, likes count) and comments
- Login Page – Allows existing users to sign in
- Register Page – Allows new users to create an account
### Authenticated User Features
- Create Film – Add new films to the catalog
- Edit Film – Edit films created by the user
- Delete Film – Remove films created by the user
- Like Films – Like films created by other users
- Comment on Films – Add comments to films created by other users
- Personal Library – View all uploaded and liked films
- Home Personalization – View latest liked films on the home page
- Logout – Ends the user session and returns to guest state

## Main Application Flow
- User opens the Home page and views the latest films.
- User navigates to the Catalog page to browse all films.
- User filters or searches films by title or genre.
- User selects a film and opens the Film Details page.
- User logs-in or registers to access full functionality.
- Authenticated user can create a new film, which then appears in the Catalog.
- Authenticated user can edit their own film. After editing, the user is redirected to the updated Film Details page showing the modified information.
- Authenticated user can delete their own film. After deletion, the user is redirected back to the Catalog page.
- Authenticated user can like films created by other users. Liked films immediately appear in the Home page (Your Favorite Films section) and in the User Library.
- Authenticated user can add comments to films created by other users only.
- User can access their Personal Library to view all uploaded and liked films.

## Data Structure
The application uses the following main data entities:
- **Film** - Represents a film in the application
  - id
  - title
  - year
  - genre
  - image URL
  - description
  - ownerId
  - ownerUsername
  - createdAt
- **Comment** - Represents a user comment on a film
  - id
  - content
  - filmId
  - username
  - ownerId
  - createdAt
- **Like** - Represents a like action on a film
  - id
  - filmId
  - ownerId
  - createdAt
- **User** - Represents a registered user in the system
  - id
  - email
  - username
  - accessToken

## Project Architecture
- **core/** – Contains singleton services and global logic
  - services/ – API and business logic services
  - guards/ – Route protection logic
  - interceptors/ – Handles authentication and global HTTP error handling for all requests
- **features/** – Contains all application features organized by functional areas
  - auth/ – Login and registration functionality
  - catalog/ – Film browsing and filtering
  - films/ – Film-related functionality 
  - home/ – Home page with latest films and personalized content
  - user-library/ – User’s uploaded and liked films
- **models/** – TypeScript interfaces defining application data structures
- **shared/** – Reusable UI and utility code
  - components/ – Shared UI components
  - pipes/ – Custom Angular pipes

## Technologies Used
- Angular
- TypeScript
- RxJS
- SCSS
- Angular Material
- SoftUni Practice Server (REST API)

## Installation & Setup
- **Clone the repository**
   - git clone https://github.com/valerig1/film-box-angular-softuni.git
   - cd film-box-angular-softuni

- **Install client dependencies**
    - cd client
    - npm install

- **Run the client**
    - ng serve

- **Open the application**
   - http://localhost:4200  

- **Run the SoftUni practice server**
    - cd server
    - node server.js
> This project works with the [SoftUni Practice Server](https://github.com/softuni-practice-server/softuni-practice-server) (run it from the `server` folder as instructed in the repo, no installation of dependencies is required).
