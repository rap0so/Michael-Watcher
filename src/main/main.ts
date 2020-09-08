import dayJs from 'dayjs';
import { TUrls, TUrl } from 'types';

import comparePrints from '../comparePrints';
import { brazilianGMT, printDir } from '../consts';
import deletePrints from '../deletePrints';
import printPage from '../printPage';
import printUrls from '../printUrls';
import sendMsgToSlack from '../sendMsgToSlack';

import urls from '../urls.json';
import { TMainProps } from './types';

const SUNDAY_WEEK_DAY = 0;
const FRIDAY_WEEK_DAY = 6;
const SATURDAY_WEEK_DAY = 7;

// TODO: integration test here
const main = async ({ res }: TMainProps) => {
  const today = dayJs().subtract(brazilianGMT, 'hour');
  const weekDay = today.day();

  if (weekDay === FRIDAY_WEEK_DAY || true) {
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

  if (weekDay === SUNDAY_WEEK_DAY || weekDay === SATURDAY_WEEK_DAY) {
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

  sendMsgToSlack('log', `Today is ${today}`);

  return res.end(JSON.stringify({
    success: true,
    message: 'Invalid Date',
    data: today,
  }));
};

export default main;
