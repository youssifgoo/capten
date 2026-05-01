import Button from "@mui/material/Button";
import { ContextForChoose } from "./context/playerContext";
import { useContext } from "react";

export default function LossCart() {
  const { PData, setPData } = useContext(ContextForChoose);

  function clecked() {
    setPData({ ...PData, done: false, loss: false, scoor: 0, return: 10 });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        style={{
          width: "70vw",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "30px",
          borderRadius: "30px",
          boxShadow: "0 0 20px red",
          margin: "20px",
          background: "linear-gradient(160deg, rgb(255, 0, 0), rgb(150, 0, 0))",
        }}
      >
        <h1>الخسرااااان!</h1>
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "space-between",
        }}
      >
        <Button
          onClick={() => {
            clecked();
          }}
          style={{
            width: "30vw",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "30px",
            boxShadow: "0 0 20px red",
            background:
              "linear-gradient(160deg, rgb(255, 0, 0), rgb(150, 0, 0))",
          }}
        >
          <h1>اللعب مجددآ</h1>
        </Button>
        <Button
          style={{
            width: "30vw",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "30px",
            boxShadow: "0 0 20px red",
            background:
              "linear-gradient(160deg, rgb(255, 0, 0), rgb(150, 0, 0))",
          }}
        >
          <h1>نقاطتك : {PData.scoor}</h1>
        </Button>
      </div>
    </div>
  );
}
