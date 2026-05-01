import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import { players } from "./players";
import ChoosCard from "./choosCard";
import ThePlayer from "./thePlayer";

import { useState } from "react";

import { playerContext } from "./context/playerContext";
import { scoreContext } from "./context/scoreContext";

export default function Capten() {

  const [playerImgNum, setPlayerImgNum] = useState(
    Math.floor(Math.random() * players.length),
  );

  const [scoreNum, setScoreNum] = useState({ score: 0, value: 10, hatrek: 0 });
  
  let playerWin = players[playerImgNum].win;

  function handleChangePlayer() {
    setPlayerImgNum(Math.floor(Math.random() * players.length));
  }

  return (
    <playerContext.Provider
      value={{
        data: playerWin,
        img: players[playerImgNum].img,
        changePlayer: handleChangePlayer,
        setPlayerImgNum: setPlayerImgNum,
      }}
    >
          <Container
            maxWidth="lg"
            style={{
              width: "90vw",
              height: "95vh",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <scoreContext.Provider value={{scoreNum, setScoreNum}}>
              <ThePlayer />
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center ",
                  flexWrap: "wrap",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gap: "10px",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
                <ChoosCard />
              </div>
            </scoreContext.Provider>
          </Container>
    </playerContext.Provider>
  );
}
