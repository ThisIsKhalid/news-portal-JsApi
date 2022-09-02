const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data.news_category);
        return data.data.news_category;
    } catch (error) {
        
    }
}

const displayCategories = async() =>{
    const categories = await loadCategories();
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <p>${category.category_name}</p>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

displayCategories();
// loadCategories();