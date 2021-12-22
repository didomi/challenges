import { request } from 'http';

request(
  {
    timeout: 1000,
    host: 'localhost',
    port: process.env.PORT,
    path: '/'
  },
  (res) => process.exit(res.statusCode === 200 ? 0 : 1)
)
  .on('error', () => process.exit(1))
  .end();
