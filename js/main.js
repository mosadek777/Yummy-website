$(document).ready(function () {
    // let outerWidthMenu = $(".nav-menu .menu-tabs").outerWidth();
    // $(".nav-menu").animate({ left: - outerWidthMenu }, 600);
    searchByName("").then(()=>{
    
      $(".loading-screen").fadeOut(500)
      $("body").css("overflow", "visible")
       $(".inner-loading-screen").fadeOut(300)
     
    })
    

});



let submitBtn;

///?????????????????? طريقة تانية للناف بار لما بفتح السايت
function openNav() {
  $(".nav-menu").animate({ left: `0px` }, 500);
  $(".icon-toggle").addClass("fa-xmark");
  $(".icon-toggle").addClass("fa-align-justify");

  //todo second try of code for testing
  for (let i = 0; i < 5; i++) {
    $(".menu-links li")
      .eq(i)
      .animate(
        { top: 0 },

        (i + 5) * 100
      );
  }

  //!!!!!!!!!!!!!!!!!!!! first try of code for testing
  // $(".menu-links li").eq(0).animate({top:0},500)

  // $(".menu-links li").eq(1).animate({top:0},600)

  // $(".menu-links li").eq(2).animate({top:0},700)

  // $(".menu-links li").eq(3).animate({top:0},800)

  // $(".menu-links li").eq(4).animate({top:0},900)
}

function closeNav() {
  let outerWidthMenu = $(".nav-menu .menu-tabs").outerWidth();
  // console.log(outerWidthMenu);
  $(".nav-menu").animate({ left: -outerWidthMenu }, 500);
  $(".icon-toggle").addClass("fa-align-justify");
  $(".icon-toggle").removeClass("fa-xmark");

  // $(".menu-links li").animate({top:300},500)

  for (let i = 0; i < 5; i++) {
    $(".menu-links li")
      .eq(i)
      .animate(
        { top: 300 },

        (i + 5) * 100
      );
  }
}

closeNav();

$(".nav-menu .icon-toggle").click(function () {
  if ($(".nav-menu").css("left") == `0px`) {
    closeNav();
  } else {
    openNav();
  }
});

// ????????????????????????????????? fetch apis???????????????????????????????????
let meals = [];
// ! search by name

async function searchByName(meal) {
  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  let response = await preResponse.json();
  meals = response.meals;

  meals ? displayMeals() : `notFound`;
}


