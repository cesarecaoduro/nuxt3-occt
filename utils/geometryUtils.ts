import type { OpenCascadeInstance, TopoDS_Edge, TopoDS_Wire, gp_Pnt } from "~/opencascade/aecom-occt";
import EntityType from "~/types/Core/Enums/EntityType";

export class GeometryUtils {
    public occt: OpenCascadeInstance;

    constructor(occt: OpenCascadeInstance) {
        this.occt = occt;
    }

    ToGpPnt(point: Point3): gp_Pnt {
        return new this.occt.gp_Pnt_3(point.x, point.y, point.z);
    }

    BuildTangentEdge(occt: OpenCascadeInstance, entity: Tangent): TopoDS_Edge {
        const sp: gp_Pnt = this.ToGpPnt(entity.StartPoint);
        const ep: gp_Pnt = this.ToGpPnt(entity.EndPoint);

        const edge = new occt.BRepBuilderAPI_MakeEdge_3(sp, ep);
        console.log(edge.IsDone());
        return edge.Edge();
    }

    BuildArcEdge(occt: OpenCascadeInstance, entity: Arc): TopoDS_Edge {
        const sp: gp_Pnt = this.ToGpPnt(entity.StartPoint);
        const mp: gp_Pnt = this.ToGpPnt(entity.MidPoint);
        const ep: gp_Pnt = this.ToGpPnt(entity.EndPoint);

        var arc = new occt.GC_MakeArcOfCircle_4(sp, mp, ep);
        console.log(arc.IsDone());
        if (arc.IsDone()){
            var edge = new occt.BRepBuilderAPI_MakeEdge_24(arc.Value()).Edge()
            return edge;
        }
        return new occt.TopoDS_Edge();
    }

    MakeWireFromEdges(curves : TopoDS_Edge[]) : TopoDS_Wire{
        var wireBuilder = new this.occt.BRepBuilderAPI_MakeWire();
        for (let index = 0; index < curves.length; index++) {
            const element = curves[index];
            wireBuilder.Add_1(element);
        }
        return wireBuilder.Wire();
    }
}


