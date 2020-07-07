import comparePrints from '.';
import promisifiedLooksSame from './components/promisifiedLooksSame';

jest.mock('./components/promisifiedLooksSame');

describe('comparePrints', () => {
  it('Should be a fn', () => {
    expect(typeof comparePrints === 'function').toBeTruthy();
  });

  it('Should NOT return error on receive props', () => {
    expect(comparePrints('123123', '1231231'));
    expect(comparePrints('fakeImg', 'potato'));
  });

  it('Should invoke inside fn promisifiedLooksSame', () => {
    const testImg = `${__dirname}/image.test.jpeg`;

    expect(comparePrints(testImg, testImg));
    expect(promisifiedLooksSame).toHaveBeenCalled();
  });
});
