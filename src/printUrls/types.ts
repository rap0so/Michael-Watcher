import { TUrls } from 'types';

export type TPrintUrlFnProps = (...arg: any) => void

export type TPrintUrl = (urls: TUrls, cb: TPrintUrlFnProps) => void
