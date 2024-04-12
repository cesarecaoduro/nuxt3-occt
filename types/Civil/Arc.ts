interface Arc extends EntityCivilHorizontal {
    CenterPoint: Point3,
    PI: Point3,
    PIStation?: number,
    ChordLength: number,
    Radius: number,
    EntityType: EntityType,
    SweepAngle: number,
    Clockwise: string,
    StartDirection? : number
}