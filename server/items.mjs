import { Router } from 'express';
const itemsRouter = Router();

// Get all items
itemsRouter.get('/', async (req, res) => {
    try {
        // TEST DATA
        const data = [];
        for (let i = 0; i < 80; i++) {
            data.push({ 
            name: ["name1212", "name25545", "name3754dwe63", "name7564", "name65"][Math.floor(Math.random() * 4)], 
            quantity: Math.floor(Math.random() * 100), 
            unit: ["bags", "cases", "boxes", "jugs", "containers"][Math.floor(Math.random() * 4)],
            });
        }

        // TODO: Grab items from DB
        
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
});

export default itemsRouter;