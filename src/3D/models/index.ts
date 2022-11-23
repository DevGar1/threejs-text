import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { BoxGeometry, Mesh, MeshBasicMaterial, MeshMatcapMaterial, TorusGeometry } from "three";
import { textLoader, textureLoader } from "../loaders";

export const getBox = async (size = 2) => {
  const geometry = new BoxGeometry(size, size, size);
  const textures = await getTexture("cubes.jpeg");
  const material = new MeshMatcapMaterial({ matcap: textures });
  return new Mesh(geometry, material);
};
export const getMaterial = async () => {
  const textures = await getTexture("cubes.jpeg");
  const material = new MeshMatcapMaterial({ matcap: textures, color: '#ACBCBB' });
  return material;
};

export const getBoxWithMaterial = (size: number, material: MeshMatcapMaterial) => {
  const geometry = new BoxGeometry(size, size, size);
  return new Mesh(geometry, material);
};

export const getTourusWithMaterial = (material: MeshMatcapMaterial) => {
  const geomtry = new TorusGeometry(0.2, .09, 20,10);
  return new Mesh(geomtry, material);
};
const getTexture = async (path: string) => {
  return await textureLoader.loadAsync(path);
};

export const get3dText = async (): Promise<Mesh> => {
  const font = await textLoader.loadAsync("/fonts/november_night/The Rockers_Regular.json");
  const textGeometry = new TextGeometry("Coming soon", {
    font: font,
    size: 5,
    height: 1,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.06,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  textGeometry.center();
  const texture = await getTexture("text.jpeg");
  const material = new MeshMatcapMaterial({ matcap: texture, color: '#E9D4CE' });
  return new Mesh(textGeometry, material);
};
