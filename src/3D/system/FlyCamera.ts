import { PerspectiveCamera, Raycaster, Vector3 } from "three";

export class FlyCamera {
  private camera: PerspectiveCamera;
  private origin: Vector3;

  constructor(camera: PerspectiveCamera) {
    this.camera = camera;
    this.origin = new Vector3(0, 0, 0);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.listeners();
  }

  moveCamera(width: number, height: number) {
    this.camera.position.x = width * Math.PI * 10;
    this.camera.position.y = height * Math.PI * 10;
    this.camera.lookAt(this.origin);
  }

  mouseMoveHandler(event: MouseEvent) {
    const { x, y } = event;
    const xPosition = x / window.innerWidth - 0.5;
    const yPosition = y / window.innerHeight - 0.5;
    this.moveCamera(xPosition, yPosition);
  }
  listeners() {
    window.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
