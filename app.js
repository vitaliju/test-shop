const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data storage
let shops = [];
let shopItems = [];

// Utility function to find a shop by ID
const findShopById = (id) => shops.find((shop) => shop.id === id);

// Utility function to find a shop item by ID
const findShopItemById = (id) => shopItems.find((item) => item.id === id);

// CRUD operations for Shops

// Create a new shop
app.post('/shops', (req, res) => {
    const newShop = {
        id: shops.length + 1,
        name: req.body.name,
        location: req.body.location
    };
    shops.push(newShop);
    res.status(201).json(newShop);
});

// Get all shops
app.get('/shops', (req, res) => {
    res.json(shops);
});

// Get a single shop by ID
app.get('/shops/:id', (req, res) => {
    const shop = findShopById(parseInt(req.params.id));
    if (shop) {
        res.json(shop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Update a shop by ID
app.put('/shops/:id', (req, res) => {
    const shop = findShopById(parseInt(req.params.id));
    if (shop) {
        shop.name = req.body.name || shop.name;
        shop.location = req.body.location || shop.location;
        res.json(shop);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Delete a shop by ID
app.delete('/shops/:id', (req, res) => {
    const shopIndex = shops.findIndex((shop) => shop.id === parseInt(req.params.id));
    if (shopIndex !== -1) {
        shops.splice(shopIndex, 1);
        res.json({ message: 'Shop deleted' });
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// CRUD operations for Shop Items

// Create a new shop item
app.post('/shopItems', (req, res) => {
    const shop = findShopById(req.body.shopId);
    if (shop) {
        const newItem = {
            id: shopItems.length + 1,
            name: req.body.name,
            price: req.body.price,
            shopId: req.body.shopId
        };
        shopItems.push(newItem);
        res.status(201).json(newItem);
    } else {
        res.status(404).json({ message: 'Shop not found' });
    }
});

// Get all shop items
app.get('/shopItems', (req, res) => {
    res.json(shopItems);
});

// Get a single shop item by ID
app.get('/shopItems/:id', (req, res) => {
    const item = findShopItemById(parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Shop Item not found' });
    }
});

// Update a shop item by ID
app.put('/shopItems/:id', (req, res) => {
    const item = findShopItemById(parseInt(req.params.id));
    if (item) {
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Shop Item not found' });
    }
});

// Delete a shop item by ID
app.delete('/shopItems/:id', (req, res) => {
    const itemIndex = shopItems.findIndex((item) => item.id === parseInt(req.params.id));
    if (itemIndex !== -1) {
        shopItems.splice(itemIndex, 1);
        res.json({ message: 'Shop Item deleted' });
    } else {
        res.status(404).json({ message: 'Shop Item not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
