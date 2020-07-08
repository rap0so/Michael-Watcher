import fs from 'fs';

import { printDir } from '../consts';

import deletePrints from '.';

describe('deletePrints', () => {
  it('Should delete print folder', async () => {
    if (!fs.existsSync(printDir)) {
      fs.mkdirSync(printDir);
    }

    expect(fs.existsSync(printDir)).toBeTruthy();

    await deletePrints();

    expect(fs.existsSync(printDir)).toBeFalsy();
  });
});
