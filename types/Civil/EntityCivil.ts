interface EntityCivil {
    Id: string,
    StartPoint: Point3,
    EndPoint: Point3,
    MidPoint: Point3,
    EntityType: EntityType,
    StartStation: number,
    EndStation: number,
    MidStation: number,
    Length: number
    Prev: string,
    Next: string,
}