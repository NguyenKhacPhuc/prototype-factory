import React, { useMemo } from "react";
import { useRouter } from "./hooks/use-router";
import { usePrototypes } from "./hooks/use-prototypes";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Landing } from "./pages/landing";
import { Gallery } from "./pages/gallery";
import { PrototypeDetail } from "./pages/prototype-detail";
import { About } from "./pages/about";
import { Create } from "./pages/create";
import { Styles } from "./pages/styles";
import { Profile } from "./pages/profile";
import { AuthCallback } from "./pages/auth-callback";

export function App() {
  const { path, params, navigate } = useRouter();
  const { prototypes, loading, error } = usePrototypes();

  // Parse URL search params for gallery
  const urlCategory = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("category");
  }, [path]);

  if (loading) {
    return (
      <div className="app">
        <Header navigate={navigate} currentPath={path} />
        <main className="main">
          <div className="loading">Loading prototypes...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header navigate={navigate} currentPath={path} />
        <main className="main">
          <div className="error-state">Failed to load prototypes. Please try again.</div>
        </main>
      </div>
    );
  }

  const renderPage = () => {
    switch (path) {
      case "/":
        return <Landing prototypes={prototypes} navigate={navigate} />;
      case "/gallery":
        return <Gallery prototypes={prototypes} navigate={navigate} initialCategory={urlCategory} />;
      case "/prototype/:slug": {
        const proto = prototypes.find((p) => p.folder === params.slug);
        return <PrototypeDetail prototype={proto} navigate={navigate} />;
      }
      case "/about":
        return <About prototypeCount={prototypes.length} navigate={navigate} />;
      case "/create":
        return <Create navigate={navigate} />;
      case "/styles":
        return <Styles navigate={navigate} />;
      case "/profile":
        return <Profile navigate={navigate} />;
      case "/auth/callback":
        return <AuthCallback navigate={navigate} />;
      default:
        return <Landing prototypes={prototypes} navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Header navigate={navigate} currentPath={path} />
      <main className="main">{renderPage()}</main>
      <Footer />
    </div>
  );
}
