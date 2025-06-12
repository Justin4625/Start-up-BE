import Classroom from "../schemas/Classroom.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";

const classroomRouter = new Router();

classroomRouter.get('/', async (req, res) => {
    const classrooms = await Classroom.find({})
    res.status(200).json({
        items: classrooms,
        _links: {
            self: {
                href: `${process.env.BASE_URL}classroom`
            },
            collection: {
                href: `${process.env.BASE_URL}classroom`
            }
        }
    })
})

classroomRouter.post('/', async (req, res) => {
    try {
        const { naam, leraar_id} = req.body;
        if (!naam || !leraar_id) {
            return res.status(400).json({message: "Een of meerdere velden zijn niet goed ingevult"});
        }

        async function generateUniqueClassCode() {
            while (true) {
                const klassencode = faker.string.alphanumeric(6).toUpperCase()

                const existing = await Classroom.findOne({ classroom_code: klassencode })
                if (!existing) {
                    return klassencode
                }
            }
        }

        const klassencode = await generateUniqueClassCode();

        const classroom = new Classroom({
            classroom_code: klassencode,
            name: naam,
            teacher_id: leraar_id,
        });

        await classroom.save()
        res.status(201).json(classroom)
    } catch(err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
});

classroomRouter.options('/', async (req, res) => {
    res.set('Allow', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(204).send();
});

classroomRouter.options('/:id', async (req, res) => {
    res.set('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default classroomRouter;
