import { RouterProvider, useRouter } from './context/RouterContext';
import { MotionProvider } from './components/MotionPrimitives';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ContactPage } from './pages/ContactPage';

function PageView() {
  const { route } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#141619]">
      <Navbar />
      <main className="flex-1">
        {route === '/' && <HomePage />}
        {route === '/services' && <ServicesPage />}
        {route === '/our-work' && <OurWorkPage />}
        {route === '/contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <RouterProvider>
        <PageView />
      </RouterProvider>
    </MotionProvider>
  );
}
