import { AxesHelper, Group } from "three";
import { get3dText, getBox, getBoxWithMaterial, getMaterial, getTourusWithMaterial } from "./3D/models";
import { System } from "./3D/system";
import { getRandomArbitrary } from "./utils";

export class App {
  private system: System;
  constructor(container: Element) {
    this.system = new System(container);
  }

  async init() {
    const text = await get3dText();
    const group = new Group();
    group.add(text);
    this.system.addElementToScene(group);
    await this.addingBackground();
  }

  async addingBackground() {
    const material = await getMaterial();
    for (let index = 0; index < 2000; index++) {
      const geometry: any = getBoxWithMaterial(0.3, material);

      geometry.position.x = getRandomArbitrary(-20, 20);
      geometry.position.y = getRandomArbitrary(-7, 7);
      geometry.position.z = getRandomArbitrary(-0.5, -5);
      geometry.tick = (delta: number) => {
        geometry.rotation.y = delta * (Math.PI / 1);
      };
      this.system.animateElement(geometry);
      this.system.addElementToScene(geometry);
    }
  }
}
