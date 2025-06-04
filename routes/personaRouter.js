import Persona from "../schemas/Persona.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";

const personasRouter = new Router();

personasRouter.get('/', async (req, res) => {
    const personas = await Persona.find({});
    res.status(200).json({
        items: personas,
        _links: {
            self: {
                href: `${process.env.BASE_URL}personas`
            },
            collection: {
                href: `${process.env.BASE_URL}personas`
            }
        }
    });
});

personasRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await Persona.findById(id);
        if (persona) {
            res.status(200).json(persona);
        } else {
            res.status(404).json({message: `Persona ${id} not found`});
        }
    } catch (error) {
        res.status(400).json({message: "Invalid persona ID"});
    }
});

personasRouter.post('/', async (req, res, next) => {
    const {name, arcana, level, price, METHOD, count} = req.body;

    if (METHOD === 'SEED') {
        const count = parseInt(req.body.count, 10);
        if (isNaN(count) || count <= 0) {
            return res.status(400).json({message: "Invalid count"});
        }
        try {
            for (let i = 0; i < count; i++) {
                let persona = new Persona({
                    name: faker.person.fullName(),
                    arcana: faker.lorem.text(),
                    level: faker.number.int(),
                    price: faker.number.int()
                });
                await persona.save();
            }
            res.status(201).json({message: `${count} personas seeded`});
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    } else {
        next();
    }
});

personasRouter.post('/', async (req, res) => {
    const {name, arcana, level, price} = req.body;
    if (!name || !arcana || !level || !price) {
        return res.status(400).json({message: "Missing required fields: name, arcana, level, price"});
    }
    let persona = new Persona({name, arcana, level, price});
    await persona.save();
    res.status(201).json(persona);
});

personasRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {name, arcana, level, price} = req.body;
    try {
        let persona = await Persona.findById(id);
        if (persona) {
            if (!name || !arcana || !level || !price) {
                return res.status(400).json({message: "Missing required fields: name, arcana, level, price"});
            }
            persona.name = name || persona.name;
            persona.arcana = arcana || persona.arcana;
            persona.level = level || persona.level;
            persona.price = price || persona.price;
            await persona.save();
            res.status(200).json({message: `Persona ${id} updated`});
        } else {
            res.status(404).json({message: `Persona ${id} not found`});
        }
    } catch (error) {
        res.status(400).json({message: "Invalid persona ID"});
    }
});

personasRouter.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    try {
        let persona = await Persona.findById(id);
        if (persona) {
            Object.keys(updateData).forEach(key => {
                if (key in persona) {
                    persona[key] = updateData[key];
                }
            });
            await persona.save();
            res.status(200).json({message: `Persona ${id} updated`});
        } else {
            res.status(404).json({message: `Persona ${id} not found`});
        }
    } catch (error) {
        res.status(400).json({message: "Invalid persona ID"});
    }
});

personasRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Persona.deleteOne({_id: id});
        if (result.deletedCount > 0) {
            res.status(204).json({message: `Persona ${id} deleted`});
        } else {
            res.status(404).json({message: `Persona ${id} not found`});
        }
    } catch (error) {
        res.status(400).json({message: "Invalid persona ID"});
    }
});

personasRouter.options('/', async (req, res) => {
    res.set('Allow', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(204).send();
});

personasRouter.options('/:id', async (req, res) => {
    res.set('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default personasRouter;
