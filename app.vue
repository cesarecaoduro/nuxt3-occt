<template>
  <div v-if="loading">Loading OpenCascadeInstance...</div>
  <div v-else>
    <OBCViewer />
    <!-- <MonacoEditor id='layoutContainer' v-model="value" lang="typescript"/> -->
    <!-- <Layout /> -->
    <!-- <GeometryKernel /> -->
  </div>
</template>

<script setup lang="ts">
// Initialize OpenCascade Kernel
const { InitiOC } = await useOpenCascade();
const loading = ref(true);
const value = ref('')

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

#obcMountId, #layoutContainer {
  top: 0;
  left: 0;
  outline: none;
  height: 100vh;
  background-color: aqua;
}
</style>