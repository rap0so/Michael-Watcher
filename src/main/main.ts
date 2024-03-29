import dayJs from 'dayjs';
import http from 'http';
import { TUrls, TUrl } from 'types';

import comparePrints from '../comparePrints';
import { printDir } from '../consts';
import deletePrints from '../deletePrints';
import printPage from '../printPage';
import printUrls from '../printUrls';
import sendMsgToSlack from '../sendMsgToSlack';

import urls from '../urls.json';

// TODO: integration test here
// TODO: type res on a separated file
const main = async ({ res }: { res: http.ServerResponse}) => {
  const weekDay = dayJs().day();

  if (weekDay === 5) {
    console.log('Today should be friday');
    const cpyOfUrls:TUrls = Array.from(urls);
    const saveFirstPrint = (url: TUrl) => printPage(url, 1);

    await deletePrints();
    printUrls(cpyOfUrls, saveFirstPrint);

    sendMsgToSlack('log', 'Printed URLs');
    return res.end(JSON.stringify({
      success: true,
      message: 'Printed URLs',
    }));
  }

  if (weekDay === 6 || weekDay === 7) {
    console.log('Today should be weekend');
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

      if (resultOfComparedPrints.length) {
        sendMsgToSlack('warning', JSON.stringify(resultOfComparedPrints));
      }

      return res.end(JSON.stringify({
        success: true,
        message: 'Compared URLs',
        data: resultOfComparedPrints,
      }));
    } catch (error) {
      sendMsgToSlack('log', JSON.stringify(error));
    }
  }

  const today = new Date();

  sendMsgToSlack('log', `Today is ${today}`);
  return res.end(JSON.stringify({
    success: true,
    message: 'Invalid Date',
    data: today,
  }));
};

export default main;
