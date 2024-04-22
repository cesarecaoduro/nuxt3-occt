import { type OpenCascadeInstance } from "~/opencascade/occt";

export const useGlobalStore = defineStore('global', () => {
  // define state
  const occt = ref<OpenCascadeInstance>();

  // getters
 
  // actions

  return {
    occt
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
};
