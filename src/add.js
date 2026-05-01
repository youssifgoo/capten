import { useState } from "react";

export default function Add() {
  const [newPhone, setNewPohne] = useState("");
  const [phons, setPhons] =useState(["samsung", "iphone", "oppo", "pixe"])
  const showPhons = phons.map((show) => {
    return (<li>{show}</li>)
  })
  return (
    <div>
        <ul>{showPhons}</ul>
      <input
      value={newPhone}
      onChange={(event) => {
        setNewPohne(event.target.value)
      }}></input>
      <button onClick={() => {
        setPhons([...phons, newPhone])
      }}>ADD</button>
    </div>
  );
}
