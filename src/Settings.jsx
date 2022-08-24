import { nanoid } from "nanoid";
import React from "React";
import Die from "./Die.jsx";
function Settings(props) {
  const [active, setActive] = React.useState([false, false, true]);
  const [numbers, setNumbers] = React.useState([false, true]);
  return (
    <div className="Settings">
      <h2 className="Title">Settings</h2>

      <div className="countSetting">
        <h3>Count:</h3>
        <Die
          value={3}
          key={nanoid()}
          isHeld={active[0]}
          handleClick={() => {
            props.changeDices(3);
            setActive([true, false, false]);
          }}
          activeColor={props.activeColor}
        />
        <Die
          value={5}
          key={nanoid()}
          isHeld={active[1]}
          handleClick={() => {
            props.changeDices(5);
            setActive([false, true, false]);
          }}
          activeColor={props.activeColor}
        />
        <Die
          value={9}
          key={nanoid()}
          isHeld={active[2]}
          handleClick={() => {
            setActive([false, false, true]);
            props.changeDices(10);
          }}
          activeColor={props.activeColor}
        />
      </div>
      <div className="useNumberSetting">
        <h3>Dice style:</h3>
        <Die
          value={5}
          key={nanoid()}
          isHeld={numbers[0]}
          handleClick={() => {
            props.changeUseNumbers(true)
            setNumbers([true, false]);
          }}
          activeColor={props.activeColor}
          useNumbers={true}
        />
        <Die
          value={5}
          key={nanoid()}
          isHeld={numbers[1]}
          handleClick={() => {
            props.changeUseNumbers(false)
            setNumbers([false, true]);
          }}
          activeColor={props.activeColor}
          useNumbers={false}
        />
      </div>
    </div>
  );
}
export default Settings;
