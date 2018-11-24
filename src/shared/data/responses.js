export const response = {
  id: 19,
  message: 'Response from a volunteer',
  status: 'delivered',
  posted: '2018-10-30T19:26:45.316Z',
  postedBy: {
    id: 4,
    userName: 'arcenciel',
  },
  request: {
    id: 14,
    userId: 4,
    name: '14:one_time_task',
    title: 'geo push on prod',
    description: 'testing request geo push on prod',
    address: 'Islington Junior Middle School, 44, Cordova Avenue, Islington Village, Etobicoke, Toronto, Ontario, M9A 2H5, Canada',
    zip: 'M9A 2H5',
    location: {
      lat: 43.64690595,
      lng: -79.5283727437516,
    },
    created: '2018-10-29T22:04:00.648Z',
    updated: '2018-10-30T19:27:47.507Z',
    type: 'one_time_task',
    status: 'closed',
  },
  fulfillment: {
    id: 9,
    requestId: 14,
    response: 19,
    posted: '2018-10-30T19:35:37.772Z',
    postedBy: 4,
    message: `
    You set your config.active_storage.service to :local in production.
remote:        If you are uploading files to this app, they will not persist after the app
remote:        is restarted, on one-off dynos, or if the app has multiple dynos.
remote:        Heroku applications have an ephemeral file system. To
remote:        persist uploaded files, please use a service such as S3 and update your Rails
remote:        configuration.
    `,
  },
};

export const responseActive = {
  id: 19,
  message: 'Response from a volunteer',
  posted: '2018-10-30T19:26:45.316Z',
  postedBy: {
    id: 4,
    userName: 'arcenciel',
  },
  request: {
    id: 14,
    userId: 4,
    name: '14:one_time_task',
    title: 'geo push on prod',
    description: 'testing request geo push on prod',
    address: 'Islington Junior Middle School, 44, Cordova Avenue, Islington Village, Etobicoke, Toronto, Ontario, M9A 2H5, Canada',
    zip: 'M9A 2H5',
    location: {
      lat: 43.64690595,
      lng: -79.5283727437516,
    },
    created: '2018-10-29T22:04:00.648Z',
    updated: '2018-10-30T19:27:47.507Z',
    type: 'one_time_task',
    status: 'active',
  },
  fulfillment: null,
};

export const responsePending = {
  id: 19,
  message: 'Response from a volunteer',
  posted: '2018-10-30T19:26:45.316Z',
  postedBy: {
    id: 4,
    userName: 'arcenciel',
  },
  request: {
    id: 14,
    userId: 4,
    name: '14:one_time_task',
    title: 'geo push on prod',
    description: 'testing request geo push on prod',
    address: 'Islington Junior Middle School, 44, Cordova Avenue, Islington Village, Etobicoke, Toronto, Ontario, M9A 2H5, Canada',
    zip: 'M9A 2H5',
    location: {
      lat: 43.64690595,
      lng: -79.5283727437516,
    },
    created: '2018-10-29T22:04:00.648Z',
    updated: '2018-10-30T19:27:47.507Z',
    type: 'one_time_task',
    status: 'pending',
  },
  fulfillment: null,
};


export const responses = [
  {
    id: 19,
    user_id: 4,
    request: {
      id: 14,
      userId: 4,
      title: 'geo push on prod',
      description: 'testing request geo push on prod',
      address: 'Islington Junior Middle School, 44, Cordova Avenue, Islington Village, Etobicoke, Toronto, Ontario, M9A 2H5, Canada',
      posted: '2018-10-29T22:04:00.648Z',
      type: 'one_time_task',
      status: 'closed',
    },
    posted: '2018-10-30T19:26:45.316Z',
    message: 'Response from a volunteer',
    status: 'delivered',
    fulfillment: {
      id: 9,
      requestId: 14,
      response: 19,
      postedBy: 4,
      message: 'thanks',
    },
  },
  {
    id: 18,
    user_id: 4,
    request: {
      id: 2,
      userId: 3,
      title: 'some2',
      description: 'some description2',
      address: '890, Jane Street, Lambton, York, Toronto, Ontario, M6N, Canada',
      posted: '2018-10-21T16:48:19.559Z',
      type: 'material_need',
      status: 'active',
    },
    posted: '2018-10-30T16:13:19.681Z',
    message: 'Response from a volunteer',
    status: 'posted',
    fulfillment: null,
  },
  {
    id: 17,
    user_id: 4,
    request: {
      id: 1,
      userId: 1,
      title: 'some',
      description: 'some description',
      address: '24, Mabelle Avenue, Islington Village, Etobicoke, Toronto, Ontario, M9A 4X7, Canada',
      posted: '2018-10-21T16:47:33.926Z',
      type: 'one_time_task',
      status: 'closed',
    },
    posted: '2018-10-29T01:53:36.914Z',
    message: 'testing redis incrementor - 2',
    status: 'delivered',
    fulfillment: {
      id: 7,
      requestId: 1,
      response: 17,
      postedBy: 4,
      message: 'testing redis incrementor',
    },
  },
  {
    id: 5,
    user_id: 4,
    request: {
      id: 1,
      userId: 1,
      title: 'some',
      description: 'some description',
      address: '24, Mabelle Avenue, Islington Village, Etobicoke, Toronto, Ontario, M9A 4X7, Canada',
      posted: '2018-10-21T16:47:33.926Z',
      type: 'one_time_task',
      status: 'active',
    },
    posted: '2018-10-28T16:24:27.643Z',
    message: 'could offer some strategic vision',
    status: 'posted',
    fulfillment: null,
  },
  {
    id: 3,
    user_id: 4,
    request: {
      id: 5,
      userId: 3,
      title: 'a request',
      description: 'Move the wardrobe to 10th floor',
      address: 'Astral, 1, Bloor Street East, St. James Town, Old Toronto, Toronto, Ontario, M4X 1N4, Canada',
      posted: '2018-10-26T19:44:41.343Z',
      type: 'one_time_task',
      status: 'closed',
    },
    posted: '2018-10-26T19:47:08.047Z',
    message: 'could offer guidance',
    status: 'posted',
    fulfillment: {
      id: 1,
      requestId: 5,
      response: 3,
      postedBy: 4,
      message: 'guidance provided',
    },
  },
];
