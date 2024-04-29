<template>
    <canvas id="obcMountId" />
</template>

<script setup lang="ts">

const { initOBC } = await useOpenBIMComponents();
const canvas = computed(() => document.getElementById('obcMountId') as HTMLCanvasElement);

async function setupScene() {
  const { components } = storeToRefs(useGlobalStore());
  await initOBC(canvas.value.id);

}

onMounted(async () => {
  if (canvas.value) {
    await setupScene();
  }
});

</script>
