import { Scene } from "three";
import { type OpenCascadeInstance } from "~/opencascade/occt";

export const useGlobalStore = defineStore('global', () => {
  // define state
  const occt = ref<OpenCascadeInstance>();
  const threeScene = ref<Scene>();

  // getters
 
  // actions

  return {
    occt, threeScene
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
};
