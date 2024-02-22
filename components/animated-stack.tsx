"use client";
import React, { useEffect, useRef } from "react";
import {
  World,
  Engine,
  Render,
  Bodies,
  Events,
  Mouse,
  MouseConstraint,
  Runner,
} from "matter-js";

import gohperDummy from "@/assets/images/crash-dummy.png";
import defaultGo from "@/assets/images/Go.png";
import Arch from "@/assets/images/Arch Linux.png";
import K8s from "@/assets/images/Kubernetes.png";
import cloudflare from "@/assets/images/Cloudflare.png";

export const Playground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playgroundHeight = 270;
  const playgroundWidth = 500;
  const wallThickness = 10;

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      engine,
      canvas: canvasRef.current!,
      options: {
        width: playgroundWidth,
        height: playgroundHeight,
        background: "transparent",
        wireframes: false,
      },
    });

    var boxA = Bodies.rectangle(150, 100, 80, 80, {
      render: {
        sprite: {
          texture: Arch.src,
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    });
    var boxB = Bodies.rectangle(100, 100, 80, 80, {
      render: {
        sprite: {
          texture: defaultGo.src,
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    });

    var kube = Bodies.circle(200, 200, 40, {
      render: {
        sprite: {
          texture: K8s.src,
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    });

    var gohper = Bodies.rectangle(50, 100, 80, 80, {
      render: {
        sprite: {
          texture: gohperDummy.src,
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    });

    var CF = Bodies.rectangle(100, 50, 80, 45, {
      render: {
        sprite: {
          texture: cloudflare.src,
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    });

    const button = Bodies.rectangle(
      playgroundWidth / 2,
      playgroundHeight - wallThickness / 4,
      playgroundWidth + 100,
      wallThickness,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      }
    );
    const top = Bodies.rectangle(
      playgroundWidth / 2,
      wallThickness / 4,
      playgroundWidth + 100,
      wallThickness,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      }
    );
    const left = Bodies.rectangle(
      wallThickness / 4,
      playgroundHeight / 2,
      wallThickness,
      playgroundHeight + 100,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      }
    );
    const right = Bodies.rectangle(
      playgroundWidth - wallThickness / 4,
      playgroundHeight / 2,
      wallThickness,
      playgroundHeight + 100,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      }
    );

    World.add(engine.world, [
      boxA,
      boxB,
      gohper,
      kube,
      CF,
      button,
      top,
      left,
      right,
    ]);
    Render.run(render);
    const runner = Runner.run(engine);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.05,
        render: {
          visible: false,
        },
      },
    });

    Events.on(engine.world, "collisionStart", (event) => {
      console.log(event);
    });

    World.add(engine.world, mouseConstraint);

    return () => {
      Runner.stop(runner);
      Render.stop(render);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="border-2 rounded-xl"
      width={playgroundWidth}
      height={playgroundHeight}
    />
  );
};
