<template>
    <canvas id="mountId" width="700" height="500" />
</template>

<script setup lang="ts">

const { initOBC } = await useOpenBIMComponents();
const canvas = computed(() => document.getElementById('mountId') as HTMLCanvasElement);

async function setupScene() {
  const {viewer, scene} = await initOBC('mountId');
  const { components } = storeToRefs(useGlobalStore());
  components.value = viewer
  console.log(scene);
}

onMounted(async () => {
  if (canvas.value) {
    await setupScene();
  }
});

</script>