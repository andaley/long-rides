# Long Rides

A simple app for tracking some of my longer bike rides. Built with React, TypeScript, Vite, React-Leaflet and the Strava API.


https://longrides.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/5deb5411-0b03-41ff-af09-d8a9437ef039/deploy-status)](https://app.netlify.com/sites/longrides/deploys)

## Quick commands
Start the app:
`npm run dev`

Run linting:
`npm run lint`

Seed Strava data:
I've seeded the app with some initial Strava data stored as JSON, however you can reseed it yourself using the `seed-strava-data` script. Before running the script you will need to set up a [Strava application](https://developers.strava.com/docs/getting-started/#account), get `client id` and `client secret`, and set up an `.env` file like so:

```bash
VITE_STRAVA_CLIENT_ID=[YOUR_CLIENT_ID]
VITE_STRAVA_CLIENT_SECRET=[YOUR_CLIENT_SECRET]
VITE_STRAVA_REDIRECT_URI=http://localhost:5173
```

After creating that file, go back to your terminal and run: 
```bash
$ node ./src/scripts/seed-strava-data.js
```
Upon first run the script will prompt you to open a url to authenticate the application with Strava. Open that url, click 'authorize' and copy the value of the `code` param in the url. Paste that code back in your terminal and the script should continue on to fetch your strava cycling activities. When that fetch has succeedd the script will create a new file at `src/components/consts/strava-rides.json`. 

## TODO
This app is mostly an excuse to familiarize myself with Vite, React-Leaflet, and the Strava API, so it's not meant to be full-featured. However, some tasks I'd like to add:
- [ ] highlight ride card when hovering a route on the map
- [ ] show more details on click
- [ ] add tests