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
            <p onclick="loadCategoryItems(${category.category_id})">${category.category_name}</p>
        `;
        // console.log(category.category_id);
        categoryContainer.appendChild(categoryDiv);
    });
}

displayCategories();
// loadCategories();

const loadCategoryItems = (number) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${number}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryItems(data.data));

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');
}

const displayCategoryItems = (items) => {
    // const items = await loadCategoryItems();
    const itemsNumber = document.getElementById('itemsNumber');
    itemsNumber.innerHTML = `
        <p class="text-xl text-center text-black">${items.length} items found.</p>
    `;
    // console.log(items.length);
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.textContent = '';
    if (items.length === 0) {
        itemsContainer.innerHTML = `
            <h3 class="text-center text-3xl text-red-700">News Not Found</h3>
        `;
        return;
    }
    items.forEach(item => {
        // console.log(item);
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="card md:card-side bg-base-100 shadow-xl my-5">
            <figure><img src="${item.thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${item.title}</h2>
                <p>${item.details.slice(0, 250) + '...'}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-x-2">
                        <img class="w-12 rounded-full" src="${item.author.img}" alt="Album">
                        <div class="text-xs">
                            <p>${item.author.name ? item.author.name : "No Name"}</p>
                            <p>${item.author.published_date ? item.author.published_date : "Date Missing"}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-2">
                        <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></p>
                        <p>${item.total_view ? item.total_view : "No View"}</p>
                    </div>
                    <label onclick="loadItemDetails('${item._id}')" for="my-modal-6" class="btn modal-button bg-inherit border-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg></label>
                </div>
            </div>
        </div>
        `;
        itemsContainer.appendChild(itemDiv);
        spinner.classList.add('hidden');
    });
}


const loadItemDetails = (itemId) => {
    const url = `https://openapi.programming-hero.com/api/news/${itemId}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayItemDetailsInModal(data.data[0]))
}

const displayItemDetailsInModal = (newsDetail) => {
    // console.log(newsDetail);
    const {image_url, title, details} = newsDetail;
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <img src="${image_url}" alt="Image" class="rounded-xl"/>
        <div class="card-body items-center">
            <h3 class="card-title">${title}</h3>
            <p>${details.slice(0, 350) + '...'}</p>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-2">
                <img class="w-12 rounded-full" src="${newsDetail.author.img}" alt="Album">
                <div class="text-xs">
                    <p>${newsDetail.author.name ? newsDetail.author.name : "No Name"}</p>
                    <p>${newsDetail.author.published_date ? newsDetail.author.published_date : "Date Missing"}</p>
                </div>
            </div>
            <div class="flex items-center gap-x-2">
                <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></p>
                <p>${newsDetail.total_view ? newsDetail.total_view : "No View"}</p>
            </div>
        </div>
    `;
    
}
// displayCategoryItems()
// loadCategoryItems()