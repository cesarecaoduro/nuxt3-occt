interface Alignment {
    Name: string,
    Description: string,
    AlignmentType: AlignmentType,
    Entities: EntityCivil[],
    Stations: number[],
    StartStation: number,
    EndStation: number,
    Length: number,
    Profiles: Profile[]
}

