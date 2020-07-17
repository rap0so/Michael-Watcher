import { messageStartedServer } from 'consts';
import http from 'http';

import main from './main';

const port = process.env.PORT || 9000

http.createServer((_, res) => main({ res }))
    .listen(port, () => console.log(messageStartedServer));
