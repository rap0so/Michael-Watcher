import { TUrls, TUrl } from 'types';
import dayJs from 'dayjs';

import comparePrints from './comparePrints';
import { printDir } from './consts';
import deletePrints from './deletePrints';
import printPage from './printPage';
import printUrls from './printUrls';

import urls from './urls.json';

// TODO: integration test here
const main = async () => {
  const weekDay = dayJs().day();

  // Today should be friday
  if (weekDay === 5) {
    const cpyOfUrls:TUrls = Array.from(urls);
    const saveFirstPrint = (url: TUrl) => printPage(url, 1);

    await deletePrints();
    return printUrls(cpyOfUrls, saveFirstPrint);
  }

  // Today should be weekend
  if (weekDay === 6 || weekDay === 7) {
    const cpyOfUrls:TUrls = Array.from(urls);
    const saveSecondPrint = (url: TUrl) => printPage(url, 2);
    printUrls(cpyOfUrls, saveSecondPrint);

    const comparedPrints = urls.map(({ name }: TUrl) => {
      const currentPrintDir = `${printDir}/${name}`;
      const firstImg = `${currentPrintDir}/1.png`;
      const secondImg = `${currentPrintDir}/2.png`;

      // TODO: add server url to the img, so we can see the img by url
      const isNotEqual = comparePrints(firstImg, secondImg);

      return isNotEqual;
    });

    try {
      await Promise.all(comparedPrints);
    } catch (error) {
      // TODO: save to log + warn us
    }
  }

  return null;
};

export default main;
