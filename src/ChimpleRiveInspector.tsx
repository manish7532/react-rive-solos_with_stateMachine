import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function ChimpleRiveInspector() {
  const { RiveComponent } = useRive({
    src: "/mascot_with_accessories_without_state_machine_11082025.riv",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoad: async(riveInstance) => {
      // This callback runs when file is loaded
    fetch("/mascot_with_accessories_without_state_machine_11082025.riv").then((response) => 
      console.log("Rive file loaded:", response.json())
    ).catch((error) =>
      console.error("Error loading Rive file:", error))
      const artboard = riveInstance?.type
      if (artboard) {
        console.log("Artboard:", artboard);
        // const components = artboard;
        // components.forEach((c: any) => {
        //   console.log(`Component: ${c.name} | Type: ${c.constructor.name}`);
        // });
      }
    },
  });

  return <RiveComponent style={{ width: 500, height: 500 }} />;
}
