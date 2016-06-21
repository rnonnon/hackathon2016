interface Trip {
    id:number;
    name:string;
    startDate:TripDate;
    endDate:TripDate;
    started:boolean;
    created_by:number;
    locations:Array<Location>;
    ratings:Rating;
    comments:Array<Comment>;
    tags:Array<Tag>;
    description:string;
}

interface User {
    additional_information:string
    firstname:string;
    id:number;
}

interface TripDate {
    date:Date;
}

interface Location {
    id:number;
    name:string;
    description:string;
    latitude:number;
    longitude:number,
    skipped:boolean;
    visited:boolean;
}
interface Rating {
    rating:number;
    rated_by:number;
}
interface Comment {
    id:number;
    commented_by:string;
    comment:string;
}
interface Tag {
    id:number;
    description:string;
}