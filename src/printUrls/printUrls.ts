import { TPrintUrl } from './types';

const printUrls:TPrintUrl = async (urls, cb) => {
  if (!urls.length) return;

  const copyUrls = Array.from(urls);

  await cb(copyUrls[0]);
  copyUrls.shift();

  await printUrls(copyUrls, cb);
};

export default printUrls;
