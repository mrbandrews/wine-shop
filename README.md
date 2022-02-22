# Wine Shop by mrbandrews

This is a learning project.  


## Project history

I created this project with Create React App.  I initially followed a video tutorial for a clothing shop; however, at this point, 100% of the CSS and at least 95% of the Javascript is from scratch.


## Overview 

The site is a simplified version of the Total Wine website.  

The TW website has changed a bit since I began this project.

The site has four pages:
  - homepage:  a grid of large images
  - shopping page: includes a filter sidebar/modal
  - product details page 
  - shopping cart page


## CSS layout 

I used Flexbox, Grid, and media queries for layout.  The shopping page has two breakpoints, resulting in mobile/tablet/desktop views.  The details page has an additional breakpoint at 1024px which merely adjusts the width of the sidebar.   Ordering and display attributes are used to re-position elements. 

I used Flex for the header/main/footer layout, and for the majority of the layout of specific pages. 

I used Grid for the shopping page's product grid, and for parts of the cart page and the homepage. 


## React Hooks

React hooks are utilized to accomplish various tasks: 
 - useState() for the filter, and elsewhere
 - useContext() / useReducer() for the shopping cart
 - useEffect() to load the product on the detail page (necessary because useState is asynchronous)
 

## Filter bar/modal

The filter is a React component that is used by the sidebar and the modal.  It uses useState to keep track of the various options, which are used to render the product grid.  (The filter is also used to render parts of the filter itself: for example, the regions to be displayed depends on the geo-regions).

## Wine data

Currently, the wine data is mocked in JSON on the client side.  

TODO:  deploy a backend that loads the wine data from a database or Excel file. 

## Asynchronous programming

useEffect() is used due to the asynchronous and thus unreliable nature of useState().  

TODO: deploy a backend for the wine data, and access with async/await. 


## Unit Tests

The site uses Jest as its test runner, see here: [https://create-react-app.dev/docs/running-tests] (https://create-react-app.dev/docs/running-tests) 


## Deployment

The site is deployed with CI/CD on Netlify.  

I initially set this up with Github Actions, but moved to Netlify for additional features.


## Workflow

I use the following workflow:
 - open an issue for necesssary work
 - do work on a topic branch
 - push branch to remote and open a pull request with "fixes #X" to close the issue
 - merge into main with a rebase merge
 - merging triggers the Netlify test & build script 
 - delete remote, remote-tracking and local branches


