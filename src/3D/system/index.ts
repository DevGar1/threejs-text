import { GUI } from "dat.gui";
import { Color, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Animation } from "./Animation";
import { FlyCamera } from "./FlyCamera";

export class System {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private size: { width: number; heigth: number };
  private animation: Animation;

  constructor(container: Element) {
    this.size = { width: container.clientWidth, heigth: container.clientHeight };
    this.camera = new PerspectiveCamera(75, this.size.width / this.size.heigth, 0.1, 100);
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ canvas: container });
    this.setSize = this.setSize.bind(this);
    this.animation = new Animation(this.renderer, this.scene, this.camera, []);
    new FlyCamera(this.camera);

    this.init();
  }

  init() {
    this.scene.background = new Color("#ECEAEA");
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.position.z += 13.5;
    window.addEventListener("resize", this.setSize);
    this.setSize();
    this.animation.start();
    // this.initDev();
  }
  animateElement(object3D: Object3D) {
    this.animation.addElement(object3D);
  }
  private addArrayToScene(elements: Array<Object3D>) {
    elements.forEach((element) => {
      this.scene.add(element);
    });
  }
  addElementToScene(element: Object3D | Array<Object3D>) {
    if (Array.isArray(element)) {
      this.addArrayToScene(element);
      return;
    }
    this.scene.add(element);
  }
  private setContainerSize() {
    this.size = { width: window.innerWidth, heigth: window.innerHeight };
  }
  private setSize() {
    this.setContainerSize();
    const { heigth, width } = this.size;
    this.renderer.setSize(width, heigth);
    this.camera.aspect = width / heigth;
    this.camera.updateProjectionMatrix();
    this.render();
  }
  getElementFromScene(name: string) {
    return this.scene.getObjectByName(name);
  }

  initDev() {
    const gui = new GUI({ name: "controls" });
    const cameraFolder = gui.addFolder("Camera");
    cameraFolder.add(this.camera.position, "x", -20, 20, 0.5);
    cameraFolder.add(this.camera.position, "y", -10, 10, 0.5);
    cameraFolder.add(this.camera.position, "z", -50, 50, 0.5);
    cameraFolder.open();
  }
  render() {
    const { camera, scene } = this;
    this.renderer.render(scene, camera);
  }
}