function displayMeals() {
  let cartoona = ``;
  for (let i = 0; i < meals.length; i++) {
    cartoona += `
      <div class="col-md-3 my-3">
      <div onclick="getMealDetails('${meals[i].idMeal}')" class="meal position-relative overflow-hidden cursor-pointer">
          <img class="w-100 rounded-3" src="${meals[i].strMealThumb}"
              alt="" />
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-3">
              <h2>${meals[i].strMeal}</h2>
          </div>
      </div>
  </div>
      
      
      `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}

// todo -------------------------> categories api <------------------------------------

let categories = document.getElementById("categories");
let categoriesArray = [];
categories.addEventListener(`click`, async function getCategories() {
  $(".inner-loading-screen").fadeIn(300)
  document.getElementById("searchInputsContainer").innerHTML = ``;
  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await preResponse.json();
  categoriesArray = response.categories;
  displayCategories();
  closeNav();
  $(".inner-loading-screen").fadeOut(300)

});

function displayCategories() {
  let cartoona = ``;
  for (let i = 0; i < categoriesArray.length; i++) {
    cartoona += `
    <div class="col-md-3 my-3 ">
    <div onclick="getCategoryMeals('${
      categoriesArray[i].strCategory
    }')" class="meal position-relative overflow-hidden cursor-pointer">
        <img class="w-100 rounded-3" src="${
          categoriesArray[i].strCategoryThumb
        }"
            alt="" />
        <div class="meal-layer position-absolute text-center text-black p-3">
            <h2>${categoriesArray[i].strCategory}</h2>
            <p>${categoriesArray[i].strCategoryDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
        </div>
    </div>
</div>
    
    
    `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}

// todo  ----------------------> Area Api <------------------------------------
let area = document.getElementById("area");
let AreaArray = [];

area.addEventListener(`click`, async function getArea() {
  $(".inner-loading-screen").fadeIn(300)

  document.getElementById("searchInputsContainer").innerHTML = ``;
  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await preResponse.json();
  AreaArray = response.meals;
  displayArea();
  closeNav();

  $(".inner-loading-screen").fadeOut(300)

});

function displayArea() {
  let cartoona = ``;
  for (let i = 0; i < AreaArray.length; i++) {
    cartoona += `
    <div  class="col-md-3 ">
    <div onclick="getAreaMeals('${AreaArray[i].strArea}')" class=" rounded-2 shadow my-3 text-center cursor-pointer ">
    <i class="fa-solid fa-globe fa-2x "></i>
      <h3>${AreaArray[i].strArea}</h3>
      </div>
</div>
    
    `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}

// todo ----------> Ingredients api <--------------------------------
let ingredients = document.getElementById("ingredients");
let ingredientsArray = [];

ingredients.addEventListener(`click`, async function getArea() {
  $(".inner-loading-screen").fadeIn(300)

  document.getElementById("searchInputsContainer").innerHTML = ``;
  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await preResponse.json();
  ingredientsArray = response.meals.slice(0, 20);
  displayIngredients();
  closeNav();

  $(".inner-loading-screen").fadeOut(300)

});

function displayIngredients() {
  let cartoona = ``;
  for (let i = 0; i < ingredientsArray.length; i++) {
    cartoona += `
    <div onclick=" getIngredientsMeals('${
      ingredientsArray[i].strIngredient
    }') " class="col-md-3 rounded-2 shadow  my-3 text-center cursor-pointer fa-2x">
    <i class="fa-solid fa-drumstick-bite fa-2x text-success "></i>
      <h3>${ingredientsArray[i].strIngredient}</h3>
      <p class="text-muted h6" >${ingredientsArray[i].strDescription
        .split(" ")
        .slice(0, 10)
        .join(" ")}</p>
        
</div>
    
    `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}
let categoryMeals = [];
// todo --------------> categoryMeal api

async function getCategoryMeals(category) {
  $(".inner-loading-screen").fadeIn(300)

  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let response = await preResponse.json();
  categoryMeals = response.meals;
  displayCategoryMeals();
  $(".inner-loading-screen").fadeOut(300)

}

function displayCategoryMeals() {
  let cartoona = ``;
  for (let i = 0; i < categoryMeals.length; i++) {
    cartoona += `
      <div class="col-md-3 my-3">
      <div onclick="getMealDetails('${categoryMeals[i].idMeal}')" class="meal position-relative overflow-hidden cursor-pointer">
          <img class="w-100 rounded-3" src="${categoryMeals[i].strMealThumb}"
              alt="" />
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-3">
              <h2>${categoryMeals[i].strMeal}</h2>
          </div>
      </div>
  </div>
      
      
      `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}

let areaMeals = [];
// todo --------------> AreaMeal api

async function getAreaMeals(area) {
  $(".inner-loading-screen").fadeIn(300)

  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let response = await preResponse.json();
  areaMeals = response.meals;
  displayAreaMeals();
  $(".inner-loading-screen").fadeOut(300)

}

function displayAreaMeals() {
  let cartoona = ``;
  for (let i = 0; i < areaMeals.length; i++) {
    cartoona += `
      <div class="col-md-3 my-3">
      <div onclick="getMealDetails('${areaMeals[i].idMeal}')" class="meal position-relative overflow-hidden cursor-pointer">
          <img class="w-100 rounded-3" src="${areaMeals[i].strMealThumb}"
              alt="" />
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-3">
              <h2>${areaMeals[i].strMeal}</h2>
          </div>
      </div>
  </div>
      
      
      `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}

// todo --------------------> ingredients Meal <--------------------

let ingredientsMeals = [];
// todo --------------> AreaMeal api

async function getIngredientsMeals(ingredient) {
  $(".inner-loading-screen").fadeIn(300)

  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let response = await preResponse.json();
  ingredientsMeals = response.meals;
  console.log(ingredientsMeals);
  displayIngredientsMeals();
  $(".inner-loading-screen").fadeOut(300)

}

function displayIngredientsMeals() {
  let cartoona = ``;
  for (let i = 0; i < ingredientsMeals.length; i++) {
    cartoona += `
      <div class="col-md-3 my-3">
      <div onclick="getMealDetails('${ingredientsMeals[i].idMeal}')"  class="meal position-relative overflow-hidden cursor-pointer">
          <img class="w-100 rounded-3" src="${ingredientsMeals[i].strMealThumb}"
              alt="" />
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-3">
              <h2>${ingredientsMeals[i].strMeal}</h2>
          </div>
      </div>
  </div>
      
      
      `;
  }
  document.getElementById("RowData").innerHTML = cartoona;
}

let MealDetailsArray = [];
async function getMealDetails(mealId) {
  $(".inner-loading-screen").fadeIn(300)

  document.getElementById("searchInputsContainer").innerHTML = ``;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  MealDetailsArray = response.meals[0];
  displayMealDetails();
  $(".inner-loading-screen").fadeOut(300)
  closeNav();
}

function displayMealDetails() {
  document.getElementById("searchInputsContainer").innerHTML = ``;
  let ingredientDetails = ``;
  for (let i = 1; i <= 20; i++) {
    if (MealDetailsArray[`strIngredient${i}`]) {
      // Measure
      ingredientDetails += `
  <li class="alert alert-info m-1 p-2">${MealDetailsArray[`strMeasure${i}`]} ${
        MealDetailsArray[`strIngredient${i}`]
      }</li>
  
  `;
      // ingredientDetails.push(MealDetailsArray[`strIngredient${i}`])
    }
  }
  // console.log(ingredientDetails);
  let tags = MealDetailsArray.strTags?.split(",");

  let tagsStr = "";
  for (let i = 0; i < tags?.length; i++) {
    tagsStr += `
  <li class="alert alert-info m-2 p-1">${tags[i]}</li>
  `;
  }

  let cartoona = `<div class="col-md-4">
  <img class="w-100 rounded-3" src="${MealDetailsArray.strMealThumb}" alt="">
  <h2>${MealDetailsArray.strMeal}</h2>
  </div>
  <div class="col-md-8">
  <h2>Instructions</h2>
  <p>${MealDetailsArray.strInstructions} </p>
      <h3><span>Area :</span> ${MealDetailsArray.strArea}</h3>
      <h3><span>Category :</span>  ${MealDetailsArray.strCategory}</h3>
      <h3>Recipes </h3>
      <ul class="list-unstyled d-flex flex-wrap  recipe-details">
         ${ingredientDetails}
      </ul>
  
      <h3>Tags </h3>
      <ul class="list-unstyled d-flex g-2  recipe-details">
          ${tagsStr}
      </ul>
      <a href=" ${MealDetailsArray.strSource}" target="_blank" class="btn btn-success">Source</a>
      <a href=" ${MealDetailsArray.strYoutube}" target="_blank"  class="btn btn-danger">Youtube</a>
  
  </div>
  </div>
  
  
  
  `;
  document.getElementById("RowData").innerHTML = cartoona;
}

let search = document.getElementById(`search`);
search.addEventListener(`click`, () => {
  showSearchInputs();
  closeNav();
});

function showSearchInputs() {
  document.getElementById("searchInputsContainer").innerHTML = `
  
  <div class="row py-4 ">
  <div class="col-md-6">
      <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white " placeholder="Search By Name">
  </div>

  <div class="col-md-6">
      <input onkeyup="searchByFirstLetter(this.value)" maxLength="1" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
  </div>
</div>
  
  `;
  document.getElementById("RowData").innerHTML = "";
}

// search by First Letter
async function searchByFirstLetter(lmeal) {
  $(".inner-loading-screen").fadeIn(300)

  let preResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${lmeal}`
  );
  let response = await preResponse.json();
  meals = response.meals;

  meals ? displayMeals() : `notFound`;
  $(".inner-loading-screen").fadeOut(300)

}

let contactUs = document.getElementById(`contactUs`);
contactUs.addEventListener(`click`, function () {
  showContacts();
  closeNav();
});
function showContacts() {
  document.getElementById("RowData").innerHTML = `
  
  <div class="contact vh-100 d-flex justify-content-center align-items-center ">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name" />
            <div id="nameAlert" class="alert alert-danger mt-2 w-100 d-none">Special Character and Numbers not Allowed</div>
              </div>

          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email" />
              <div id="emailAlert" class="alert alert-danger mt-2 w-100 d-none">this is invalid Email Format example xx@yahoo.com</div>

              </div>


 <div class="col-md-6">
                  <input id="phoneInput" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your phone" />
                  <div id="phoneAlert" class="alert alert-danger mt-2 w-100 d-none">this is invalid Mobile Format example (11 digit)</div>

                  </div>
  

      <div class="col-md-6">
          <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age" />
          <div id="ageAlert" class="alert alert-danger mt-2 w-100 d-none">Age between 1 to 200</div>

          </div>

      <div class="col-md-6">
          <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password" />
          <div id="passwordAlert" class="alert alert-danger mt-2 w-100 d-none">password should contain one letter and one number , at least 8 characters</div>

          </div>

      <div class="col-md-6">
          <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repassword" />
          <div id="repassAlert" class="alert alert-danger mt-2 w-100 d-none">password doesn't match</div>

          </div>

  </div>
  <button disabled id="submitBtn"  class="btn btn-outline-danger mt-4">Submit</button>

</div>
</div> 

  
  `;
  submitBtn = document.getElementById(`submitBtn`);


  

document.getElementById(`nameInput`).addEventListener(`focus`,()=>{
  nameInputTouched = true
})

document.getElementById(`emailInput`).addEventListener(`focus`,()=>{
  emailInputTouched = true
})


document.getElementById(`phoneInput`).addEventListener(`focus`,()=>{
  phoneInputTouched = true
})


document.getElementById(`ageInput`).addEventListener(`focus`,()=>{
  ageInputTouched = true
})


document.getElementById(`passwordInput`).addEventListener(`focus`,()=>{
  passwordInputTouched = true
})


document.getElementById(`repasswordInput`).addEventListener(`focus`,()=>{
  repasswordInputTouched = true
})

}
let nameInputTouched = false;
let emailInputTouched = false;

let phoneInputTouched = false;

let ageInputTouched = false;

let passwordInputTouched = false;

let repasswordInputTouched = false;






function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById(`nameAlert`).classList.replace("d-block","d-none")
      document.getElementById(`nameInput`).classList.add(`is-valid`)
      document.getElementById(`nameInput`).classList.remove(`is-invalid`)
      document.getElementById(`nameInput`).classList.remove(`fa-fade`)


    } else {
      document.getElementById(`nameAlert`).classList.replace(`d-none`,`d-block`)
      
      document.getElementById(`nameInput`).classList.add(`is-invalid`)
      document.getElementById(`nameInput`).classList.add(`fa-fade`)

      document.getElementById(`nameInput`).classList.remove(`is-valid`)
    
    }
  }

if (emailInputTouched) {
  if (emailValidation()) {
    document.getElementById(`emailAlert`).classList.replace("d-block","d-none")
    document.getElementById(`emailInput`).classList.add(`is-valid`)
    document.getElementById(`emailInput`).classList.remove(`is-invalid`)
    document.getElementById(`emailInput`).classList.remove(`fa-fade`)
  } else {
    document.getElementById(`emailAlert`).classList.replace(`d-none`,`d-block`)
    document.getElementById(`emailInput`).classList.add(`is-invalid`)
    document.getElementById(`emailInput`).classList.add(`fa-fade`)

    document.getElementById(`emailInput`).classList.remove(`is-valid`)
  
  }
}

if (phoneInputTouched) {
  if (phoneValidation()) {
    document.getElementById(`phoneAlert`).classList.replace("d-block","d-none")
    document.getElementById(`phoneInput`).classList.add(`is-valid`)
    document.getElementById(`phoneInput`).classList.remove(`is-invalid`)
    document.getElementById(`phoneInput`).classList.remove(`fa-fade`)

  } else {
    document.getElementById(`phoneAlert`).classList.replace(`d-none`,`d-block`)
    document.getElementById(`phoneInput`).classList.add(`is-invalid`)
    document.getElementById(`phoneInput`).classList.add(`fa-fade`)

    document.getElementById(`phoneInput`).classList.remove(`is-valid`)
  
  }
  
}
if (ageInputTouched) {
  if (ageValidation()) {
    document.getElementById(`ageAlert`).classList.replace("d-block","d-none")
    document.getElementById(`ageInput`).classList.add(`is-valid`)
    document.getElementById(`ageInput`).classList.remove(`is-invalid`)
    document.getElementById(`ageInput`).classList.remove(`fa-fade`)
  } else {
    document.getElementById(`ageAlert`).classList.replace(`d-none`,`d-block`)
    document.getElementById(`ageInput`).classList.add(`is-invalid`)
    document.getElementById(`ageInput`).classList.add(`fa-fade`)

    document.getElementById(`ageInput`).classList.remove(`is-valid`)
  
  }
}

if (passwordInputTouched) {
  if (passwordValidation()) {
    document.getElementById(`passwordAlert`).classList.replace("d-block","d-none")
    document.getElementById(`passwordInput`).classList.add(`is-valid`)
    document.getElementById(`passwordInput`).classList.remove(`is-invalid`)
    document.getElementById(`passwordInput`).classList.remove(`fa-fade`)
  } else {
    document.getElementById(`passwordAlert`).classList.replace(`d-none`,`d-block`)
    document.getElementById(`passwordInput`).classList.add(`is-invalid`)
    document.getElementById(`passwordInput`).classList.add(`fa-fade`)

    document.getElementById(`passwordInput`).classList.remove(`is-valid`)
  
  }
}
// repasswordInput

if (repasswordInputTouched) {
  if (repasswordValidation()) {
    document.getElementById(`repassAlert`).classList.replace("d-block","d-none")
    document.getElementById(`repasswordInput`).classList.add(`is-valid`)
    document.getElementById(`repasswordInput`).classList.remove(`is-invalid`)
    document.getElementById(`repasswordInput`).classList.remove(`fa-fade`)
  } else {
    document.getElementById(`repassAlert`).classList.replace(`d-none`,`d-block`)
    document.getElementById(`repasswordInput`).classList.add(`is-invalid`)
    document.getElementById(`repasswordInput`).classList.add(`fa-fade`)

    document.getElementById(`repasswordInput`).classList.remove(`is-valid`)
  
  }
  
}

























  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled")
  }else
  {
    submitBtn.setAttribute("disabled",true)
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById(`nameInput`).value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById(`emailInput`).value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById(`phoneInput`).value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById(`ageInput`).value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById(`passwordInput`).value
  );
}

function repasswordValidation() {
  return (
    document.getElementById(`repasswordInput`).value ==
    document.getElementById(`passwordInput`).value
  );
}
