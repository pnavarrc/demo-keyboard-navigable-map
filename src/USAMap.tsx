import React, { useEffect, useState, createRef } from "react";
import { ComposableMap, Geographies } from "react-simple-maps";
import { State, StateLink } from "./USAMap.style";
import sortedStates from "./sortedStates";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const numStates = sortedStates.length;
enum KeyCode {
  ARROW_RIGHT = 39,
  ARROW_LEFT = 37
}

const findAnchorById = (anchorElementId: string) =>
  document.querySelector<HTMLAnchorElement>(anchorElementId);

const USAMap: React.FC = () => {
  const [stateIndex, setStateIndex] = useState(-1);
  const [listenToKeyboard, setListenToKeyboard] = useState(false);

  useEffect(() => {
    function focusItem(itemIndex: number) {
      setStateIndex(itemIndex);
      findAnchorById(`#state-${sortedStates[itemIndex]}`)?.focus();
    }

    function onKeyDown({ keyCode }: KeyboardEvent) {
      let nextIndex = stateIndex;
      switch (keyCode) {
        case KeyCode.ARROW_RIGHT:
          nextIndex = (stateIndex + 1) % numStates;
          focusItem(nextIndex);
          break;
        case KeyCode.ARROW_LEFT:
          nextIndex = stateIndex === 0 ? numStates - 1 : stateIndex - 1;
          focusItem(nextIndex);
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
      onBlur={() => {
        setListenToKeyboard(false);
        findAnchorById(`#state-${sortedStates[stateIndex]}`)?.blur();
      }}
    >
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl} key="states">
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
        <Geographies geography={geoUrl} key="selected-state">
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id === sortedStates[stateIndex])
              .map((geo) => {
                return (
                  <StateLink
                    id={`state-${geo.id}`}
                    href="https://www.covidactnow.org"
                    aria-label={geo.properties.name}
                    tabIndex={0}
                  >
                    <State key={geo.rsmKey} geography={geo} fill={"none"} />
                  </StateLink>
                );
              })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default USAMap;
