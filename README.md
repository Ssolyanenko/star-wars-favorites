This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
# made by Serhii Solianenko

# Star Wars Favorites Mobile Application

# Getting Started
>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
```
Task:
Implement the mobile application based on React Native Init/CLI (not Expo) for iOS & Android platforms that gives the ability to indicate the total amount of male/female/other favourite characters across the Star Wars Universe. 
Statements:
Make an API Request to get the information from the server.
Display the list of retrieved elements.
By clicking on any element of this list - extra information should be displayed on the dedicated screen.
By clicking on the “Add to favourites” link/icon against any character - recalculate the total votes and indicate the selected element as the liked one. 
Display total amounts of male/female/other characters based on the user's selection.
The “Reset” button should flush all previously added to the favourites list personages and make all total values equal to zero.
API:
 https://swapi.dev/

Reference:
https://sw-app-gilt.vercel.app/ 
Requirements:
We need the main screen with a scrollable and paginated list of elements that navigate the user to another screen with additional information about the selected entity.
The application should allow users to add list elements to favourites and calculate totals based on male/female/etc. gender.
The “Reset” button should flush all the statistics to the initial state.
It’s possible to use any state management approach.
It’s allowed to use any UI library/framework to style the application.
It’s recommended to follow the referenced stylings or it’d be a plus to customize it due to your preferences and/or best UX/UI practices.
The codebase of this application should be uploaded to GitHub public repository with relevant README information.


We will assess the next parts:
workability: how your application works;
projects structure: how you structure your files;
code quality: how you write clean, readable code (feel free to install and use ESLint and Prettier);
knowledge React, React Native and their ecosystem: how you compose and use libraries together;

```

