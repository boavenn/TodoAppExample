# todo-app-example
Sample application using Spring Boot, React and Redux to showcase how everything can be used in a single app

## Overview
The title says it all.\
Just a simple todo app, nothing extraordinary.\
Probably too simple to even use Redux in the first place.\
The whole purpose of it is to just showcase how you can make these 3 technologies work together nicely in a single project.\
And that's the first reason why I didn't spend much time on styling the frontend (second being I'm just bad at it :no_mouth:).

![screenshot_1](https://github.com/boavenn/TodoAppExample/blob/master/github/Screenshot_1.png)

## Building
I sincerely doubt that anyone would want to clone and build this project, but just in case:
* **Classic way**\
Simply run `mvnw package`, wait for it to download all needed stuff and build the project and then run `.jar`
file located in `target/` directory.
* **Docker way**\
I'm using Spring Boot 2.3.x where it got that nice feature where
you can simply run `mvnw spring-boot:build-image` and image is automagically created and ready to use.
But note that it may take some time when ran for the first time as it have to download some other images first.

## Tech stack
* [Spring Boot](https://spring.io/)
* [React](https://en.reactjs.org/)
* [Redux](https://redux.js.org/)
  * [Redux Toolkit](https://redux-toolkit.js.org/)
