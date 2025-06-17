import {Router} from "express";
import SortingGame from "../schemas/SortingGame.js";
import Classroom from "../schemas/Classroom.js";
import User from "../schemas/User.js";
import userRouter from "./userRouter.js";
import classroomRouter from "./classroomRouter.js";

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

sortingGameRouter.patch('/:id/:operator', async(req, res) => {
    try {
        const {paper, food, plastic, rest, high_score} = req.body

        const existingGame = await SortingGame.findOne({ user_id: req.params.id });

        if (!existingGame) {
            return res.status(404).json({ message: 'Geen game save is gevonden voor deze gebruiker' });
        }

        function applyOperator(current, change) {
            if (req.params.operator === 'plus' ) {
                return current + change
            } else if(current >= change) {
                return current - change
            } else {
                throw new Error("Je hebt niet genoeg materialen of er is iets fout gegaan tijdens het aanmaken!")
            }
        }

        if (paper !== undefined) existingGame.paper = applyOperator(existingGame.paper, paper)
        if (food !== undefined) existingGame.food = applyOperator(existingGame.food, food)
        if (plastic !== undefined) existingGame.plastic = applyOperator(existingGame.plastic, plastic)
        if (rest !== undefined) existingGame.rest = applyOperator(existingGame.rest, rest)
        if (high_score !== undefined)  existingGame.high_score = high_score

        await existingGame.save()
        res.status(200).json(existingGame)
    } catch(err) {
        console.error(err)
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