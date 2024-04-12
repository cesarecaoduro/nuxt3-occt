
import opencascade, { type OpenCascadeInstance } from "../opencascade/occt";
import opencascadeWasm from "../opencascade/occt.wasm?url";

export async function useOpenCascade() {
    async function InitiOC(): Promise<OpenCascadeInstance> {
        console.log('Loading OpenCascade.js...');
        const occt = await opencascade({
            locateFile: () => opencascadeWasm,
        });
        console.log('Loaded OpenCascade.js!');
        return occt;
    }

    return {
        InitiOC
    }
}