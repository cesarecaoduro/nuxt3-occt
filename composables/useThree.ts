import { client } from 'process';
import {
  AmbientLight,
  Color,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
}
  from 'three';

import { OrbitControls } from "three/examples/jsm/Addons.js";


export const useThree = () => {


  const {threeScene} = storeToRefs(useGlobalStore())
  var scene: Scene = threeScene.value as Scene;
  var canvas: HTMLCanvasElement;

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

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
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    const gridHelper = new GridHelper(10, 20);
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

  return {
    initThree
  }
}
