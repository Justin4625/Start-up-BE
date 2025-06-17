import Classroom from "../schemas/Classroom.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";
import SortingGame from "../schemas/SortingGame.js";
import sortingGameRouter from "./sortingGameRouter.js";
import CraftingGame from "../schemas/CraftingGame.js";

// const craftingGameRouter = new Router();
//
// craftingGameRouter.get('/', async (req, res) => {
//     const craftingGames = await CraftingGame.find({})
//     res.status(200).json({
//         items: craftingGames,
//         _links: {
//             self: {
//                 href: `${process.env.BASE_URL}craftinggame`
//             },
//             collection: {
//                 href: `${process.env.BASE_URL}craftinggame`
//             }
//         }
//     })
// })
//
// craftingGameRouter.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const craftinggame = await CraftingGame.findById(id);
//         if (craftinggame) {
//             res.status(200).json(craftinggame);
//         } else {
//             res.status(404).json({message: `Game met id: ${id} niet gevonden`});
//         }
//     } catch (err) {
//         res.status(400).json({message: "Onjuiste ID"});
//     }
// })
//
// // craftingGameRouter.post('/', async (req, res) => {
// //     try {
// //         const { naam, leraar_id} = req.body;
// //         if (!naam || !leraar_id) {
// //             return res.status(400).json({message: "Een of meerdere velden zijn niet goed ingevult"});
// //         }
// //
// //         const craftinggame = new CraftingGame({
// //             classroom_code: klassencode,
// //             name: naam,
// //             teacher_id: leraar_id,
// //         });
// //
// //         await craftinggame.save()
// //         res.status(201).json(craftinggame)
// //     } catch(err) {
// //         console.error(err)
// //         res.status(400).json({ error: err.message })
// //     }
// // });
//
// craftingGameRouter.options('/', async (req, res) => {
//     res.set('Allow', 'GET, POST, OPTIONS');
//     res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.status(204).send();
// });
//
// craftingGameRouter.options('/:id', async (req, res) => {
//     res.set('Allow', 'GET, PUT, DELETE, OPTIONS');
//     res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
//     res.status(204).send();
// });
//
// export default craftingGameRouter;

