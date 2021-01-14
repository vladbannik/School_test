export interface Teacher {
    id?: number,
    name: string,
    surname: string,
    age?: number,
    sex?: Sex,
    yearsOfExperience: number,
    workedInUniversities: boolean,
    canTeachSubjects: Subject | Subject[]
}
export interface Lesson {
    id: number,
    name: string,
    teacherid: number,
    subject: Subject,
    classRoomId: Classroom,
    startDate: string,
    finishDate: string,
    lessonLength: string
}
export interface Classroom {
    id: number,
    location: string
}
export const enum Subject {
    Biology = "Biology",
    Math = "Math",
    Physics = "Physics",
    Chemistry = "Chemistry"
}
/*export enum Subject {
    Biology,
    Math,
    Physics,
    Chemistry
}*/
export const enum Sex {
    Male = "Male",
    Female = "Female",
    Any = "Any"
}