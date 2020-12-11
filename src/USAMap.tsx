import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies } from "react-simple-maps";
import { State } from "./USAMap.style";
import sortedStates from "./sortedStates";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const numStates = sortedStates.length;
enum KeyCode {
  ARROW_RIGHT = 39,
  ARROW_LEFT = 37
}

function focusSvgElementById(svgElementId: string) {
  document?.querySelector<SVGElement>(svgElementId)?.focus();
}

const USAMap: React.FC = () => {
  const [stateIndex, setStateIndex] = useState(0);
  const [listenToKeyboard, setListenToKeyboard] = useState(false);

  useEffect(() => {
    function onKeyDown({ keyCode }: KeyboardEvent) {
      let nextIndex = 0;
      switch (keyCode) {
        case KeyCode.ARROW_RIGHT:
          nextIndex = (stateIndex + 1) % numStates;
          setStateIndex(nextIndex);
          focusSvgElementById(`#state-${sortedStates[nextIndex]}`);
          break;
        case KeyCode.ARROW_LEFT:
          nextIndex = stateIndex === 0 ? numStates - 1 : stateIndex - 1;
          setStateIndex(nextIndex);
          focusSvgElementById(`#state-${sortedStates[nextIndex]}`);
          break;
      }
      return false;
    }
    if (listenToKeyboard) {
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stateIndex, setStateIndex, listenToKeyboard]);

  return (
    <div
      tabIndex={0}
      onFocus={() => setListenToKeyboard(true)}
      onBlur={() => setListenToKeyboard(false)}
    >
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <State
                id={`state-hidden-${geo.id}`}
                key={geo.rsmKey}
                tabIndex={-1}
                geography={geo}
              />
            ))
          }
        </Geographies>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id === sortedStates[stateIndex])
              .map((geo) => (
                <State
                  id={`state-${geo.id}`}
                  key={geo.rsmKey}
                  tabIndex={-1}
                  geography={geo}
                  fill={"none"}
                />
              ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default USAMap;
