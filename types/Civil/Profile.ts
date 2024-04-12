interface Profile{
    Name: string,
    AlignmentId: string,
    Description : string,
    StartStation: number,
    EndStation: number,
    Length: number,
    Entities: EntityCivil[],
    PVIs: PVI[],
    Stations: number[],    
}