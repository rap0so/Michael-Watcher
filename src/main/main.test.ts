import http from 'http';

import main from '.';

describe('main', () => {
  it('Should run without break', async () => {
    const fakeResponse = { end: jest.fn } as unknown as http.ServerResponse;

    main({ res: fakeResponse });
  });
});
