import rimraf from 'rimraf';

import { printDir } from '../consts';

const deletePrints = async () => rimraf.sync(printDir);

export default deletePrints;
