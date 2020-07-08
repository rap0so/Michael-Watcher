import http from 'http';

import main from './main';
import { serverPort } from './consts'

http.createServer(main).listen(serverPort, () => console.log('Server ON'));
