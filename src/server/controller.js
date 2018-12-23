// @flow
import axios from 'axios';
import multiparty from 'multiparty';
import FormData from 'form-data';
import fs from 'fs';

import redisClient from '../shared/config-redis';
import { remoteRestURL, remoteRestURLBase, remoteAuthUrl } from '../shared/routes';
import UsersOnline from './socket';
import { STATIC_PATH } from '../shared/config';

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

export const responseCountEndpoint = (res: any) => {
  // Fetch the integer value of key "response"
  redisClient.get('response', (err, responseData) => {
    if (!err) {
      res.json({ count: responseData });
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
    timeout: 3000,
    headers: { authorization },
  })
);


export const APIResourceCreateEndpoint = (
  request: {
    model: Object,
    modelName: string,
    service: string,
    authorization: string,
  }, res: any,
) => {
  const params = {};
  params[request.modelName] = request.model;
  const authenticatedRequest = requestInstance(request.authorization);

  authenticatedRequest.post(
    request.service,
    params,
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

export const APIResourceEditEndpoint = (
  request: {
    model: Object,
    modelName: string,
    service: string,
    authorization: string,
  }, res: any,
) => {
  const params = {};
  params[request.modelName] = request.model;
  const authenticatedRequest = requestInstance(request.authorization);

  authenticatedRequest.put(
    `${request.service}/${request.model.id}`,
    params,
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

export const APIResourceDeleteEndpoint = (
  request: {
    modelId: string,
    service: string,
    authorization: string,
  }, res: any,
) => {
  const authenticatedRequest = requestInstance(request.authorization);
  authenticatedRequest.delete(`${request.service}/${request.modelId}`)
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
  authenticatedRequest.get(request.service)
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
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};

export const MarkReadMessageEndpoint = (
  request: {
    messageId: string,
    authorization: string,
    service: string,
  }, res: any,
) => {
  const authenticatedRequest = requestInstance(request.authorization);
  const service = request.service || 'inbox';
  authenticatedRequest.put(
    `${service}/${request.messageId}`,
    {
      message: {
        is_read: true,
      },
    },
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

export const activateRequestEndpoint = (
  request: {
    requestId: string,
    authorization: string,
  }, res: any,
) => {
  const authenticatedRequest = requestInstance(request.authorization);

  authenticatedRequest.get(
    `activate/${request.requestId}`,
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

export const fetchUsersOnlineEndpoint = () => ({
  usersOnline: UsersOnline.users,
});


export const accountCreateEndpoint = (
  request: any,
  res: any,
) => {
  const { authorization } = request.headers;

  if (Object.keys(request.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log(request.files);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const picFile = request.files.pic;
  const picFileName = request.files.pic.name;
  const path = `${__dirname}/../../tmp`;

  // Use the mv() method to place the file somewhere on your server
  picFile.mv(`${path}/${picFileName}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    // res.json({
    //   file: `${path}/${picFileName}`,
    // });

    const outForm = new FormData({ authorization });

    // outForm.append('account[pic]', part, {
    //   filename: part.filename,
    //   contentType: part.headers['content-type'],
    // });


    outForm.append('account[first_name]', 'test');
    outForm.append('account[last_name]', 'test');

    outForm.append(
      'account[pic]',
      fs.createReadStream(`${path}/${picFileName}`,
        {
          encoding: 'base64',
          filename: picFileName,
          contentType: 'text/plain',
        }),
      {
        filename: picFileName,
      },
    );

    outForm.submit({
      host: 'peaceful-river-58348.herokuapp.com',
      path: '/account',
      method: 'put',
      headers: Object.assign(
        outForm.getHeaders(),
        { authorization },
      ),
    }, (result) => {
      console.log(result);
    });


    // {
    //   host: 'example.com',
    //     path: '/surelynot.php',
    //   headers: {'x-test-header': 'test-header-value'}

    console.log(outForm.getHeaders());

    //   axios.create({
    //     baseURL: remoteAuthUrl(),
    //     timeout: 3000,
    //     headers: Object.assign(
    //       // outForm.getHeaders(),
    //       { authorization },
    //       // { 'Content-type': 'multipart/form-data' },
    //       { 'Content-type': 'multipart/form-data' },
    //     ),
    //   }).post('account', outForm )
    //     .then((response) => {
    //     console.log(response);
    //       const { status, data } = response;
    //       res.status(status).send(data);
    //     })
    //     .catch((error) => {
    //       console.log('boo');
    //       const { status, data } = error.response;
    //       console.log(data)
    //       res.status(status).send(data.errors);
    //     });
    // });


    // const inForm = new multiparty.Form();

  // inForm.on('part', (part) => {
  //   console.log('hello');
  //   const outForm = new FormData();
  //
  //   console.log(part.name);
  //   console.log(part.filename);
  //   console.log(part.headers['content-type']);
  //
  //   if (part.filename) {
  //     outForm.append('pic', part, {
  //       filename: part.filename,
  //       contentType: part.headers['content-type'],
  //     });
  //
  //
  //     const url = remoteAuthUrl();
  //
  //     axios({
  //       method: 'post',
  //       url: `${url}account`,
  //       data: outForm,
  //       config: {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           authorization,
  //         },
  //       },
  //     })
  //       .then((response) => {
  //         const { status, data } = response;
  //         res.status(status).send(data);
  //       })
  //       .catch((error) => {
  //         console.log('boo');
  //         const { status, data } = error.response;
  //         res.status(status).send(data.errors);
  //       });
  //   }
  // });
  // inForm.on('error', (error) => {
  //   console.log(error);
  // });
  //
  // inForm.parse(request);
  });
};

export const accountEditEndpoint = (
  request: {
    model: Object,
    authorization: string,
  }, res: any,
) => {
  const authenticatedRequest = axios.create({
    baseURL: remoteAuthUrl(),
    timeout: 3000,
    headers: {
      authorization: request.authorization,
      'Content-Type': 'multipart/form-data',
    },
  });

  authenticatedRequest.put(
    'account',
    request.model,
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

export const accountFetchEndpoint = (
  request: {
    authorization: string,
  }, res: any,
) => {
  const authenticatedRequest = axios.create({
    baseURL: remoteAuthUrl(),
    timeout: 3000,
    headers: { authorization: request.authorization },
  });
  authenticatedRequest.get('account')
    .then((response) => {
      const { status, data } = response;
      res.status(status).send(data);
    })
    .catch((error) => {
      const { status, data } = error.response;
      res.status(status).send(data.errors);
    });
};
