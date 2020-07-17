import dayJs from 'dayjs';
import http from 'http';
import { TUrls, TUrl } from 'types';

import comparePrints from './comparePrints';
import { printDir } from './consts';
import deletePrints from './deletePrints';
import printPage from './printPage';
import printUrls from './printUrls';

import urls from './urls.json';

// TODO: integration test here
// TODO: type res on a separated file
const main = async ({ res }: { res: http.ServerResponse}) => {
  const weekDay = dayJs().day();

  // Today should be friday
  console.log('Today should be friday');
  if (weekDay === 5) {
    const cpyOfUrls:TUrls = Array.from(urls);
    const saveFirstPrint = (url: TUrl) => printPage(url, 1);

    await deletePrints();
    printUrls(cpyOfUrls, saveFirstPrint);

    res.end(JSON.stringify({
      success: true,
      message: 'Printed URLs',
    }));
  }

  // Today should be weekend
  console.log('Today should be weekend');
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
      const resultOfComparedPrints = await Promise.all(comparedPrints);

      res.end(JSON.stringify({
        success: true,
        message: 'Compared URLs',
        data: resultOfComparedPrints,
      }));
    } catch (error) {
      // TODO: save to log + warn us
    }
  }

  return null;
};

export default main;
