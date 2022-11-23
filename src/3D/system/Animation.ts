import { Clock, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";

const clock = new Clock();

export class Animation {
  private animationElements: Array<any>;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera, animationElements: Array<any>) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.animationElements = animationElements;
    this.animate = this.animate.bind(this)
  }

  start() {
    this.animate();
    this.renderer.setAnimationLoop(this.animate);
  }
  stop() {
    this.renderer.setAnimationLoop(null);
  }
  addElement(object3D: Object3D) {
    this.animationElements.push(object3D);
  }
  removeElement(objectName: string) {
    this.animationElements = this.animationElements.filter((object) => object.name !== objectName);
  }
  private animate() {
    this.doAnimationActions();
    this.render();
  }
  private doAnimationActions() {
    const delta = clock.getElapsedTime();
    this.animationElements.forEach((object) => {
      if (!object.tick) return;
      object.tick(delta);
    });
  }
  private render() {
    this.renderer.render(this.scene, this.camera);
  }
}
