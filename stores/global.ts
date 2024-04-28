import { Components } from "openbim-components";
import { Scene } from "three";
import { type OpenCascadeInstance } from "~/opencascade/occt";

export const useGlobalStore = defineStore('global', () => {
  // define state
  const occt = ref<OpenCascadeInstance>();
  const threeScene = ref<Scene>();
  const components = ref<Components>();

  // getters
 
  // actions

  return {
    occt, threeScene, components
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
};
