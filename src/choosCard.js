import React, { useState, useContext, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

import { clubs } from "./clubs";
import { cubs } from "./cups";
import { elect } from "./elected";
import { leg } from "./legs";

import { playerContext } from "./context/playerContext";
import { scoreContext } from "./context/scoreContext";

export default function ChoosCard() {
  const playerData = useContext(playerContext);
  const numContext = useContext(scoreContext);

  const [arrayNum, setArrayNum] = useState([
    Math.floor(Math.random() * clubs.length),
    Math.floor(Math.random() * cubs.length),
    Math.floor(Math.random() * elect.length),
    Math.floor(Math.random() * leg.length),
  ]);
  const [cardType, setCardType] = useState([clubs, cubs, elect, leg]);

  const num = Math.floor(Math.random() * cardType.length);

  let img = cardType[num][arrayNum[num]].img;
  let name = cardType[num][arrayNum[num]].name;

  const [change, setChange] = useState([{ imG: img, namE: name }]);

  // ref to keep any pending bonus timeout so we can clear on unmount
  const bonusTimeoutRef = useRef(null);

  function Clicked(name) {
    const isWin = playerData.data.includes(name.name);
    if (isWin) {
      // current shared hatrek count
      const currentH = numContext.scoreNum.hatrek || 0;
      const newH = currentH + 1;

      setChange([{ imG: playerData.img, namE: name.name }]);

      if (newH === 3) {
        // grant the normal point immediately, reset hatrek, then schedule bonus +1 after 1s
        numContext.setScoreNum((prev) => ({
          ...prev,
          score: prev.score + 1,
          hatrek: 0,
        }));

        // clear any existing timeout just in case, then schedule a new bonus
        if (bonusTimeoutRef.current) {
          clearTimeout(bonusTimeoutRef.current);
          bonusTimeoutRef.current = null;
          // remove stored id from context
          numContext.setScoreNum((prev) => ({ ...prev, bonusTimeout: null }));
        }
        const timeoutId = setTimeout(() => {
          numContext.setScoreNum((prev) => ({
            ...prev,
            score: prev.score + 1,
            bonusTimeout: null,
          }));
          bonusTimeoutRef.current = null;
        }, 1000);
        bonusTimeoutRef.current = timeoutId;
        // store in shared context so other components (e.g. ThePlayer) can cancel it
        numContext.setScoreNum((prev) => ({
          ...prev,
          bonusTimeout: timeoutId,
        }));
      } else {
        numContext.setScoreNum((prev) => ({
          ...prev,
          score: prev.score + 1,
          hatrek: newH,
        }));
      }

      playerData.changePlayer();
    } else {
      // reset hatrek on miss: cancel pending bonus and decrement score by 1
      if (bonusTimeoutRef.current) {
        clearTimeout(bonusTimeoutRef.current);
        bonusTimeoutRef.current = null;
        numContext.setScoreNum((prev) => ({ ...prev, bonusTimeout: null }));
      }
      numContext.setScoreNum((prev) => ({
        ...prev,
        score: prev.score - 1,
        hatrek: 0,
      }));
    }
  }

  // cleanup pending timeout on unmount
  useEffect(() => {
    return () => {
      if (bonusTimeoutRef.current) {
        clearTimeout(bonusTimeoutRef.current);
        // remove stored id from context
        numContext.setScoreNum((prev) => ({ ...prev, bonusTimeout: null }));
      }
    };
  }, []);

  return (
    <Card
      onClick={() => Clicked({ name: change[0].namE })}
      className="playerCard"
      sx={{ width: 160, height: 160 }}
      style={{
        borderRadius: "15px",
        background: "radial-gradient(circle, #5de454 0%, #004d40 100%)",
        border: "3px solid #ffffff",
        boxShadow:
          "7px 7px 8px 0 rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(0, 0, 0, 0.25)",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={change[0].imG}
          alt="green iguana"
          loading="lazy"
        />
      </CardActionArea>
    </Card>
  );
}
