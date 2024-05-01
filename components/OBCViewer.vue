<template>
  <div id="obcMountId">
  </div>
</template>

<script setup lang="ts">

const { initOBC } = await useOpenBIMComponents();
const container = computed(() => document.getElementById('obcMountId') as HTMLDivElement);

async function setupScene() {
  const { components } = storeToRefs(useGlobalStore());
  await initOBC(container.value.id);

}

onMounted(async () => {
  // await nextTick();
  if (container.value) {
    await setupScene();
  }
});

</script>
