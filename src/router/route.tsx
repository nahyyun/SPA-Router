import React, { useContext } from "react";
import LocationContext from "./context";

interface RouteProps {
  path: string;
  component: React.ReactElement;
}

export default function Route({ path, component }: RouteProps) {
  if (!path) {
    throw new Error("required valid route path");
  }

  if (!React.isValidElement(component)) {
    throw new Error("required valid react element");
  }

  const { locationPath } = useContext(LocationContext);

  return path === locationPath ? component : null;
}
