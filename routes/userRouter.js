import User from "../schemas/User.js";
import {Router} from "express";
import {faker} from "@faker-js/faker";
import bcrypt from 'bcrypt';

const userRouter = new Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        items: users,
        _links: {
            self: {
                href: `${process.env.BASE_URL}user`
            },
            collection: {
                href: `${process.env.BASE_URL}user`
            }
        }
    });
});
//
// personasRouter.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const persona = await User.findById(id);
//         if (persona) {
//             res.status(200).json(persona);
//         } else {
//             res.status(404).json({message: `Persona ${id} not found`});
//         }
//     } catch (error) {
//         res.status(400).json({message: "Invalid persona ID"});
//     }
// });
//
// personasRouter.post('/', async (req, res, next) => {
//     const {name, arcana, level, price, METHOD, count} = req.body;
//
//     if (METHOD === 'SEED') {
//         const count = parseInt(req.body.count, 10);
//         if (isNaN(count) || count <= 0) {
//             return res.status(400).json({message: "Invalid count"});
//         }
//         try {
//             for (let i = 0; i < count; i++) {
//                 let persona = new User({
//                     name: faker.person.fullName(),
//                     arcana: faker.lorem.text(),
//                     level: faker.number.int(),
//                     price: faker.number.int()
//                 });
//                 await persona.save();
//             }
//             res.status(201).json({message: `${count} personas seeded`});
//         } catch (error) {
//             res.status(500).json({message: "Internal server error"});
//         }
//     } else {
//         next();
//     }
// });
userRouter.post('/', async (req, res) => {
    try {
        const { voornaam, achternaam, wachtwoord, klassencode} = req.body;
        if (!voornaam || !achternaam || !wachtwoord || !klassencode) {
            return res.status(400).json({message: "Een of meerdere velden zijn niet goed ingevult"});
        }

        const hashedPassword = await bcrypt.hash(wachtwoord, 10);

        const user = new User({
            first_name: voornaam,
            last_name: achternaam,
            password: hashedPassword,
            class_code: klassencode
        });

        await user.save()
        res.status(201).json(user)
    } catch(err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { voornaam, wachtwoord } = req.body

        if (!voornaam || !wachtwoord) {
            return res.status(400).json({ message: "Voornaam en wachtwoord zijn verplicht" })
        }

        const user = await User.findOne({ first_name: voornaam })

        if (!user) {
            return res.status(404).json({ message: "Gebruiker niet gevonden" })
        }

        const passwordMatch = await bcrypt.compare(wachtwoord, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ message: "Wachtwoord onjuist" })
        }

        res.status(200).json({
            message: "Succesvol ingelogd",
            user: {
                id: user._id,
                voornaam: user.first_name,
                achternaam: user.last_name,
                classroom_id: user.classroom_id,
                created_at: user.created_at
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})


// personasRouter.put('/:id', async (req, res) => {
//     const id = req.params.id;
//     const {name, arcana, level, price} = req.body;
//     try {
//         let persona = await User.findById(id);
//         if (persona) {
//             if (!name || !arcana || !level || !price) {
//                 return res.status(400).json({message: "Missing required fields: name, arcana, level, price"});
//             }
//             persona.name = name || persona.name;
//             persona.arcana = arcana || persona.arcana;
//             persona.level = level || persona.level;
//             persona.price = price || persona.price;
//             await persona.save();
//             res.status(200).json({message: `Persona ${id} updated`});
//         } else {
//             res.status(404).json({message: `Persona ${id} not found`});
//         }
//     } catch (error) {
//         res.status(400).json({message: "Invalid persona ID"});
//     }
// });
//
// personasRouter.patch('/:id', async (req, res) => {
//     const id = req.params.id;
//     const updateData = req.body;
//
//     try {
//         let persona = await User.findById(id);
//         if (persona) {
//             Object.keys(updateData).forEach(key => {
//                 if (key in persona) {
//                     persona[key] = updateData[key];
//                 }
//             });
//             await persona.save();
//             res.status(200).json({message: `Persona ${id} updated`});
//         } else {
//             res.status(404).json({message: `Persona ${id} not found`});
//         }
//     } catch (error) {
//         res.status(400).json({message: "Invalid persona ID"});
//     }
// });
//
// personasRouter.delete('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const result = await User.deleteOne({_id: id});
//         if (result.deletedCount > 0) {
//             res.status(204).json({message: `Persona ${id} deleted`});
//         } else {
//             res.status(404).json({message: `Persona ${id} not found`});
//         }
//     } catch (error) {
//         res.status(400).json({message: "Invalid persona ID"});
//     }
// });

userRouter.options('/', async (req, res) => {
    res.set('Allow', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(204).send();
});

userRouter.options('/:id', async (req, res) => {
    res.set('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.status(204).send();
});

export default userRouter;
