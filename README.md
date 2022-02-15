# Introduction

Wordle clone using 2 APIs for selecting words. Backend hosted on Heroku, client hosted on Github.

## Try the game

Backend hosted on Heroku
Client hosted on Github Pages

To try out go to: https://amir-a-23.github.io/weirdle/

## Run Local

To try this project out yourself fork and clone this repo, then please go to RapidAPI to sign up for the [APIs](https://bit.ly/rapidapi-hub).

Follow the steps in the tutorial [here](https://www.youtube.com/watch?v=mpby4HiElek) on which APIs to use and how to use them.

### `.env`

Now create a `.env` file in the root of your project with the following:

```
API_KEY={your_rapid_api_key}
```

To run this project please type the following commands:

### `npm i`

This will install all the necessary dependencies.

### `npm run dev`

This will start the backend on [http://localhost:8000](http://localhost:8000).

### `copy the path to your index.html file`

Copy the path to this file and paste it in your browser to see the game and play.

### Packages

```json
"dependencies": {
    "axios": "^0.25.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.2",
    "nodemon": "^2.0.15"
  }
```

### Credits

Copyright (c) 2020 Ania Kubow

Credit goes to Ania Kubów for creating the tutorial on making this wordle clone at Code with Ania Kubów on Youtube.
