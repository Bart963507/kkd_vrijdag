import { Outlet, createRootRoute } from '@tanstack/react-router'
import MenuBar from '@/components/MenuBar'
import { PrimeReactProvider } from 'primereact/api';
// theme (choose one)
import "primereact/resources/themes/lara-light-blue/theme.css"; 

// core css
import "primereact/resources/primereact.min.css"; 

// icons
import "primeicons/primeicons.css";

export const Route = createRootRoute({
  component: () => (
    <PrimeReactProvider>
      <MenuBar />
      <Outlet />
    </PrimeReactProvider>
  ),
})
