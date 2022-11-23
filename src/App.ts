import { getBox } from "./3D/models";
import { System } from "./3D/system";

export class App {
  private system: System;
  constructor(container: Element) {
    this.system = new System(container);
  }

  init() {
    const box: any = getBox(1);
    box.tick = (delta: number) => {
      box.rotation.y = Math.sin(delta) * 1;
    };
    this.system.addElementToScene(box);
    this.system.animateElement(box);
  }
}
