export const messages = [
  {
    id: 9,
    from: {
      userId: 8,
      userName: 'AidPlatform',
    },
    to: {
      userId: 4,
    },
    sent: '2018-11-01T20:44:43.204Z',
    received: '2018-11-01T20:44:43.242Z',
    isRead: false,
    readAt: null,
    subject: 'Request fulfilled!',
  },
  {
    id: 8,
    from: {
      userId: 8,
      userName: 'AidPlatform',
    },
    to: {
      userId: 4,
    },
    sent: '2018-11-01T19:59:42.841Z',
    received: '2018-11-01T19:59:42.867Z',
    isRead: false,
    readAt: null,
    subject: 'New response for your request!',
  },
  {
    id: 7,
    from: {
      userId: 8,
      userName: 'AidPlatform',
    },
    to: {
      userId: 4,
    },
    sent: '2018-10-30T19:35:38.457Z',
    received: '2018-10-30T19:35:38.497Z',
    isRead: false,
    readAt: null,
    subject: 'Request fulfilled!',
  },
  {
    id: 6,
    from: {
      userId: 8,
      userName: 'AidPlatform',
    },
    to: {
      userId: 4,
    },
    sent: '2018-10-30T19:35:38.361Z',
    received: '2018-10-30T19:35:38.397Z',
    isRead: false,
    readAt: null,
    subject: 'Request fulfilled!',
  },
  {
    id: 1,
    from: {
      userId: 1,
      userName: 'user1',
    },
    to: {
      userId: 4,
    },
    sent: '2018-10-23T17:11:41.391Z',
    received: '2018-10-23T18:57:19.206Z',
    isRead: true,
    readAt: '2018-10-23T18:57:42.857Z',
    subject: 'test',
  },
];

export const messageSystem = {
  id: 9,
  to: {
    userId: 4,
    userName: 'arcenciel',
  },
  isRead: false,
  readAt: null,
  received: '2018-11-01T20:44:43.242Z',
  message: {
    id: 15,
    sent: '2018-11-01T20:44:43.204Z',
    from: {
      userId: 8,
      userName: 'AidPlatform',
    },
    subject: 'Request fulfilled!',
    body: "Request '35' has has been fulfilled by response '20'!",
  },
};

export const messageUser = {
  id: 1,
  to: {
    userId: 4,
    userName: 'arcenciel',
  },
  isRead: true,
  readAt: '2018-10-23T18:57:42.857Z',
  received: '2018-10-23T18:57:19.206Z',
  message: {
    id: 4,
    sent: '2018-10-23T17:11:41.391Z',
    from: {
      userId: 1,
      userName: 'user1',
    },
    subject: 'test',
    body: 'test',
  },
};


export const outbox = [
  {
    id: 8,
    to: {
      userId: 1,
      userName: 'user1',
    },
    from: {
      userId: 4,
    },
    subject: 'test 4',
    sent: '2018-10-24T16:13:26.080Z',
    delivered: '2018-10-24T16:13:26.095Z',
    read: false,
  },
  {
    id: 7,
    to: {
      userId: 1,
      userName: 'user1',
    },
    from: {
      userId: 4,
    },
    subject: 'test 3',
    sent: '2018-10-24T16:13:22.122Z',
    delivered: '2018-10-24T16:13:22.207Z',
    read: false,
  },
  {
    id: 6,
    to: {
      userId: 1,
      userName: 'user1',
    },
    from: {
      userId: 4,
    },
    subject: 'test',
    sent: '2018-10-24T16:13:14.583Z',
    delivered: '2018-10-24T16:13:14.591Z',
    read: false,
  },
  {
    id: 5,
    to: {
      userId: 1,
      userName: 'user1',
    },
    from: {
      userId: 4,
    },
    subject: 'test',
    sent: '2018-10-24T16:12:50.259Z',
    delivered: '2018-10-24T16:12:50.269Z',
    read: false,
  },
];
