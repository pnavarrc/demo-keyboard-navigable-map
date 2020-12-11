import * as React from "react";
import "./styles.css";
import USAMap from "./USAMap";

export default function App() {
  return (
    <div className="App">
      <h1>Keyboard Navigable Map</h1>
      <a href="https://www.google.com">Google</a>
      <USAMap />
    </div>
  );
}
