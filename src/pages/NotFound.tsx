import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/logo.webp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <img
          src={logo}
          alt="AbhiAgri mascot"
          className="mx-auto mb-6 w-32 h-32 object-contain drop-shadow-lg"
        />
        <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block rounded-lg bg-primary px-6 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
