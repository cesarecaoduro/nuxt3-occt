interface Spiral extends EntityCivilHorizontal {
    PI: Point3,
    PIStation: number,
    RadiusStart: number | string,
    RadiusEnd: number | string,
    SpiralDefinition: string,
    SpiralDirection: string,
    PiAngle: number,
    EntityType: EntityType,
    SweepAngle?: number
    StartDirection? : number
}