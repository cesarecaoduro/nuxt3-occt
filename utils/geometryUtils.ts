import type { OpenCascadeInstance } from "~/opencascade/aecom-occt";

export class GeometryUtils {
    public occt: OpenCascadeInstance;

    constructor(occt: OpenCascadeInstance) {
        this.occt = occt;
    }
}


