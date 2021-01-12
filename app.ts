import Express from 'express';
import { Subject, Teacher, Lesson, Sex } from './models';
import { getAllTeacher, getTeacher, updateTeacher, removeTeacher, addTeacher } from './db';
const app: Express.Application = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.get('/teacher', getAllTeacher)
app.get('/teacher/:queryFilter', getTeacher)
app.post('/addTeacher', addTeacher)
app.patch('/updateTeacher/:id', updateTeacher)
app.delete('/removeTeacher/:id', removeTeacher)

app.listen(2021, () => {
    console.log("Server is running")
})
