// search food area
document.getElementById('errorM').style.display='none';
const searchFood = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    //clear search field
    searchField.value = '';
    //error massege
    document.getElementById('errorM').style.display='none';
    // load meal data
    if(searchText==''){
        document.getElementById('emptyField').innerText='Please write something in the input field to get your desired data';
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResults(data.meals))
        .catch(error=>displayError(error))
    }
}
// display error 
const displayError=error=>{
   document.getElementById('errorM').style.display='block';
}

//display search results
const displaySearchResults = (meals) => {
    const searchResult = document.getElementById('searchResult');
    //clear search result
    searchResult.textContent='';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
           <div onclick='loadMealDetail(${meal.idMeal})' class="card">
           <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
           <div class="card-body">
               <h5 class="card-title">${meal.strMeal}</h5>
               <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
           </div>
       `;
       searchResult.appendChild(div);
    })
};
// load meal detail by object id
const loadMealDetail = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res=await fetch(url);
    const data=await res.json();
    displayMealDetail(data.meals[0]);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]))
}
//display meal detail 
const displayMealDetail = (meal) => {
    console.log(meal);
    const singleFoodDetail = document.getElementById('singleFoodDetail');
    singleFoodDetail.textContent='';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <div class="card">
           <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
           <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                <a href="${meal.strYoutube}" target='_balnk' class="btn btn-primary">See video<span></span></a>
            </div>
    `;
    singleFoodDetail.appendChild(div);
}