import * as React from "react";
import "./App.css";
import LossCart from "./lossCart.js";
import WinCart from "./winCart.js";
import PlayerCard from "./playerCard.js";
import Cardes from "./Cardes.js";

import { ContextForChoose } from "./context/playerContext.js";

import { useState, useEffect } from "react";

import { players } from "./players.js";

function App() {
  const [PData, setPData] = useState({
    img: "",
    win: [],
    return: 10,
    scoor: 0,
    hatrek: 0,
  });
  let num = Math.floor(Math.random() * players.length);

  function refrshPlayer() {
    let num = Math.floor(Math.random() * players.length);
    setPData((prev) => ({
      ...prev,
      img: players[num].img,
      win: players[num].win,
    }));
  }

  useEffect(() => {
    setPData({
      win: players[num].win,
      img: players[num].img,
      return: 10,
      scoor: 0,
      hatrek: 0,
    });
  }, []);

  return (
    <div
      dir="rtl"
      className="App"
      style={{
        backgroundColor: "transparent",
        backgroundImage: "url(/playing.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ContextForChoose.Provider value={{ PData, setPData }}>
          <>
            <PlayerCard refrsh={refrshPlayer} />
            <div
              style={{
                columns: "4",
                padding: "20px",
              }}
            >
              <Cardes refrsh={refrshPlayer} />
            </div>
          </>
      </ContextForChoose.Provider>
    </div>
  );
}

export default App;
