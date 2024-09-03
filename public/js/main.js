// main.js

// Reference to the recipes collection
const recipesCollection = db.collection('recipes');

// DOM Elements
const recipesGrid = document.getElementById('recipes-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch and display recipes
const fetchRecipes = (searchTerm = '') => {
  recipesGrid.innerHTML = ''; // Clear existing recipes

  let query = recipesCollection;

  if (searchTerm.trim()) {
    query = query.where('name', '>=', searchTerm).where('name', '<=', searchTerm + '\uf8ff');
  }

  query.get()
    .then(snapshot => {
      if (snapshot.empty) {
        recipesGrid.innerHTML = '<p>No recipes found.</p>';
        return;
      }

      snapshot.forEach(doc => {
        const recipe = doc.data();
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.setAttribute('data-id', doc.id);

        recipeCard.innerHTML = `
          <img src="${recipe.imageURL}" alt="${recipe.name}">
          <div class="card-content">
            <h2>${recipe.name}</h2>
            <p>${recipe.description.substring(0, 100)}...</p>
          </div>
        `;

        // Add click event to navigate to recipe detail page
        recipeCard.addEventListener('click', () => {
          window.location.href = `recipe.html?id=${doc.id}`;
        });

        recipesGrid.appendChild(recipeCard);
      });
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
      recipesGrid.innerHTML = '<p>Error loading recipes.</p>';
    });
};

// Event Listener for search
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  fetchRecipes(searchTerm);
});

// Fetch all recipes on initial load
fetchRecipes();
