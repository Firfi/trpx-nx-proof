import styled from 'styled-components';

import NxWelcome from './nx-welcome';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@trpc-todo/common';
import { useEffect } from 'react';

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001',
    }),
  ],
});

const StyledApp = styled.div`
  // Your style here
`;

export function App() {

  useEffect(() => {
    (async () => {
      // Inferred types
      const user = await trpc.userById.query('1709489455840');

      const createdUser = await trpc.userCreate.mutate({ name: 'sachinraja' });

      console.log('createdUser', createdUser);
      console.log('user', user);
    })().then(() => console.log('done')).catch(console.error.bind(console));
  }, []);

  return (
    <StyledApp>
      <NxWelcome title="frontend-app" />
    </StyledApp>
  );
}

export default App;
