import { TUrls } from 'types';
import printUrls from './printUrls';
import { TFakeFns } from './types';

describe('printUrls', () => {
  const fakeFns: TFakeFns = {};
  const fakeArray: TUrls = [];

  beforeEach(() => {
    jest.clearAllMocks();

    fakeFns.printUrls = printUrls;
    fakeFns.fn = jest.fn();

    fakeArray.push({
      highPriority: true, name: 'potato', path: 'www.potato.org.net',
    });
  });

  it('Should return when there is no items on array', async () => {
    const spied = jest.spyOn(fakeFns, 'printUrls');

    await fakeFns.printUrls!([], fakeFns.fn!);
    expect(spied).toHaveBeenCalledTimes(1);
  });

  it('Should invoke callback', async () => {
    const spied = jest.spyOn(fakeFns, 'fn');

    await fakeFns.printUrls!(fakeArray, fakeFns.fn!);
    expect(spied).toHaveBeenCalled();
  });

  it('Should recursively invoke callback when receive items on array', async () => {
    const spied = jest.spyOn(fakeFns, 'fn');

    await fakeFns.printUrls!(fakeArray, fakeFns.fn!);
    expect(spied).toHaveBeenCalledTimes(fakeArray.length);
  });

  it('Should NOT change received array when invoked', async () => {
    const arrayLength = Number(fakeArray.length);

    await printUrls(fakeArray, fakeFns.fn!);
    expect(fakeArray.length).toBe(arrayLength);
  });
});
