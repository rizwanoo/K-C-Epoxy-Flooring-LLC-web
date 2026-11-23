import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type AppRoute = '/' | '/services' | '/our-work' | '/contact';

interface RouteMeta {
  title: string;
  description: string;
}

const ROUTE_META: Record<AppRoute, RouteMeta> = {
  '/': {
    title: 'K & C Epoxy Flooring LLC | Dallas–Fort Worth Epoxy Flooring',
    description:
      'Professional residential, commercial, and industrial epoxy flooring across Dallas–Fort Worth, Texas. Explore real projects and request an estimate.',
  },
  '/services': {
    title: 'Epoxy Flooring Services | K & C Epoxy Flooring LLC – DFW',
    description:
      'Residential garage and interior coatings, commercial retail and showroom floors, and industrial epoxy systems across Dallas–Fort Worth, Texas.',
  },
  '/our-work': {
    title: 'Our Work & Project Gallery | K & C Epoxy Flooring LLC',
    description:
      'View completed residential, commercial, industrial, garage, and decorative metallic epoxy floor installations in Dallas–Fort Worth by K & C Epoxy Flooring LLC.',
  },
  '/contact': {
    title: 'Request an Estimate | K & C Epoxy Flooring LLC – 682-715-9650',
    description:
      'Call, text 682-715-9650, or submit your project details online to request an epoxy flooring estimate in Dallas–Fort Worth, Texas.',
  },
};

function normalizePath(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/services' || clean === '/our-work' || clean === '/contact') {
    return clean;
  }
  return '/';
}

interface RouterContextValue {
  route: AppRoute;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  route: '/',
  navigate: () => {},
});

function updateMetaTags(route: AppRoute) {
  const meta = ROUTE_META[route];
  document.title = meta.title;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `${window.location.origin}${route === '/' ? '/' : route}`;
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<AppRoute>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    updateMetaTags(route);
  }, [route]);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const [rawPath, hash] = to.split('#');
    const nextRoute = normalizePath(rawPath || '/');
    const targetUrl = hash ? `${nextRoute}#${hash}` : nextRoute;

    if (window.location.pathname + window.location.hash !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }

    setRoute(nextRoute);

    if (hash) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 60);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return <RouterContext.Provider value={{ route, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function AppLink({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
