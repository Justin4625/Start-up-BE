import {Router} from "express";
import Pet from "../schemas/Pet.js";


const petRouter = new Router();

petRouter.get('/', async (req, res) => {
    const pets = await Pet.find({})
    res.status(200).json({
        items: pets,
        _links: {
            self: {
                href: `${process.env.BASE_URL}pet`
            },
            collection: {
                href: `${process.env.BASE_URL}pet`
            }
        }
    })
})

petRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const pet = await Pet.findById(id);
        if (pet) {
            res.status(200).json(pet);
        } else {
            res.status(404).json({message: `Partner met id: ${id} niet gevonden`});
        }
    } catch (err) {
        res.status(400).json({message: "Onjuiste ID"});
    }
})

petRouter.post('/', async (req, res) => {
    try {
        const { name, image_url, paper, food, plastic, rest} = req.body;
        if ([name, image_url, paper, food, plastic, rest].some(value => value === undefined)) {
            return res.status(400).json({ message: "Een of meerdere velden zijn niet goed ingevuld" });
        }

        const pet = new Pet({
            name: name,
            image_url: image_url,
            paper: paper,
            food: food,
            plastic: plastic,
            rest: rest
        });

        await pet.save()
        res.status(201).json(pet)
    } catch(err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
});

petRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ message: "Partner niet gevonden" });
        }

        await pet.deleteOne();
        res.json({ message: "Partner verwijderd" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


petRouter.options('/', async (req, res) => {
    res.set('Allow', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(204).send();
});

petRouter.options('/:id', async (req, res) => {
    res.set('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default petRouter;