
import opencascade, { type OpenCascadeInstance } from "../opencascade/occt";
import opencascadeWasm from "../opencascade/occt.wasm?url";

export async function useOpenCascade() {
    async function InitiOC() {

        const {occt} = storeToRefs(useGlobalStore())
        console.log('Loading OpenCascade.js...');
        const occtfromWasm = await opencascade({
            locateFile: () => opencascadeWasm,
        });

        occt.value = occtfromWasm;

        console.log('Loaded OpenCascade.js!');
    }

    return {
        InitiOC
    }
}