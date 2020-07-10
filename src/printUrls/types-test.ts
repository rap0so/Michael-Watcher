import { TPrintUrl } from './types';

export type TFakeFns = {
    printUrls?: TPrintUrl,
    fn?: jest.Mock<any, any>
}
