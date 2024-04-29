import { client } from 'process';
import {
  AmbientLight,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  GridHelper,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer
}
  from 'three';

import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { gp_Pnt } from '~/opencascade/occt';


export const useThree = () => {

  const {threeScene} = storeToRefs(useGlobalStore())
  var scene: Scene = threeScene.value as Scene;
  var canvas: HTMLCanvasElement;

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const _pointMaterial = new PointsMaterial({ color: 0xFF0000, size: 0.05 });

  function initThree(canvasId: string) {

    window.addEventListener('resize', () => {
      // // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    canvas = document.getElementById(canvasId)! as HTMLCanvasElement;
  
    scene = new Scene();
    scene.background = new Color('#666');

    const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
    scene.add(camera);
    camera.position.set(30, 30, 30);
    camera.lookAt(0, 0, 0);

    const gridHelper = new GridHelper(100, 100);
    scene.add(gridHelper);

    const ambientLight = new AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, canvas);

    threeScene.value = scene;

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(sizes.width, sizes.height)

    return { scene, camera, renderer };
  }


  function addPoint(scene: Scene, coordinates: gp_Pnt, color: number = 0xFF0000, size : number = 0.1){
    const geometry = new BufferGeometry();
    const vertex = [coordinates.X(), coordinates.Z(), coordinates.Y()]
    geometry.setAttribute('position', new Float32BufferAttribute(vertex, 3));
    const pointMaterial = new PointsMaterial({ color, size });
    const point = new Points(geometry, pointMaterial);
    scene.add(point);
  }

  function addSegment(scene: Scene, startPoint: gp_Pnt, endPoint: gp_Pnt, color: number  = 0x00FF00, linewidth = 1){
    const sp = new Vector3(startPoint.X(), startPoint.Z(), startPoint.Y());
    const ep = new Vector3(endPoint.X(), endPoint.Z(), endPoint.Y());
    const lineMaterial = new LineBasicMaterial( { color,  linewidth} );
    const points = [sp, ep];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, lineMaterial);
    scene.add(line);
  }

  return {
    initThree,
    addPoint,
    addSegment
  }
}
