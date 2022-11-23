import { LoadingManager, TextureLoader } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export const loaderManager = new LoadingManager();
export const textLoader = new FontLoader(loaderManager);
export const textureLoader = new TextureLoader(loaderManager).setPath("/materials/");
