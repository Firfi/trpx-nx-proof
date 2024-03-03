import { common, appRouter } from '@trpc-todo/common';
import cors from 'cors';

import { createHTTPServer } from '@trpc/server/adapters/standalone';



const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;


console.log(common(), 'from common/src/lib/common.ts');

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
