<script setup lang="ts">
import { BoxGeometry, BufferGeometry, Float32BufferAttribute, MeshLambertMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, WebGLRenderer } from "three";
import { color, materialAlphaTest } from "three/examples/jsm/nodes/Nodes.js";
import type { OpenCascadeInstance } from "~/opencascade/occt";
import { Pane } from 'tweakpane';

let _scene: Scene;
let _camera: PerspectiveCamera;
let _renderer: WebGLRenderer;
let _renderLoopId: number;

// const store = useGlobalStore();
const { occt, threeScene } = storeToRefs(useGlobalStore());
const oc = occt.value as OpenCascadeInstance;

const { initThree, addPoint, addSegment } = useThree();
const canvas = computed(() => document.getElementById('mountId') as HTMLCanvasElement);

const geometryUtils = new GeometryUtils(oc);

function testScene(): number {

  // define a point with OCC and draw using Threejs
  var pt1 = new oc.gp_Pnt_3(0, 0, 0);
  addPoint(_scene, pt1)

  var pt2 = new oc.gp_Pnt_3(10, 0, 0);
  addPoint(_scene, pt2)

  var segment = new oc.BRepBuilderAPI_MakeEdge_3(pt1, pt2);
  console.log(`Segment is done: ${segment.IsDone()}`);
  var edge1 = segment.Edge();
  addSegment(_scene, pt1, pt2)


  var pt3 = new oc.gp_Pnt_3(10, 0, 0);
  var pt4 = new oc.gp_Pnt_3(50, 25, 0);
  var pt5 = new oc.gp_Pnt_3(50, 50, 0);

  var arc = new oc.GC_MakeArcOfCircle_4(pt3, pt4, pt5);
  console.log(`Arc is done: ${arc.IsDone()}`);
  var geomCurve = new oc.Handle_Geom_Curve_2(arc.Value().get())
  var edge2 = new oc.BRepBuilderAPI_MakeEdge_24(geomCurve).Edge();

  var wireBuilder = new oc.BRepBuilderAPI_MakeWire_1();
  wireBuilder.Add_1(edge1);
  wireBuilder.Add_1(edge2);

  console.log(`Wire is done: ${wireBuilder.IsDone()}`);

  var adaptor = new oc.BRepAdaptor_CompCurve_2(wireBuilder.Wire(), false);
  var length = oc.GCPnts_AbscissaPoint.Length_1(adaptor);
  console.log(`Curve length: ${length}`);
  return length;
}

function renderLoop() {
  // will keep running for every frame since
  // we keep recreate a new requestAnimationFrame at the end of the function.
  _renderer.render(_scene, _camera);
  _renderLoopId = requestAnimationFrame(renderLoop);
}

function setupScene() {
  //initialize
  const { scene, camera, renderer } = initThree('mountId');
  _scene = scene;
  _camera = camera;
  _renderer = renderer;

  var l = testScene();

  // start the renderLoop
  _renderLoopId = requestAnimationFrame(renderLoop);

  const PARAMS = {
    length: l/2,
  };

  const pane = new Pane();
  pane.title = 'Inputs';
  pane.addBinding(PARAMS, 'length', {
    min: 0,
    max: l
  });

}

onMounted(() => {
  if (canvas.value) {
    setupScene();
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(_renderLoopId);
  //   cleanUpThree(_scene, _renderer);
});

</script>

<template>
  <canvas id="mountId" />
</template>
