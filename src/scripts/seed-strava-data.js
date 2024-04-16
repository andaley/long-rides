import axios from "axios";
import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();

// Fetch cycling activities from Strava API, then store them statically in the app in components/consts/consts.ts
const authenticateWithStrava = async (accessToken) => {
  const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_CLIENT_SECRET } = process.env;

  console.log("Getting access token...");
  const response = await axios.post("https://www.strava.com/oauth/token", {
    client_id: VITE_STRAVA_CLIENT_ID,
    client_secret: VITE_STRAVA_CLIENT_SECRET,
    code: accessToken,
    grant_type: "authorization_code",
  });
  if (response.status !== 200) {
    console.error("response status: ");
    throw new Error("Failed to authenticate with Strava");
  }
  return response.data;
};

const reauthorizeStrava = async () => {
  const {
    VITE_STRAVA_CLIENT_ID,
    VITE_STRAVA_CLIENT_SECRET,
    VITE_STRAVA_REFRESH_TOKEN,
  } = process.env;

  console.log("Refreshing access token...");
  const response = await axios.post("https://www.strava.com/oauth/token", {
    client_id: VITE_STRAVA_CLIENT_ID,
    client_secret: VITE_STRAVA_CLIENT_SECRET,
    refresh_token: VITE_STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  if (response.status !== 200) {
    console.error("response status: ", response.status);
    throw new Error("Failed to reauthenticate with Strava");
  }
  return response.data;
};

const fetchCyclingActivities = async (accessToken) => {
  let activities = [];
  let page = 1;
  const pageLimit = 1;
  const perPage = 100;

  while (page <= pageLimit) {
    // avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(
      `Fetching page ${page} of last ${
        pageLimit * perPage
      } cycling activities...`
    );
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch cycling activities; status code: ${response.status}`
      );
    }
    const data = await response.data;
    if (data.length === 0) {
      break;
    }
    activities = activities.concat(data);
    page++;
  }

  const longRides = activities.filter(
    (activity) =>
      activity.type === "Ride" && metersToMiles(activity.distance) > 30
  );

  console.log(
    `Success! Fetched ${longRides.length} cycling activities over 30 miles in length`
  );

  return longRides.map((activity) => ({
    title: activity.name,
    duration: activity.moving_time,
    miles: metersToMiles(activity.distance),
    elevation: activity.total_elevation_gain,
    date: activity.start_date_local,
    map: polyline.decode(activity.map.summary_polyline),
  }));
};

const metersToMiles = (meters) => {
  return Math.round(meters * 0.000621371 * 100) / 100;
};

const seedStravaData = async () => {
  const {
    VITE_STRAVA_CLIENT_ID,
    VITE_STRAVA_REDIRECT_URI,
    VITE_STRAVA_REFRESH_TOKEN,
  } = process.env;
  let authCode = process.env.STRAVA_CODE;

  if (!authCode) {
    const oAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${VITE_STRAVA_CLIENT_ID}&redirect_uri=${VITE_STRAVA_REDIRECT_URI}&response_type=code&approval_prompt=force&scope=activity:read_all`;

    console.log("Please visit this URL to authorize with Strava: ", oAuthUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter auth code from Strava: ", async (code) => {
      // append code to end of .env file
      fs.appendFileSync("./.env", `\nSTRAVA_CODE=${code}\n`);
      rl.close();
    });
  }

  console.log("Authorizing with Strava...");
  // if refresh token exists, use it to re-authenticate
  let accessToken;
  if (VITE_STRAVA_REFRESH_TOKEN) {
    const res = await reauthorizeStrava();
    accessToken = res.access_token;
  } else {
    const res = await authenticateWithStrava(process.env.STRAVA_CODE);
    accessToken = res.access_token;
  }

  console.log("Fetching cycling activities...");
  const activities = await fetchCyclingActivities(accessToken);
  fs.writeFileSync(
    "./src/components/consts/strava-22.json",
    JSON.stringify(activities, null, 2)
  );
};

seedStravaData();
