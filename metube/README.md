# MeTube - A YouTube clone appication using ReactJS, RapidAPI and MUI 5

A Youtube clone application consisting of stunning video sections, custom categories, channel pages, video searching and, most importantly, video player. The video data are mainly fetched from [Rapid API](https://rapidapi.com/hub).  

**Frontend**: ReactJS, React Hooks, MUI 5, RapidAPI

<p align="center">
    <img src = "demo/homepage.png" alt="homepage">
    <br />
    <br />
    <img src = "demo/dark-theme.png" alt="homepage">
</p>

**Note**: You should get RAPID API key here ([Youtube-v31](https://rapidapi.com/ytdlfree/api/youtube-v31)) before start the development locally.

## Project Overview
Images available in `demo` folder

Channel Page | Video Page |
------------ | ---------- |
![Channel Page](demo/channel-page.png) | ![Video page](demo/video-page.png) |

# Features
- [x] Diffrent video categories
- [x] Video searching
- [x] Video player
- [x] Suggested videos for currently playing video
- [x] Channel detail page
- [x] Light/Dark mode
- [x] Mobile responsive
- [ ] Playlist detail page
- [ ] Display video comments
- [ ] Lazy loading

## Quickstart with Docker
```bash
docker build -t metube .
docker run -p 3000:3000 -d metube
```
Or try it online here: [MeTube](https://animated-tanuki-9d8b63.netlify.app/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
