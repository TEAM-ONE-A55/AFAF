# Forum Web Application - AFAF

This is a forum web application built with React.js for the frontend and Firebase for authentication and database management. The application allows users to register, login, create threads, comment on threads, and interact with other users' threads.

## Features

- **User Authentication**: Users can register, login, and logout securely using Firebase authentication.
- **Thread Management**: Users can create new threads, edit their own threads, and delete their own threads. Threads can be of different types such as text posts, images, or URLs.
- **Comments**: Users can comment on threads and engage in discussions.
- **User Profiles**: Each user has a profile page where they can view their own information and activity, as well as other users' profiles.
- **Thread Sorting**: Threads can be sorted by newest, most commented, and most liked.
- **Admin Panel**: Admin users have access to an admin panel where they can perform administrative tasks such as user management.

## Installation

1. Clone the repository:

```js
git clone <repository-url>
```


2. Navigate into the project directory:

```js
cd afaf
```

3. Install dependencies:

```js
npm install
```


4. Create a Firebase project and set up authentication and Firestore database.
5. Copy the Firebase configuration and paste it in `src/config/firebase-config.js`.
6. Start the development server:

```js
npm run dev
```

7. Open your browser and navigate to `http://localhost:5173/` to view the application.

## Scheme (structure) of the documents in the database
```json
{
  topics: {
    -Nr8FYCMmSu3IlBT1iGL: {
      author: "username",
      content: "Content Content Content Content Content",
      createdOn: 1708478575395,
      dislikedBy: {
        username: true
      },
      likedBy: {
        username: true
      },
      title: "Title Title Title Title Title Title",
      type: "post",
      url: "",
      uuid: "6f58176d-ac27-46da-b726-43f938b96666"
    }
  },
  users: {
    username: {
      avatar: "https://firebasestorage.googleapis.com/v0/b/afaf-backup.appspot.com/o/images%2Fusername%2Favatar%2Fanakin-skywalker-artisan-edition_star-wars_square.jpg0a8b681c-3e8c-4313-bff4-e909d3c0f96e?alt=media&token=5f2c6c30-d1c9-44dc-bd99-f36924ce018c",
      bio: "Bio",
      blocked: false,
      createdOn: 1708478395457,
      createdTopics: {
        -Nr8FYCMmSu3IlBT1iGL: {
          -Nr8FYCP4UN4TeZsOEkt: "-Nr8FYCMmSu3IlBT1iGL"
        },
        -Nr7nNGxRR7xUX0ppURd: {
          -Nr7nNGzOSEZ_DjGUetg: "-Nr7nNGxRR7xUX0ppURd"
        }
      },
      dislikedTopics: {
        -Nr7v6ovfiwcwVtFeoNA: true
      },
      email: "email@email.com",
      handle: "username",
      likedTopics: {
        -Nr8FYCMmSu3IlBT1iGL: true
      },
      name: "Full name",
      role: "user",
      uid: "99PHWzY0IcfnftWvWaDb5lBtDhJ3"
    }
  }
}
```

## Usage

- Register or login to access the forum.
- Create new threads or participate in existing ones by commenting.
- Explore different threads sorted by newest, most commented, or most liked.
- View user profiles and engage with other users' threads.
- Admin users can access the admin panel to perform administrative tasks.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Contributors
- [Ivelin Nenov](https://github.com/nenov7)
- [Georgi Popov](https://github.com/idealpopoff)
- [Gabriela Evtimova](https://github.com/GabrielaEvtimova)

