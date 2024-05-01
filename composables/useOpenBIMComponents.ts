import * as OBC from "openbim-components";
import * as THREE from "three";

export async function useOpenBIMComponents() {
    const {components} = storeToRefs(useGlobalStore());
    
    async function initOBC(appId: string) {        
        const container = document.getElementById(appId)! as HTMLCanvasElement;
        console.log(`Container initialized with ID: ${container.id}`);
        
        console.log('Starting Open BIM Components...');
        const cmpts = new OBC.Components();
        const scene = new OBC.SimpleScene(cmpts);
        cmpts.scene = scene;
        
        const viewerContainer = document.getElementById(appId) as HTMLDivElement;
        const rendererComponent = new OBC.PostproductionRenderer(cmpts, viewerContainer);
        const postproduction = rendererComponent.postproduction;
        cmpts.renderer = rendererComponent;
        
        const cameraComponent = new OBC.SimpleCamera(cmpts);
        cmpts.camera = cameraComponent;
        
        const raycasterComponent = new OBC.SimpleRaycaster(cmpts);
        cmpts.raycaster = raycasterComponent;
        
        await cmpts.init()
        await scene.setup();
        
        postproduction.enabled = true
        const grid = new OBC.SimpleGrid(cmpts, new THREE.Color(0x666666))
        postproduction.customEffects.excludedMeshes.push(grid.get())

        console.log('Loaded Open BIM Components!');

        components.value = cmpts;
    }

    return {
        initOBC
    }
}