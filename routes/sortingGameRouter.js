import {Router} from "express";
import SortingGame from "../schemas/SortingGame.js";
import Classroom from "../schemas/Classroom.js";
import User from "../schemas/User.js";
import userRouter from "./userRouter.js";
import classroomRouter from "./classroomRouter.js";
import Pet from "../schemas/Pet.js";

const sortingGameRouter = new Router()

sortingGameRouter.get('/', async (req, res) => {
    const sortinggames = await SortingGame.find({})
    res.status(200).json({
        items: sortinggames,
        _links: {
            self: {
                href: `${process.env.BASE_URL}sorting_game`
            },
            collection: {
                href: `${process.env.BASE_URL}sorting_game`
            }
        }
    })
})

sortingGameRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const game = await SortingGame.findById(id);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({message: `game met id: ${id} niet gevonden`});
        }
    } catch (err) {
        res.status(400).json({message: "Onjuiste ID"});
    }
})

sortingGameRouter.get('/user/:id', async (req, res) => {
    const userId = req.params.id

    try {
        const game = await SortingGame.findOne({ user_id: userId })

        if (game) {
            res.status(200).json(game)
        } else {
            res.status(404).json({ message: `Game save voor gebruiker met id: ${userId} niet gevonden` })
        }
    } catch (err) {
        res.status(400).json({ message: "Ongeldige gebruiker ID" })
    }
})


sortingGameRouter.patch('/:id/:operator', async(req, res) => {
    try {
        const {paper, food, plastic, rest, high_score, toyId} = req.body

        const existingGame = await SortingGame.findOne({ user_id: req.params.id });

        if (!existingGame) {
            return res.status(404).json({ message: 'Geen game save is gevonden voor deze gebruiker' });
        }

        function applyOperator(current, change, label) {
            if (req.params.operator === 'plus' ) {
                return current + change
            } else if(current >= change) {
                return current - change
            } else {
                throw new Error(`Niet genoeg ${label} om ${req.params.operator === 'min' ? 'te dit te maken' : 'bij te werken'}.`)
            }
        }

        if (req.params.operator !== 'plus' && toyId) {
            const pet = await Pet.findById(toyId)
            if (!pet) {
                return res.status(404).json({ message: "Speelgoed niet gevonden" })
            }

            existingGame.paper = applyOperator(existingGame.paper, pet.paper || 0, "papier")
            existingGame.food = applyOperator(existingGame.food, pet.food || 0, "gft")
            existingGame.plastic = applyOperator(existingGame.plastic, pet.plastic || 0, "plastic")
            existingGame.rest = applyOperator(existingGame.rest, pet.rest || 0, "restafval")


            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json({ message: "Gebruiker niet gevonden" })
            }

            if (!user.unlockedPets.includes(pet._id)) {
                user.unlockedPets.push(pet._id)
                await user.save()
            }

        }

        if (req.params.operator === 'plus') {
            if (paper !== undefined) existingGame.paper = applyOperator(existingGame.paper, paper, "papier")
            if (food !== undefined) existingGame.food = applyOperator(existingGame.food, food, "gft")
            if (plastic !== undefined) existingGame.plastic = applyOperator(existingGame.plastic, plastic, "plastic")
            if (rest !== undefined) existingGame.rest = applyOperator(existingGame.rest, rest, "restafval")
            if (high_score !== undefined)  existingGame.high_score = high_score
        }

        await existingGame.save()
        res.status(200).json(existingGame)
    } catch(err) {
        console.error("Speelgoed error:", err.message)
        res.status(400).json({ error: err.message })
    }
})
sortingGameRouter.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(204).send();
});

sortingGameRouter.options('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

sortingGameRouter.options('/:id/:operator', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
    res.status(204).send();
});


export default sortingGameRouter