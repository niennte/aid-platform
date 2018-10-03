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

export const requestsEndpoint = async (center: Object, radius: number, res: any) => {
  redisClient.georadius('geo:locations:requests', center.lng, center.lat, radius, 'm', 'withcoord', (err, locations) => {
    if (!err) {
      res.json(locations);
    } else {
      console.log(err);
    }
  });
};

export const requestDataEndpoint = async (requestId: string, res: any) => {
  redisClient.hgetall(`requests:data:${requestId}`, (err, requestData) => {
    if (!err) {
      res.json(requestData);
    } else {
      console.log(err);
    }
  });
};
