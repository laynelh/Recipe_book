// recipe.js

// DOM Element
const recipeContainer = document.getElementById('recipe-container');

// Get recipe ID from URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

if (recipeId) {
  // Fetch recipe data
  db.collection('recipes').doc(recipeId).get()
    .then(doc => {
      if (doc.exists) {
        const recipe = doc.data();

        recipeContainer.innerHTML = `
          <div class="recipe-detail">
            <img src="${recipe.imageURL}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <div class="section">
              <h3>Description</h3>
              <p>${recipe.description}</p>
            </div>
            <div class="section">
              <h3>Ingredients</h3>
              <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
            </div>
            <div class="section">
              <h3>Instructions</h3>
              <p>${recipe.instructions}</p>
            </div>
          </div>
        `;
      } else {
        recipeContainer.innerHTML = '<p>Recipe not found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching recipe:', error);
      recipeContainer.innerHTML = '<p>Error loading recipe.</p>';
    });
} else {
  recipeContainer.innerHTML = '<p>No recipe ID provided.</p>';
}
