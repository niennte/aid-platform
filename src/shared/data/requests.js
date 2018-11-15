export const requestOwn = {
  id: 5,
  user: {
    userId: 3,
    userName: 'test3',
  },
  name: '5:one_time_task',
  title: 'Wardrobe moving',
  description: 'Need help to move the wardrobe to 10th floor',
  fullAddress: 'Astral, 1, Bloor Street East, St. James Town, Old Toronto, Toronto, Ontario, M4X 1N4, Canada',
  zip: 'M4X 1N4',
  location: {
    lat: 43.6735364,
    lng: -79.3682189,
  },
  created: '2018-10-26T19:44:41.343Z',
  updated: '2018-10-26T19:44:41.343Z',
  type: 'one_time_task',
  status: 'active',
  responses: [
    {
      id: 3,
      request_id: 5,
      user_id: 4,
      message: 'could offer guidance',
      created_at: '2018-10-26T19:47:08.047Z',
      updated_at: '2018-10-26T19:48:03.122Z',
      status: 'delivered',
    },
    {
      id: 5,
      request_id: 5,
      user_id: 6,
      message: 'could provide strategic vision',
      created_at: '2018-10-26T19:47:08.047Z',
      updated_at: '2018-10-26T19:48:03.122Z',
      status: 'posted',
    },
    {
      id: 7,
      request_id: 5,
      user_id: 7,
      message: 'could give good advice',
      created_at: '2018-10-26T19:47:08.047Z',
      updated_at: '2018-10-26T19:48:03.122Z',
      status: 'posted',
    },
  ],
  fulfillment: {
    id: 1,
    response_id: 3,
    user_id: 4,
    message: 'guidance provided',
    created_at: '2018-10-26T19:49:07.678Z',
    updated_at: '2018-10-26T19:49:07.678Z',
    request_id: 5,
  },
  fulfillmentPostedBy: 'volunteer',
};

export const requestOwnActive = {
  id: 5,
  user: {
    userId: 3,
    userName: 'test3',
  },
  name: '5:one_time_task',
  title: 'Wardrobe moving',
  description: 'Need help to move the wardrobe to 10th floor',
  fullAddress: 'Astral, 1, Bloor Street East, St. James Town, Old Toronto, Toronto, Ontario, M4X 1N4, Canada',
  zip: 'M4X 1N4',
  location: {
    lat: 43.6735364,
    lng: -79.3682189,
  },
  created: '2018-10-26T19:44:41.343Z',
  updated: '2018-10-26T19:44:41.343Z',
  type: 'one_time_task',
  status: 'active',
  responses: [],
  fulfillment: {},
  fulfillmentPostedBy: null,
};

export const requestsOwn = [
  {
    id: 5,
    user: {
      userId: 3,
      userName: 'test3',
    },
    name: '5:one_time_task',
    title: 'a request',
    description: 'Move the wardrobe to 10th floor',
    fullAddress: 'Astral, 1, Bloor Street East, St. James Town, Old Toronto, Toronto, Ontario, M4X 1N4, Canada',
    zip: 'M4X 1N4',
    location: {
      lat: 43.6735364,
      lng: -79.3682189,
    },
    created: '2018-10-26T19:44:41.343Z',
    updated: '2018-10-26T19:44:41.343Z',
    type: 'one_time_task',
    status: 'closed',
    numResponses: 1,
    isFulfilled: true,
  },
  {
    id: 2,
    user: {
      userId: 3,
      userName: 'test3',
    },
    name: '2:material_need',
    title: 'some2',
    description: 'some description2',
    fullAddress: '890, Jane Street, Lambton, York, Toronto, Ontario, M6N, Canada',
    zip: 'M6N',
    location: {
      lat: 43.6770698,
      lng: -79.4962596,
    },
    created: '2018-10-21T16:48:19.559Z',
    updated: '2018-10-21T16:48:19.559Z',
    type: 'material_need',
    status: 'active',
    numResponses: 1,
    isFulfilled: false,
  },
];
