<template>
  <VNavigationDrawer>
    <VListItem title="Geometry Kernel" subtitle="Powered by OpenCascade" />
    <VDivider></VDivider>
  </VNavigationDrawer>
  <VNavigationDrawer class="pt-2 bg-transparent border-0" rail permanent >
    <VRow justify="center" align="center">
      <VCol cols="auto">
        <VBtn density="compact" icon="mdi-plus"></VBtn>
      </VCol>
    </VRow>
  </VNavigationDrawer>
  <GeometryKernel />
</template>

<script lang="ts" setup>
import { VRButton } from "three/examples/jsm/Addons.js";

const drawer = ref(true);
</script>

<style>
</style>