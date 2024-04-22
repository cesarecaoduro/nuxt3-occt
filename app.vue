<template>
  <div v-if="loading">Loading OpenCascadeInstance...</div>
  <div v-else>
    <GeometryKernel/>
  </div>
  <div>
    
  </div>
</template>

<script setup lang="ts">

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