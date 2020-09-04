import http from 'http';

import main from '.';

jest.mock('@slack/web-api', () => ({
  WebClient: function mockWebClient() {
    return {
      chat: {
        postMessage: jest.fn().mockImplementation(() => ({
          ts: 'sent',
        })),
      },
    };
  },
}));

describe('main', () => {
  beforeEach(() => {
    process.env.SLACK_LOG_CHANNEL_ID = '1';
  });

  it('Should run without break', async () => {
    const fakeResponse = { end: jest.fn } as unknown as http.ServerResponse;

    main({ res: fakeResponse });
  });
});
