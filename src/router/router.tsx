import React, { useEffect, useState } from "react";
import LocationContext from "./context";

interface RouterProps {
  children: React.ReactNode;
}

export default function Router({ children }: RouterProps) {
  const [locationPath, setLocationPath] = useState(location.pathname);

  useEffect(() => {
    const onPopStateHandler = () => {
      setLocationPath(location.pathname);
    };

    window.addEventListener("popstate", onPopStateHandler);

    return () => window.removeEventListener("popstate", onPopStateHandler);
  }, []);

  return (
    <LocationContext.Provider value={{ locationPath }}>
      {children}
    </LocationContext.Provider>
  );
}
