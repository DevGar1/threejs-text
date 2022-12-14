import { Group } from "three";
import { get3dText, getBoxGeometry, getBoxMesh, getMaterial } from "./3D/models";
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
    const boxGeometry = getBoxGeometry(0.25);
    for (let index = 0; index < 2000; index++) {
      const geometry: any = getBoxMesh(boxGeometry, material);
      geometry.position.x = getRandomArbitrary(-20, 20);
      geometry.position.y = getRandomArbitrary(-7, 7);
      geometry.position.z = getRandomArbitrary(-0.5, -5);
      geometry.tick = (delta: number) => {
        geometry.rotation.y = delta * (Math.PI / 1);
        geometry.rotation.x = delta * (Math.PI / 1);
      };
      this.system.animateElement(geometry);
      this.system.addElementToScene(geometry);
    }
  }
}
