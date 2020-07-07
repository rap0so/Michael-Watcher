import fs from 'fs';
import promisifiedLooksSame from './components/promisifiedLooksSame';

const comparePrints = async (firstImgUrl:string, secondImgUrl:string) => (
  firstImgUrl
    && secondImgUrl
    && fs.existsSync(firstImgUrl)
    && fs.existsSync(secondImgUrl)
    && promisifiedLooksSame(firstImgUrl, secondImgUrl)
);

export default comparePrints;
