import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import { ContextForChoose } from "./context/playerContext.js";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { clubs } from "./clubs.js";
import { cubs } from "./cups.js";
import { elect } from "./elected.js";
import { leg } from "./legs.js";
import { players } from "./players.js";
import { Done } from "@mui/icons-material";
import WinCart from "./winCart.js";
import LossCart from "./lossCart.js";

export default function Cardes({ refrsh }) {
  const clickRef = useRef(new Audio("/efficts/click.mp3"));
  const coinRef = useRef(new Audio("/efficts/coin.mp3"));
  const wrongRef = useRef(new Audio("/efficts/wrong.mp3"));
  const winRef = useRef(new Audio("/efficts/win.mp3"));
  const loseRef = useRef(new Audio("/efficts/lose.mp3"));
  const salepRef = useRef(new Audio("/efficts/salep.mp3"));
  const hatrekRef = useRef(new Audio("/efficts/hatrek.mp3"));

  const playSound = (ref) => {
    ref.current.currentTime = 0;
    ref.current.play().catch(() => {});
  };

  const [player, setPlayer] = useState(() => {
    const num = Math.floor(Math.random() * players.length);
    return players[num];
  });

  const { PData, setPData } = useContext(ContextForChoose);

  const [cardes, setCardes] = useState([]);
  const [userInteracted, setUserInteracted] = useState(false);

  let win = false;
  let loss = false;

  useEffect(() => {
    const cardType = [clubs, cubs, elect, leg];
    const randomCards = [];

    for (let i = 0; i < 12; i++) {
      const typeIndex = Math.floor(Math.random() * cardType.length);
      const itemIndex = Math.floor(Math.random() * cardType[typeIndex].length);

      const card = cardType[typeIndex][itemIndex];

      randomCards.push({
        img: card.img,
        name: card.name,
        id: uuidv4(),
        isDone: false,
      });
    }
    setCardes(randomCards);
  }, []);

  const winner = cardes.length > 0 && cardes.every((w) => w.isDone === true);
  if (winner) {
    win = true;
    playSound(winRef);
  }

  if (PData.scoor < 0) {
    loss = true;
    playSound(salepRef);
  } else if (PData.return == 0) {
    loss = true;
    playSound(loseRef);
  }
  const [img, setImg] = useState({ img: "", name: "" });

  const cartesMap = cardes.map((c) => {
    return (
      <Card
        key={c.id}
        disabled={c.isDone}
        onClick={() => clickCard(c)}
        className="cards"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={c.img}
            height="auto"
            alt={c.name}
            loading="lazy"
          />
          <CardContent sx={{ padding: "8px 12px" }}>
            <Typography
              variant="subtitle2"
              align="center"
              sx={{ color: "#fff", textTransform: "capitalize" }}
            ></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  function clickCard(card) {
    playSound(clickRef);
    setImg({ img: card.img, name: card.name });

    let isWin = false;
    for (let p of PData.win) {
      if (card.name === p) {
        setPData((prev) => {
          const nextHatrek = prev.hatrek + 1;
          const bonus = nextHatrek === 3 ? 1 : 0;

          if (nextHatrek === 3) {
            playSound(hatrekRef);
          }

          return {
            ...prev,
            scoor: prev.scoor + 1 + bonus,
            hatrek: nextHatrek === 3 ? 0 : nextHatrek,
          };
        });
        refrsh();

        for (let c of cardes) {
          if (card.id === c.id) {
            c.isDone = true;
            c.img = PData.img;
            c.name = PData.name;
          }
        }

        isWin = true;
        break;
      }
    }

    if (!isWin) {
      playSound(wrongRef);

      setPData((prev) => ({ ...prev, scoor: prev.scoor - 1, hatrek: 0 }));
    }
  }

  return (
    <div>
      {win ? (
        <div
          onClick={() => window.location.reload()}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
            position: "absolute",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100vw",
            height: "100vh",
            top: "0",
            right: "0",
          }}
        >
          <WinCart />
        </div>
      ) : loss ? (
        <div
          onClick={() => window.location.reload()}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
            position: "absolute",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100vw",
            height: "100vh",
            top: "0",
            right: "0",
          }}
        >
          <LossCart />
        </div>
      ) : (
        <></>
      )}

      <div
        style={{
          display: "grid",
          gap: "15px",
        }}
      >
        {cartesMap}
      </div>
    </div>
  );
}
