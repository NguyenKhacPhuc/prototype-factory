import { useState, useEffect, useCallback } from "react";

interface Route {
  path: string;
  params: Record<string, string>;
}

function matchRoute(rawPath: string): Route {
  // Strip query string for matching
  const pathname = rawPath.split('?')[0];
  // /prototype/:slug
  const protoMatch = pathname.match(/^\/prototype\/([^/]+)\/?$/);
  if (protoMatch) {
    return { path: "/prototype/:slug", params: { slug: protoMatch[1] } };
  }

  // /design/:jobId
  const designMatch = pathname.match(/^\/design\/([^/]+)\/?$/);
  if (designMatch) {
    return { path: "/design/:jobId", params: { jobId: designMatch[1] } };
  }

  // /auth/callback
  if (pathname === "/auth/callback") {
    return { path: "/auth/callback", params: {} };
  }

  // Static routes
  const staticRoutes = ["/", "/gallery", "/about", "/create", "/canvas", "/styles", "/profile", "/admin", "/pricing"];
  const matched = staticRoutes.find((r) => r === pathname);
  return { path: matched || "/", params: {} };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => matchRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(matchRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setRoute(matchRoute(to));
    window.scrollTo(0, 0);
  }, []);

  return { ...route, navigate };
}
