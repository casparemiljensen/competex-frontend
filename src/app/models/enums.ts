export enum Status // Can be used for both competition and event.
{
    Pending,
    Active,
    Cancelled,
    Concluded
}

export enum MatchStatus
{
    Pending,
    Active,
    Cancelled,
    Concluded
}

export enum SurfaceType
{
    Unknown,
    NaturalGrass,
    ArtificialTurf,
    Clay,
    Dirt,
    Turf,
    PVC,
}

export enum ClubMemberRole
{
    Standard,
    Organizer
}

export enum EntityType
{
    Rabbit,
    Horse,
    None
}

export enum Level // Can be used for all types of participants and competitions.
{
    Intermediate,
    Beginner,
    Advanced,
    Professional
}

export enum PenaltyType
{
    Time,
    Distance,
    Points
}

export enum ScoreType
{
    Time,
    Set,
    Number,
    TimeAndPenalty
}

export enum ScoreMethod
{
    D1, // 2 Rounds
    C2, // Samlet tid
    None
}
export enum RoundType
{
    Base,
    Middle,
    Final,
}

export enum RoundStatus
{
    Future,
    Starting,
    Ongoing,
    Ended
}