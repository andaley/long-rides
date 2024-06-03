// Fetch cycling activities from Strava API, then store them statically in the app in components/cosnts/consts.ts
export const authenticateWithStrava = () => {
  const { VITE_STRAVA_CLIENT_ID, VITE_STRAVA_REDIRECT_URI } = import.meta.env;
  const oAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${VITE_STRAVA_CLIENT_ID}&redirect_uri=${VITE_STRAVA_REDIRECT_URI}&response_type=code&approval_prompt=auto&scope=activity:read_all`;

  window.location.href = oAuthUrl;
};

const reauthorizeWithStrava = async () => {
  const {
    VITE_STRAVA_CLIENT_ID,
    VITE_STRAVA_CLIENT_SECRET,
    VITE_STRAVA_REFRESH_TOKEN,
  } = import.meta.env;

  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: VITE_STRAVA_CLIENT_ID,
      client_secret: VITE_STRAVA_CLIENT_SECRET,
      refresh_token: VITE_STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to authenticate with Strava");
  }
  return await response.json();
};

const fetchCyclingActivities = async (accessToken: string) => {
  let activities = [];
  let page = 1;
  let perPage = 100;

  while (page < 3) {
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cycling activities");
    }
    const data = await response.json();
    if (data.length === 0) {
      break;
    }
    activities = activities.concat(data);
    page++;
  }

  const foo = activities.filter(
    (activity) =>
      activity.type === "Ride" && metersToMiles(activity.distance) > 35
  );

  return foo.map((activity) => ({
    id: activity.id,
    title: activity.name,
    duration: activity.moving_time,
    miles: metersToMiles(activity.distance),
    elevation: activity.total_elevation_gain,
    date: activity.start_date_local,
  }));
};

const metersToMiles = (meters: number) =>
  Math.round(meters * 0.000621371 * 100) / 100;

export const getCyclingActivities = async () => {
  const data = await reauthorizeWithStrava();

  return fetchCyclingActivities(data.access_token);
};
