// import ChimpleRive from "./ChimpleRive";
import ChimpleRiveWithStateMachine from "./ChimpleRiveWithStateMachine";

export default function App() {
  return (
    <div style={{ width:"100vw", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h4>Chimple Rive Test</h4>
      {/* <ChimpleRive /> */}
      <ChimpleRiveWithStateMachine />
    </div>
  );
}
