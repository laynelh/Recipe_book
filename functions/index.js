/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Reference Firestore
const db = admin.firestore();

// Example of an HTTP function
exports.addRecipe = functions.https.onRequest(async (req, res) => {
    // Extract data from the request
    const { name, description, ingredients, instructions, imageUrl } = req.body;

    try {
        // Add a new recipe document to Firestore
        const newRecipeRef = await db.collection('recipes').add({
            name: name,
            description: description,
            ingredients: ingredients,
            instructions: instructions,
            imageUrl: imageUrl,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).send(`Recipe added with ID: ${newRecipeRef.id}`);
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).send('Error adding recipe');
    }
});