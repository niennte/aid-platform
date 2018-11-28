// @flow
import axios from 'axios';
import redisClient from '../shared/config-redis';
import { remoteRestURL, remoteRestURLBase } from '../shared/routes';

// make business logic and database calls
// passed back results to the routing module to init server-side Redux store

export const homePage = () => null;

export const chatPage = () => ({});

export const loginEndpoint = (user: {
  email: String,
  password: String,
}, res: any) => {
  axios.post(
    remoteRestURL('auth', 'login'),
    user,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => {
      const { authorization } = response.headers;
      const { username, email, id } = response.data;
      const login = {
        userName: username,
        userId: id,
        email,
        loggedIn: true,
        authorization,
      };
      res.json({ login });
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data);
    });
};

export const passwordRequestEndpoint = (user: {
  email: String
}, res: any) => {
  axios.post(
    remoteRestURL('auth', 'password'),
    { user },
  )
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const passwordResetEndpoint = (user: {
  password: String,
  password_confirmation: String,
  reset_password_token: String,
}, res: any) => {
  axios.put(
    remoteRestURL('auth', 'password'),
    { user },
  )
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const createUserEndpoint = (user: {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
}, res: any) => {
  axios.post(
    remoteRestURL('auth', 'signup'),
    { user },
  )
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const requestsEndpoint = (center: Object, radius: number, res: any) => {
  redisClient.georadius('requests:locations', center.lng, center.lat, radius, 'm', 'withcoord', (err, locations) => {
    if (!err) {
      res.json({
        lastQuery: { center, radius },
        locations,
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

export const requestDataEndpoint = (requestId: string, res: any) => {
  redisClient.hgetall(`requests:data:request:${requestId}`, (err, requestData) => {
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

export const requestActiveCountEndpoint = (res: any) => {
  // ZCARD - fetch count of requests:locations
  redisClient.zcard('requests:locations', (err, requestData) => {
    if (!err) {
      res.json({ count: requestData });
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

export const requestFulfilledCountEndpoint = (res: any) => {
  // Fetch the integer value of key "fulfilled"
  redisClient.get('fulfilled', (err, requestData) => {
    if (!err) {
      res.json({ count: requestData });
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};

export const memberCountEndpoint = (res: any) => {
  // Fetch the integer value of key "fulfilled"
  redisClient.get('members', (err, requestData) => {
    if (!err) {
      res.json({ count: requestData });
    } else {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
};


// REST
const requestInstance = authorization => (
  axios.create({
    baseURL: remoteRestURLBase(),
    timeout: 1000,
    headers: { authorization },
  })
);


export const sendMessageEndpoint = (
  request: {
    message: Object,
    authorization: string,
  }, res: any,
) => {
  const authenticatedRequest = axios.create({
    baseURL: remoteRestURLBase(),
    timeout: 1000,
    headers: { authorization: request.authorization },
  });

  authenticatedRequest.post(
    'inbox',
    { message: request.message },
  )
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const FetchInboxEndpoint = (
  request: {
    authorization: string,
    service: string,
  }, res: any,
) => {
  const authenticatedRequest = requestInstance(request.authorization);
  const service = request.service || 'inbox';
  authenticatedRequest.get(service)
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const FetchInboxMessageEndpoint = (
  request: {
    messageId: string,
    authorization: string,
    service: string,
  }, res: any,
) => {
  const authenticatedRequest = requestInstance(request.authorization);
  const service = request.service || 'inbox';
  authenticatedRequest.get(`${service}/${request.messageId}`)
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const DeleteMessageEndpoint = (
  request: {
    messageId: string,
    authorization: string,
    service: string,
  }, res: any,
) => {
  const authenticatedRequest = requestInstance(request.authorization);
  const service = request.service || 'inbox';
  authenticatedRequest.delete(`${service}/${request.messageId}`)
    .then((response) => {
      console.log(response);
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      console.log(error);
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};
