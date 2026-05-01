import { players } from "./players";

export default function HandleClick() {
  let num = Math.floor(Math.random() * players.length);

  return num;
}
