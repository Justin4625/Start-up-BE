import Classroom from "../schemas/Classroom.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";
import Avatar from "../schemas/Avatar.js";

const avatarRouter = new Router();

avatarRouter.get('/', async (req, res) => {
    const avatars = await Avatar.find({})
    res.status(200).json({
        items: avatars,
        _links: {
            self: {
                href: `${process.env.BASE_URL}avatar`
            },
            collection: {
                href: `${process.env.BASE_URL}avatar`
            }
        }
    })
})

avatarRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const avatar = await Avatar.findById(id);
        if (avatar) {
            res.status(200).json(avatar);
        } else {
            res.status(404).json({message: `avatar met id: ${id} niet gevonden`});
        }
    } catch (err) {
        res.status(400).json({message: "Onjuiste ID"});
    }
})

avatarRouter.post('/', async (req, res) => {
    try {
        const { image_url} = req.body;
        if (!image_url) {
            return res.status(400).json({message: "Een of meerdere velden zijn niet goed ingevult"});
        }

        const avatar = new Avatar({
            image_url: image_url
        });

        await avatar.save()
        res.status(201).json(avatar)
    } catch(err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
});

avatarRouter.options('/', async (req, res) => {
    res.set('Allow', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(204).send();
});

avatarRouter.options('/:id', async (req, res) => {
    res.set('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default avatarRouter;