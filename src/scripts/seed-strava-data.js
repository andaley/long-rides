import axios from "axios";
import fs from "fs";
import readline from "readline";
import polyline from "@mapbox/polyline";
import dotenv from "dotenv";
dotenv.config();

// Fetch cycling activities from Strava API, then store them statically in the app in components/consts/strava-rides.json

const authenticateWithStrava = async (accessToken) => {
  const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_CLIENT_SECRET } = process.env;

  console.log("Getting access token...");
  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: VITE_STRAVA_CLIENT_ID,
      client_secret: VITE_STRAVA_CLIENT_SECRET,
      code: accessToken,
      grant_type: "authorization_code",
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to authenticate with Strava: ",
      error.response?.data || error.message
    );
    process.exit(1);
  }
};

const fetchCyclingActivities = async (accessToken) => {
  let activities = [];
  let page = 1;
  const pageLimit = 50;
  const perPage = 100;

  while (page <= pageLimit) {
    // avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(
      `Fetching page ${page} of last ${
        pageLimit * perPage
      } cycling activities...`
    );
    try {
      const response = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const { data } = response;
      if (data.length === 0) {
        break;
      }
      activities = activities.concat(data);
      page++;
    } catch (error) {
      throw new Error(
        `Failed to fetch cycling activities: ${
          error.response ? error.response.status : error.message
        }`
      );
    }
  }

  const longRides = activities.filter(
    (activity) =>
      activity.type === "Ride" && metersToMiles(activity.distance) > 30
  );

  console.log(
    `Success! Fetched ${longRides.length} cycling activities over 30 miles in length`
  );

  return longRides.map((activity) => ({
    id: activity.id,
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

const getAuthCode = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter auth code from Strava: ", async (code) => {
      rl.close();
      resolve(code);
    });
  });
};

(async () => {
  const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_REDIRECT_URI } = process.env;
  let authCode = process.env.VITE_STRAVA_CODE;

  if (!authCode) {
    const oAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${VITE_STRAVA_CLIENT_ID}&redirect_uri=${VITE_STRAVA_REDIRECT_URI}&response_type=code&approval_prompt=force&scope=activity:read_all`;

    console.log("No Strava authorization code found.");
    console.log("Please visit this URL to authorize with Strava:");
    console.log(oAuthUrl);

    authCode = await getAuthCode();
    // append code to end of .env file
    fs.appendFileSync("./.env", `\nVITE_STRAVA_CODE=${authCode}\n`);
  }

  console.log("Authorizing with Strava...");
  const res = await authenticateWithStrava(authCode);
  const accessToken = res.access_token;

  console.log("Fetching cycling activities...");
  const activities = await fetchCyclingActivities(accessToken);
  fs.writeFileSync(
    "./src/components/consts/strava-rides.json",
    JSON.stringify(activities, null, 2)
  );
})();
