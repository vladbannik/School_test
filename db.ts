import { Sex, Teacher } from "./models";
import Express from 'express';
const pgp = require("pg-promise")(/*options*/);

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'School',
    user: 'postgres',
    password: '12345'
};
const db = pgp(cn);

export function addTeacher(req: Express.Request, res: Express.Response) {
    let teacher: Teacher = {
        name: req.body.name.toLocaleLowerCase(),
        surname: req.body.surname.toLocaleLowerCase(),
        age: parseInt(req.body.age),
        sex: req.body.sex,
        yearsOfExperience: parseInt(req.body.yearsofexperience),
        workedInUniversities: req.body.workedinuniversities,
        canTeachSubjects: req.body.canteachsubjects
    }
    db.none('INSERT INTO public.teacher (name, surname, age, sex, yearsofexperience, workedinuniversities, canteachsubjects) VALUES($1, $2, $3, $4, $5, $6, $7)',
        [teacher.name, teacher.surname, teacher.age, teacher.sex, teacher.yearsOfExperience, teacher.workedInUniversities, teacher.canTeachSubjects])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success'
                });
        })
        .catch((err: any) => {
            res.status(500).json({ error: err })
        });
}

export function getAllTeacher(req: Express.Request, res: Express.Response) {
    db.any("SELECT * FROM public.teacher ORDER BY id ASC ")
        .then((data: any) => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch((err: any) => {
            res.status(500).json({ error: err })
        });
}

export function getTeacher(req: Express.Request, res: Express.Response) {///фильтр в виде 'age>=17and sex='male'' итд... 
    db.any(`SELECT * FROM public.teacher where ${req.params.queryFilter}`)
        .then((data: any) => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch((err: any) => {
            res.status(500).json({ error: err })
        });
}

export function updateTeacher(req: Express.Request, res: Express.Response) {
    let teacher: Teacher = {
        name: req.body.name.toLocaleLowerCase(),
        surname: req.body.surname.toLocaleLowerCase(),
        age: parseInt(req.body.age),
        sex: req.body.sex,
        yearsOfExperience: parseInt(req.body.yearsofexperience),
        workedInUniversities: req.body.workedinuniversities,
        canTeachSubjects: req.body.canteachsubjects
    }
    db.none("update public.teacher set name=$1, surname=$2, age=$3,sex=$4, yearsofexperience=$5, workedinuniversities=$6, canteachsubjects=$7 where id=$8",
        [teacher.name, teacher.surname, teacher.age, teacher.sex, teacher.yearsOfExperience, teacher.workedInUniversities, teacher.canTeachSubjects, parseInt(req.params.id)])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success'
                });
        })
        .catch((err: any) => {
            res.status(500).json({ error: err })
        });
}

export function removeTeacher(req: Express.Request, res: Express.Response) {
    db.result("delete from public.teacher where id=$1", [parseInt(req.params.id)])
        .then((result: any) => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount}`
                });
        })
        .catch((err: any) => {
            res.status(500).json({ error: err })
        });
}

export function getTargetMathTeachers() {
    db.any("select t.id,t.name,t.surname,t.age,t.sex,t.yearsofexperience,t.workedinuniversities,t.canteachsubjects from teacher t" +
        " join lesson l on l.teacherid=t.id join classroom c on c.id=l.classroomid, generate_series(startdate, finishdate, interval '7 days') as startDataTime" +
        " where t.canteachsubjects ILIKE '%math%' and t.yearsofexperience>=10 and c.location='100' " +
        "and EXTRACT(isodow  FROM startDataTime)=4 and startDataTime::time>='8:30'::time  and (startDataTime+l.lessonlength)::time<='14:30'::time group by t.id ")
        .then((data: any) => {
            console.log(data)
        })
        .catch((err: any) => {
            console.log(err)
        });
}