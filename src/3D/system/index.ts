import { Camera, Color, Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Animation } from "./Animation";

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
    this.init();
  }

  init() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.position.z += 5;
    window.addEventListener("resize", this.setSize);
    this.setSize();
    this.animation.start()
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
    console.log(this.scene);
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
  render() {
    const { camera, scene } = this;
    this.renderer.render(scene, camera);
  }
}
