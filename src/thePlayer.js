import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import { players } from "./players";
import ChoosCard from "./choosCard";
import { useContext, useState } from "react";
import { playerContext } from "./context/playerContext";
import { scoreContext } from "./context/scoreContext";

export default function ThePlayer() {
  const playerData = useContext(playerContext);
  const numContext = useContext(scoreContext);

  const use = numContext.scoreNum;
  function restart() {
    // cancel any pending bonus timeout and reset hatrek
    if (numContext.scoreNum && numContext.scoreNum.bonusTimeout) {
      clearTimeout(numContext.scoreNum.bonusTimeout);
    }
    numContext.setScoreNum((prev) => ({
      ...prev,
      value: prev.value - 1,
      hatrek: 0,
      bonusTimeout: null,
    }));
  }
  return (
    <div
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button
        variant="contained"
        style={{
          width: "100%",
          height: "75px",
          fontSize: "25px",
          background: "radial-gradient(circle, #cfd8dc 25%, #b0bec5 100%)",
          borderRadius: "15px",
          boxShadow: "5px 5px 3px 0 rgba(0, 0, 0, 0.5)",
          color: "black",
        }}
      >
        <h1>النقاط :</h1>
        <h1>{use.score}</h1>
      </Button>

      <Card
        onClick={() => playerData.changePlayer()}
        className="playerCard"
        sx={{ width: 250, height: 250 }}
        style={{
          borderRadius: "15px",
          background: "radial-gradient(circle, #ffbc1f 25%, #e48900 100%)",
          border: "3px solid gold",
          boxShadow: "5px 5px 20px 0 rgb(0, 0, 0)",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={playerData.img}
            alt="green iguana"
            loading="lazy"
          />
        </CardActionArea>
      </Card>
      <div style={{ width: "100%", display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          style={{
            width: "50%",
            height: "75px",
            fontSize: "35px",
            background: "radial-gradient(circle, #ba000d 25%, #690007 100%)",
            borderRadius: "15px",
            boxShadow: "5px 5px 3px 0 rgba(0, 0, 0, 0.5)",
          }}
        >
          {use.value}
        </Button>
        <Button
          onClick={() => {
            playerData.changePlayer();
            restart();
          }}
          variant="contained"
          style={{
            width: "50%",
            height: "75px",
            fontSize: "35px",
            background: "radial-gradient(circle, #0069ba 25%, #014070 100%)",

            borderRadius: "15px",
            boxShadow: "5px 5px 3px 0 rgba(0, 0, 0, 0.5)",
          }}
        >
          تدوير
        </Button>
      </div>
    </div>
  );
}
