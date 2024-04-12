<script setup lang="ts">
import type { OpenCascadeInstance } from "~/opencascade/occt";

const props = defineProps({
  occt: {
    type: Object as PropType<OpenCascadeInstance>,
    required: true,
  }
});

const oc = props.occt as OpenCascadeInstance;
const geometryUtils = new GeometryUtils(oc);

var pt1 = new oc.gp_Pnt_3(0,0,0);
var pt2 = new oc.gp_Pnt_3(10,0,0);

var segment = new oc.BRepBuilderAPI_MakeEdge_3(pt1, pt2);
console.log(`Segment is done: ${segment.IsDone()}`);
var edge1 = segment.Edge();

var pt3 = new oc.gp_Pnt_3(10,0,0);
var pt4 = new oc.gp_Pnt_3(50,25,0);
var pt5 = new oc.gp_Pnt_3(50,50,0);

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


</script>

<template>
  <h1>Welcome to OpenCascade Kernel</h1>
</template>
