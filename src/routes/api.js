import express from 'express';
import { getProductInfo, searchProducts } from '../controllers/products.js';
import { testEndpoint } from '../controllers/test.js';
import { availableFunctions, executeFunctions } from '../controllers/functions.js';

export const router = express.Router();

/**
 * @swagger
 * /api/functions:
 *   get:
 *     summary: List available functions
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: List of available functions and their specifications
 */
router.get('/functions', (req, res) => {
  res.json(availableFunctions);
});

/**
 * @swagger
 * /api/functions/execute:
 *   post:
 *     summary: Execute a function
 *     tags: [Functions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the function to execute
 *               parameters:
 *                 type: object
 *                 description: Parameters for the function
 *     responses:
 *       200:
 *         description: Function execution result
 *       400:
 *         description: Invalid request or parameters
 *       404:
 *         description: Function not found
 */
router.post('/functions/execute', async (req, res) => {
  try {
    const { name, parameters } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Function name is required' });
    }

    if (!availableFunctions[name]) {
      return res.status(404).json({ error: `Function ${name} not found` });
    }

    const result = await executeFunctions(name, parameters);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Existing routes
router.get('/test', testEndpoint);
router.get('/products/search', searchProducts);
router.get('/products/:id', getProductInfo);