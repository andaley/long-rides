# Long Rides

A simple app for tracking some of my longer bike rides. Built with React, TypeScript, Vite, React-Leaflet and the Strava API.

## Quick commands
Start the app:
`npm run dev`

Run linting:
`npm run lint`

Seed Strava data:
I've seeded the app with some initial Strava data stored as JSON, however you can reseed it yourself using the `seed-strava-data` script. Before running the script you will need to set up a [Strava application](https://developers.strava.com/docs/getting-started/#account) and get a `client id` and `client secret`. Store these as environment variables and then run: 
```
$ cd /long-rides/
$ node ./src/scripts/seed-strava-data.js
```
The script will create a new file at `src/components/consts/strava.json`. 

## TODO
This app is mostly an excuse to familiarize myself with Vite, React-Leaflet, and the Strava API, so it's not meant to be full-featured. However, some tasks I'd like to add:
- [ ] highlight route on map on ride hover 
- [ ] style ride details
- [ ] show more details on click
- [ ] add tests