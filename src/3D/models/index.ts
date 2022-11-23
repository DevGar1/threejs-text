import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";

export const getBox = (size = 2) => {
  const geometry = new BoxGeometry(size,size,size);
  const material = new MeshBasicMaterial({color: 'white'});
  return new Mesh(geometry, material);
};
