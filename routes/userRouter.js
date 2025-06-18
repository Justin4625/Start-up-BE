import User from "../schemas/User.js";
import {Router} from "express";
import bcrypt from 'bcrypt';
import Classroom from "../schemas/Classroom.js";
import SortingGame from "../schemas/SortingGame.js";
import CraftingGame from "../schemas/CraftingGame.js";

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

userRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: `gebruiker met id: ${id} niet gevonden`});
        }
    } catch (err) {
        res.status(400).json({message: "Onjuiste ID"});
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const { voornaam, achternaam, wachtwoord, klassencode} = req.body;
        if (!voornaam || !achternaam || !wachtwoord || !klassencode) {
            return res.status(400).json({message: "Een of meerdere velden zijn niet goed ingevult"});
        }

        const existingClassroom = await Classroom.findOne({ classroom_code: klassencode.trim() })
        if (!existingClassroom) {
            return res.status(400).json({message: "Een onjuiste code is ingevoerd"});
        }


        const hashedPassword = await bcrypt.hash(wachtwoord, 10);

        const user = new User({
            first_name: voornaam,
            last_name: achternaam,
            password: hashedPassword,
            classroom_id: existingClassroom._id
        });

        await user.save()

        const sortingGame = new SortingGame({
            user_id: user._id,
        });

        await sortingGame.save();

        res.status(201).json({user, sortingGame})
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
                avatar: user.avatar,
                classroom_id: user.classroom_id,
                created_at: user.created_at
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

userRouter.post('/avatar', async (req, res) => {
    try {
        const { userId, avatar } = req.body;

        if (!userId || !avatar) {
            return res.status(400).json({ message: "userId en avatar zijn verplicht" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: avatar },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Gebruiker niet gevonden" });
        }

        res.status(200).json({ message: "Avatar succesvol opgeslagen", avatar: updatedUser.avatar });
    } catch (err) {
        console.error("Fout bij updaten avatar:", err);
        res.status(500).json({ error: err.message });
    }
});

userRouter.delete('/allusers', async (req, res) => {
    try {
        const result = await User.deleteMany({})
        res.json({ message: `${ result.deletedCount} gebruikers verwijdert` });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

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
