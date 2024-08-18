const express = require('express');
const connectDB = require('./Config/db');
const Card = require('./Config/Card')
const cors = require('cors')
require('dotenv').config();

const app = express();

connectDB()

app.use(express.json());

app.use(cors())

// const seedCategories = async () => {
//     const count = await Card.countDocuments(); // Check if any documents exist
//     if (count === 0) {
//         const defaultCategories = [
//             { title: "Branches", description: "Abstract Branches lets you manage, version, and document your designs in one place." },
//             { title: "Manage your account", description: "Configure your account settings, such as your email, profile details, and password." },
//             { title: "Manage organizations, teams, and projects", description: "Use Abstract organizations, teams, and projects to organize your people and your work." },
//             { title: "Manage billing", description: "Change subscriptions and payment details." },
//             { title: "Authenticate to Abstract", description: "Set up and configure SSO, SCIM, and Just-in-Time provisioning." },
//             { title: "Abstract support", description: "Get in touch with a human." }
//         ];
//         try {
//             await Card.insertMany(defaultCategories);
//             console.log('Default categories added successfully!');
//         } catch (error) {
//             console.error('Error adding default categories:', error);
//         }
//     }
// };

// // Run seed function
// seedCategories();

app.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

app.post('/create', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCard = new Card({ title, description });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
});


app.get('/cards/:title', async (req, res) => {
    try {
      const card = await Card.findOne({ title: req.params.title });
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
