import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { userById, userCreate, userList } from './db';

export function common(): string {
  return 'common';
}

export const appRouter = router({
  // ...
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      // Retrieve the user with the given ID
      const user = await userById(input);
      return user;
    }),
  userList: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const users = await userList();
      return users;
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      // Create a new user in the database
      const user = await userCreate(input);
      return user;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
