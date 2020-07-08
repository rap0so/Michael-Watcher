import { TUrls } from 'types';

export type TPrintUrlFnProps = (...arg: any) => void

export type TPrintUrl = (urls: TUrls, cb: TPrintUrlFnProps) => void

export type TFakeFns = {
    printUrls?: TPrintUrl,
    fn?: jest.Mock<any, any>
}
