import http from 'http';

import main from './main';

const port = process.env.PORT || 9000

http.createServer(main).listen(port, () => console.log('Server ON'));
