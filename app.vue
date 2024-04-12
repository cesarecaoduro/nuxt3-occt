<template>
  <div v-if="loading">Loading OpenCascadeInstance...</div>
  <div v-else>
    <GeometryKernel :occt="occt"/>
  </div>
  <div>
    
  </div>
</template>

<script setup lang="ts">
import type { OpenCascadeInstance } from "./opencascade/occt";

const { InitiOC } = await useOpenCascade();
const occt = ref<OpenCascadeInstance | any>();
const alignment = ref<Alignment | any>();
const loading = ref(true);

async function LoadOC() {
  return await InitiOC();
}

onMounted(async () => {
  const ocLoader = await LoadOC();
  occt.value = ocLoader;
  const geometryUtils = new GeometryUtils(occt.value);


  loading.value = false;
});
</script>