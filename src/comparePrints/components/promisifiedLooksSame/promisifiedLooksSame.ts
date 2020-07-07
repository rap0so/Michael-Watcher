import looksSame from 'looks-same';

// TODO: test it
const promisifiedLooksSame = (firstImgUrl: string, secondImgUrl: string) => new Promise(
  (resolve, reject) => (
    looksSame(firstImgUrl, secondImgUrl, { tolerance: 5 }, (_, success) => {
      if (success?.equal) {
        return resolve(true);
      }

      return reject(new Error(`Image ${firstImgUrl} and ${secondImgUrl} not match`));
    })),
);

export default promisifiedLooksSame;
