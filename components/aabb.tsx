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
  Svg,
} from "matter-js";

import gohperDummy from "@/assets/images/crash-dummy.png";

export const Playground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playgroundHeight = 800;
  const playgroundWidth = 560;
  const wallThickness = 60;

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      engine,
      canvas: canvasRef.current!,
      options: {
        width: playgroundWidth,
        height: playgroundHeight,
        wireframes: false,
      },
    });

    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);

    var gohper = Bodies.rectangle(200, 200, 80, 80, {
      render: {
        sprite: {
          texture: gohperDummy.src,
          xScale: 0.2,
          yScale: 0.2,
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

    World.add(engine.world, [boxA, boxB, gohper, button, top, left, right]);
    Render.run(render);
    const runner = Runner.run(engine);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
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

  return <canvas ref={canvasRef} />;
};
