import {
  Alignment,
  Fit,
  Layout,
  useRive,
  EventType,
  Event,
  Rive,
} from "@rive-app/react-canvas";
import { useEffect, useState } from "react";

const initialize = (rive: Rive) => {
  // streak-0: Not revealed, not completed
  rive.setTextRunValueAtPath("day", "Mon", "streak-0");
  rive.setBooleanStateAtPath("revealed", false, "streak-0");
  rive.setNumberStateAtPath("type", 0, "streak-0");

  // streak-1: Not revealed, not completed
  rive.setTextRunValueAtPath("day", "Tue", "streak-1");
  rive.setBooleanStateAtPath("revealed", false, "streak-1");
  rive.setNumberStateAtPath("type", 0, "streak-1");

  // streak-2: Revealed and completed
  rive.setTextRunValueAtPath("day", "Wed", "streak-2");
  rive.setBooleanStateAtPath("revealed", true, "streak-2");
  rive.setNumberStateAtPath("type", 1, "streak-2");

  // streak-3: Revealed but not completed
  rive.setTextRunValueAtPath("day", "Thu", "streak-3");
  rive.setBooleanStateAtPath("revealed", true, "streak-3");
  rive.setNumberStateAtPath("type", 0, "streak-3");

  // streak-4: Not revealed but completed
  rive.setTextRunValueAtPath("day", "Fri", "streak-4");
  rive.setBooleanStateAtPath("revealed", false, "streak-4");
  rive.setNumberStateAtPath("type", 1, "streak-4");

  // streak-5: Not revealed, not completed
  rive.setTextRunValueAtPath("day", "Sat", "streak-5");
  rive.setBooleanStateAtPath("revealed", false, "streak-5");
  rive.setNumberStateAtPath("type", 0, "streak-5");

  // streak-6: Not revealed, not completed
  rive.setTextRunValueAtPath("day", "Sun", "streak-6");
  rive.setBooleanStateAtPath("revealed", false, "streak-6");
  rive.setNumberStateAtPath("type", 0, "streak-6");

  // streak-7: Not revealed, not completed
  rive.setTextRunValueAtPath("day", "Mon", "streak-7");
  rive.setBooleanStateAtPath("revealed", false, "streak-7");
  rive.setNumberStateAtPath("type", 0, "streak-7");
};

export const RiveDemo = () => {
  const { rive, RiveComponent } = useRive({
    src: `/ui_streak_summary.riv`,
    stateMachines: "default",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const onRiveEventReceived = (riveEvent: Event) => {
    const eventData = riveEvent.data;
    if (
      rive &&
      eventData &&
      typeof eventData === "object" &&
      "name" in eventData
    ) {
      console.log("event received", eventData.name);
      const stateMachineInputs = rive.stateMachineInputs("default");

      if (eventData.name === "ready") {
        const revealInput2 = stateMachineInputs.find(
          (i) => i.name === "reveal"
        );
        setTimeout(() => {
          revealInput2?.fire();
        }, 1000);
      }
      if (eventData.name === "reveal-end") {
        const advanceInput = stateMachineInputs.find(
          (i) => i.name === "advance"
        );
        advanceInput?.fire();
      }
    }
  };

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (rive) {
      console.log("initialize");
      initialize(rive);
      setReady(true);
    }
  }, [rive]);

  useEffect(() => {
    if (ready) {
      console.log("setting event handler.");
      rive?.on(EventType.RiveEvent, (riveEvent) => {
        onRiveEventReceived(riveEvent);
      });
    }
  }, [ready]);

  return (
    <div style={{ width: 500, height: 200 }}>
      <RiveComponent />
    </div>
  );
};
