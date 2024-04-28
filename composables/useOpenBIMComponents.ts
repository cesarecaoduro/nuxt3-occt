import * as OBC from "openbim-components";
import * as THREE from "three";

export async function useOpenBIMComponents() {
    
    async function initOBC(appId: string) {
        const {components} = storeToRefs(useGlobalStore());
        console.log('Starting Open BIM Components...');
        const viewer = new OBC.Components();
        const scene = new OBC.SimpleScene(viewer);
        viewer.scene = scene;
        scene.setup();
        
        const viewerContainer = document.getElementById(appId) as HTMLCanvasElement;
        const rendererComponent = new OBC.PostproductionRenderer(viewer, viewerContainer);
        const postproduction = rendererComponent.postproduction;
        viewer.renderer = rendererComponent;

        const cameraComponent = new OBC.SimpleCamera(viewer);
        viewer.camera = cameraComponent;

        const raycasterComponent = new OBC.SimpleRaycaster(viewer);
        viewer.raycaster = raycasterComponent;

        await viewer.init();

        postproduction.enabled = true;
        const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666));

        const highlighter = new OBC.FragmentHighlighter(viewer);
        await highlighter.setup();

        const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer);
        highlighter.events.select.onClear.add(() => {
            propertiesProcessor.cleanPropertiesList()
        });

        const mainToolbar = new OBC.Toolbar(viewer);
        mainToolbar.addChild(
            propertiesProcessor.uiElement.get("main"),
        );

        viewer.ui.addToolbar(mainToolbar);
        
        console.log('Loaded Open BIM Components!');

        components.value = viewer;

        return {viewer, scene};
    }

    return {
        initOBC
    }
}