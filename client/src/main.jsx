import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/router';
import AuthProviders from './providers/AuthProviders';
import { ActiveLinkProvider } from './activeLink/ActiveLink';
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
     <ActiveLinkProvider>
     <AuthProviders>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProviders>
     </ActiveLinkProvider>
     </HelmetProvider>
  </StrictMode>
);
