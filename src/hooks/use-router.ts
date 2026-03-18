import { useState, useEffect, useCallback } from "react";

interface Route {
  path: string;
  params: Record<string, string>;
}

function matchRoute(pathname: string): Route {
  // /prototype/:slug
  const protoMatch = pathname.match(/^\/prototype\/([^/]+)\/?$/);
  if (protoMatch) {
    return { path: "/prototype/:slug", params: { slug: protoMatch[1] } };
  }

  // Static routes
  const staticRoutes = ["/", "/gallery", "/about"];
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
