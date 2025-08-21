import { useRive, Layout, Fit, Alignment, useStateMachineInput } from "@rive-app/react-canvas";
import { useState, useCallback, useEffect } from "react";
export default function ChimpleRiveWithStateMachine() {
  // const [currentHat, setCurrentHat] = useState("No Hat");
  // const [currentShoe, setCurrentShoe] = useState("No Shoes");
  const { rive, RiveComponent } = useRive({
    src: "/mascot_state_machine.riv",
    artboard: "Artboard",
    stateMachines: "State Machine 2",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // Bind the state machine input "Number 1" so we can control it from React
  const numberInput = useStateMachineInput(rive, "State Machine 2", "Number 1", 0);

  // Smoother UX controls for the state machine number input
  const MIN = 0;
  const MAX = 8;
  const STEP = 1;

  const [number1Value, setNumber1Value] = useState<number>(0);

  // Initialize local state from the rive input when it becomes available
  useEffect(() => {
    if (numberInput && typeof numberInput.value === "number") {
      setNumber1Value(Number(numberInput.value));
    }
  }, [numberInput]);

  // Push local changes to the rive input
  useEffect(() => {
    if (numberInput) {
      numberInput.value = number1Value;
    }
  }, [number1Value, numberInput]);

  const decrement = useCallback(() => {
    setNumber1Value((v) => Math.max(MIN, v - STEP));
  }, []);

  const increment = useCallback(() => {
    setNumber1Value((v) => Math.min(MAX, v + STEP));
  }, []);


  return (
    <div>
      <RiveComponent style={{ width: "100%", height: 400 }} />

      <div style={{ marginTop: 20, marginLeft:"10%" }}>
        <div style={{ margin: "10px 0" }}>
          <strong>State Machine Input:</strong>
          <br />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={decrement}>-</button>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={number1Value}
              onChange={(e) => setNumber1Value(Number(e.target.value))}
              style={{ width: 240 }}
            />
            <button onClick={increment}>+</button>
            <span style={{ width: 60, }}>{number1Value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
