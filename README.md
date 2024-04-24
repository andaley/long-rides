# Long Rides

A simple app for tracking some of my longer, built with React, TypeScript, Vite, and the Strava API.

## Quick commands
Start the app:
`npm run dev`

Run linting:
`npm run lint`

Seed Strava data:
**Note:** before running this script you will need to set up a [Strava application](https://developers.strava.com/docs/getting-started/#account) and get a `client id` and `client secret`. Store these as environment variables before running this script. 
```
$ cd /long-rides/
$ node ./src/scripts/seed-strava-data.js
```

## TODO
- [ ] add styles
- [ ] highlight route on map on ride hover 
- [ ] recenter map and show more details on click
- [ ] add tests