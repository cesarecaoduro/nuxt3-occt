<template>
  <div v-if="loading">Loading OpenCascadeInstance...</div>
  <div v-else>
    <GeometryKernel/>
    <!-- <OBCViewer /> -->
  </div>
</template>

<script setup lang="ts">
// Initialize OpenCascade Kernel
const { InitiOC } = await useOpenCascade();
const loading = ref(true);

async function LoadOC() {
  return await InitiOC();
}

onMounted(async () => {
  const ocLoader = await LoadOC();
  const { occt } = storeToRefs(useGlobalStore());
  const geometryUtils = new GeometryUtils(occt.value);
  loading.value = false;
});

</script>

<style>
html,
body {
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

#obcMountId {
  top: 0;
  left: 0;
  outline: none;
  height: 100vh;
  background-color: aqua;
}
</style>