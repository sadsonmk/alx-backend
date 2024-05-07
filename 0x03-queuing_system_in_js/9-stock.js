const express = require('express');
import kue from 'kue';
const redis = require('redis');

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }

];

function getItemById(id) {
  return listProducts.find((product) => product.id === id);
}

const app = express();
const PORT = 1245;
const client = redis.createClient();
const { promisify } = require('util');

const getAsync = promisify(client.get).bind(client);

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock, 10) : 0;
}

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = listProducts.find((prod) => prod.id === itemId);

  if (!product) {
    return res.status(404).json({"status":"Product not found"});
  }

 const currentQuantity = await getCurrentReservedStockById(itemId);

 res.json({
  itemId: product.id,
  itemName: product.name,
  price: product.price,
  initialAvailableQuantity: product.stock,
  currentQuantity,
 });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = listProducts.find((prod) => prod.id === itemId);

  if (!product) {
    return res.json({status: "Product not found"});
  }

  const currQnty = await getCurrentReservedStockById(itemId);
  if (currQnty === 0) {
    return res.json({status: "Not enough stock available", itemId});
  }

  reserveStockById(itemId, currQnty - 1);
  res.json({ status: 'Reservation confirmed', itemId});
});

app.get('/list_products', (req, res) => {
  const products = listProducts.map((product) => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  }));
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
})

