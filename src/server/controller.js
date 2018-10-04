// @flow
import redisClient from '../shared/config-redis';

// make business logic and database calls
// passed back results to the routing module to init server-side Redux store

export const homePage = () => null;

export const chatPage = () => ({});

export const loginEndpoint = (userName: string) => ({
  login: {
    userName,
    loggedIn: true,
  },
});

export const requestsEndpoint = (center: Object, radius: number, res: any) => {
  redisClient.georadius('requests:locations', center.lng, center.lat, radius, 'm', 'withcoord', (err, locations) => {
    if (!err) {
      res.json(locations);
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

export const requestDataEndpoint = (requestId: string, res: any) => {
  redisClient.hgetall(`requests:data:${requestId}`, (err, requestData) => {
    if (!err) {
      res.json(requestData);
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

export const requestDistanceEndpoint = (
  location1: { lat: number, lng: number },
  location2: { lat: number, lng: number },
  res: any,
) => {
  redisClient.geodist('requests:locations', location1.lng, location1.lat, location2.lng, location2.lat, 'm', (err, requestData) => {
    if (!err) {
      res.json(requestData);
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};
