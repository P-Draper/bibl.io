<p align="center">
    <a href=""><img src="https://img.shields.io/pypi/l/ansicolortags.svg" /></a>
    <a href=""><img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" /></a>
    <a href=""><img src="https://badgen.net/github/commits/P-Draper/bibl.io" /></a>
    <br>
    <a href=""><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
    <a href="https://docs.python.org/3/index.html"><img src="https://img.shields.io/badge/python-%2320232a?style=for-the-badge&logo=python&logoColor=ffdd54" /></a>
    <a href=""><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /></a>
    <br>
    <a href=""><img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" /></a>
    <a href=""><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /></a>
    <a href=""><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" /></a>
</p>

<h1 align="center"><b>bibl.io</b></h1>
<h4 align="center">A full-stack web app that serves as a language learning tool to turn any YouTube video into a learning resource. </h4>

<p align="center">
    <img src="./projectbanner.png" alt="Project Banner" width=60% height=60%/>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Technical Requirements](#technical-requirements)
- [Project Structure](#project-structure)
- [Key Functionalities](#key-functionalities)
- [Project Features](#project-features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

bibl.io is a language learning tool that provides users a way to turn any YouTube video into a learning resource. By simply inserting a YouTube url the user receives an mp3 ready for playback as well as a transcription and translation to study from. bibl.io harnesses the power of the OpenAI Whisper API to provide powerful language tools.

## Technical Requirements

To run bibl.io locally, you need the following:

- Python 3.7 or later

## Project Directory Hierarchy

Upon successful setup (see **Getting Started**), you should see the following project directory hierarchy.

```
bibl.io/
├── flask/
│ └── app.py
│ └── mongo.py
│ └── converter.py
│ └── transcription.py
│ └── translation.py
├── lingo/
│ └── src/
│ │   └── components/
│ │   │   └── ContainerHead.jsx
│ │   │   └── Footer.jsx
│ │   │   └── Header.jsx
│ │   │   └── LanguageDropdown.jsx
│ │   │   └── MyWords.jsx
│ │   │   └── Player.jsx
│ │   │   └── SignIn.jsx
│ │   │   └── SignOut.jsx
│ │   │   └── Transcription.jsx
│ │   │   └── Translation.jsx
│ │   │   └── WordContainer.css
│ │   └── screens/
│ │       └── LandingPage/
│ │           └── LandingPage.js
│ │       └── LoginScreen/
│ │           └── LoginScreen.css
│ │           └── LoginScreen.js
│ │       └── RegisterScreen/
│ │           └── RegisterScreen.css
│ │           └── RegisterScreen.js
│ └── App.css
│ └── App.js
│ └── Index.css
│ └── Index.js
├── server/
│ └── controllers/
│ │   └── userControllers.js
│ └── middlewares/
│ │   └── errorMiddleware.js
│ └── models/
│ │   └── Audio.js
│ │   └── Transcription.js
│ │   └── Translation.js
│ │   └── Url.js
│ │   └── User.js
│ │   └── Wordlist.js
│ └── routes/
│ │   └── userRoutes.js
│ └── utils/
│ │   └── generateToken.js
│ └── index.js
└── README.md
```
- `flask/`: Directory containing backend logic and python files that are sent directly to OpenAI Whisper API.
- `lingo/`: Directory containing the frontend React logic which communicates with the React `server/`.
- `server/`: Directory containing the backend React logic which communicates to MongoDB as well as the frontend. 
- `README.md`: Project documentation providing an overview, setup instructions, and other details.

<p align="center">
    <img src="./dataflow.png" alt="Project Banner" width=60% height=60%/>
</p>
