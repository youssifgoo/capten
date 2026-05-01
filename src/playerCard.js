import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { useContext, useEffect, useState, useRef } from "react";
import { ContextForChoose } from "./context/playerContext.js";
import { players } from "./players.js";

export default function PlayerCard({ refrsh }) {
  const { PData, setPData } = useContext(ContextForChoose);
  const [player, setPlayer] = useState({ img: "", win: "" });

  const changRef = useRef(new Audio("/efficts/chang.mp3"));

  const playSound = (ref) => {
    ref.current.currentTime = 0;
    ref.current.play().catch(() => {});
  };

  function clickCard() {
    playSound(changRef);
    setPData({ ...PData, return: PData.return - 1, hatrek: 0 });
    refrsh();
  }
  function spai() {
    alert(PData.win);
  }
  return (
    <div
    className="playerDiv"
      style={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        alignItems: "center",
        gap: "10px",
      }}
    >
      <div>
        <Button
        className="scoorB"
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
          <h1>{PData.scoor}</h1>
        </Button>
      </div>

      <Card
        onClick={() => spai()}
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
            height="auto"
            image={PData.img}
            alt="green iguana"
            loading="lazy"
          />
        </CardActionArea>
      </Card>

      <div style={{ width: "100%", display: "flex", gap: "10px" }} className="scrollB">
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
          {PData.return}
        </Button>
        <Button
          onClick={() => clickCard()}
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
