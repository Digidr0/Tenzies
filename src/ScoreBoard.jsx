import React from "React";

function Scoreboard(props) {
  return (
    <div className="Scoreboard">
      <table>
        <tbody>
        <tr>
          <th>№</th>
          <th>Time</th>
          <th>Rolls</th>
        </tr>
        {props.highScores}
        </tbody>
      </table>
    </div>
  );
}
export default Scoreboard;
