import { nanoid } from "nanoid";
import "./Dots.css";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? props.activeColor : props.color,
  };
  const classes = ["one", "two", "three", "four", "five", "six"];
  function Dots() {
    let arr = [];
    for (let i = 0; i < props.value; i++) {
      arr.push(
        <span className={classes[i]} key={nanoid()}>
          •
        </span>
      );
    }
    return arr;
  }

  return (
    <div
      className={`die ${classes[props.value - 1]} ${
        props.useNumbers ? "number" : "dot"
      }`}
      style={styles}
      onClick={props.handleClick}
    >
      {props.useNumbers ? <span>{props.value}</span> : Dots()}
    </div>
  );
}
export default Die;
