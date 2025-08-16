import express from 'express';
import cors from 'cors';
import trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '../routers';

const app = express();
app.use(cors());

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

app.listen(3000, () => {
  console.log('tRPC server running at http://localhost:3000');
});

export type AppRouter = typeof appRouter;
