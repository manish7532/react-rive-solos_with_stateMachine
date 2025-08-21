import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { useState, useCallback } from "react";
export default function ChimpleRive() {
  const [currentHat, setCurrentHat] = useState("No Hat");
  const [currentShoe, setCurrentShoe] = useState("No Shoes");
  const { rive, RiveComponent } = useRive({
    src: "/mascot_solos.riv",
    artboard: "Artboard",
    autoplay: true, // Don't autoplay
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });


  const showHat = useCallback(
    (hatName: string) => {
      if (!rive) return;
      try {
        const artboards = rive.contents?.artboards;
        if (!artboards || !Array.isArray(artboards) || artboards.length === 0) {
          throw new Error("No artboards found in Rive file.");
        }
        const animations = artboards[0]?.animations;
        console.log("animations:", animations);
        rive.stop();

        // const animationName = animations[hatName == "No Hat" ? 0 : 12];
        const animationName2 = animations[1];
        if (animationName2) {
          // Play the specific timeline animation
          rive.play([animationName2]);
          setCurrentHat(hatName);
          console.log(`Switched to: ${hatName}`);
        }
      } catch (error) {
        console.error("Failed to switch hat:", error);
      }
    },
    [rive]
  );


  const showShoe = useCallback(
    (shoeName: string) => {
      if (!rive) return;
      const artboards = rive.contents?.artboards;
      if (!artboards || !Array.isArray(artboards) || artboards.length === 0) {
        throw new Error("No artboards found in Rive file.");
      }
      console.log("Artboard:", artboards);
      const animations = artboards[0]?.animations;
      try {
        rive.stop();

        const animationName = animations[shoeName == "No Shoes" ? 0 : 4];
        if (animationName) {
          rive.play([animationName]);
          setCurrentShoe(shoeName);
        }
      } catch (error) {
        console.error("Failed to switch shoe:", error);
      }
    },
    [rive]
  );


  return (
    <div>
      <RiveComponent style={{ width: 500, height: 500 }} />

      <div style={{ marginTop: 20 }}>
        <div>
          Current: {currentHat}, {currentShoe}
        </div>

        <div style={{ margin: "10px 0" }}>
          <strong>Head Gear:</strong>
          <br />
          <button onClick={() => showHat("No Hat")}>No Hat</button>
          <button onClick={() => showHat("Hat 1")}>Hat 1</button>
        </div>
        <div style={{ margin: "10px 0" }}>
          <strong>Shoes:</strong>
          <br />
          <button onClick={() => showShoe("No Shoes")}>No Shoes</button>
          <button onClick={() => showShoe("Shoe 1")}>Shoe 1</button>
        </div>
      </div>
    </div>
  );
}
