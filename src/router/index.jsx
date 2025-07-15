import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import AboutUs from '../pages/AboutUs/AboutUs';
// ... other imports

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/about',
    element: <AboutUs />,
  },
  // ... other existing routes
]);