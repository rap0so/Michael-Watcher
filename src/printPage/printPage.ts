import mkdirp from 'mkdirp';
import puppeteer from 'puppeteer';
import fullPageScreenshot from 'puppeteer-full-page-screenshot';

import { TPrintPosition, TUrl } from 'types';

import { printDir } from '../consts';

const printPage = async (url: TUrl, position: TPrintPosition) => {
  const {
    name,
    path,
  } = url;

  const dir = `${printDir}/${name}`;

  try {
    await mkdirp(dir);

    const puppeteerOptions = { path: `${dir}/${position}.png` };

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 5000 });

    await page.goto(path);
    await page.waitFor(3000);

    await fullPageScreenshot(page, puppeteerOptions);

    await browser.close();
  } catch (error) {
    // TODO: save error to logs
  }
};

export default printPage;
