let slideWidth = $('#sectionSlider').width()
let slideBar = $('#slideBar').width()

$('#arrowLeft').click(function(){
    $('#slideBar').animate({left : `-${slideBar}px`},500)
    $('#arrowRight').animate({left : "10px"},500)
    $('#arrowLeft').css('display', 'none');
    $('#arrowRight').css('display', 'block');
})
$('#arrowRight').click(function(){
    $('#arrowLeft').animate({left : `${slideBar+5}px`},500)
    $('#slideBar').animate({left : "0px"},500)
    $('#arrowLeft').css('display', 'block');
    $('#arrowRight').css('display', 'none');
})


function openNav(){
        $('#sectionSlider').animate({left:"0px"},500)
        $('#slideBar').animate({left: slideWidth},500)
        $('#open').css('display','none')
        $('#close').css('display','block')

        $("#lista li").eq(0).animate({top: 0}, 800)
        $("#lista li").eq(1).animate({top: 0}, 850)
        $("#lista li").eq(2).animate({top: 0}, 900)
        $("#lista li").eq(3).animate({top: 0}, 950)
        $("#lista li").eq(4).animate({top: 0}, 1000)

}
$('#open').click(function(){
    // console.log(slideWidth);
        openNav()
        // isSlide = false;
})


function closeNav(){
    $('#sectionSlider').animate({left:"-250px"},500)
    $('#slideBar').animate({left:`0px`},500)
    $('#open').css('display','block')
    $('#close').css('display','none')

    $("#lista li").animate({top: "300px"}, 500)
}
$('#close').click(function(){
    closeNav()
    // isSlide = true;
})


$('#logoImg').click(()=>{
    closeNav()
})

function spinnerIn(){
        $('#spinner').fadeIn(500)
        $('body').css('overflow' , 'auto')
}
function spinnerOut(){
        $('#spinner').fadeOut(500)
        $('body').css('overflow' , 'auto')
}

// spinnerOut()


let showMeals = document.getElementById('showMeals')
let searchMeals = document.getElementById('searchMeals')
let arrResult = []
// console.log(showMeals);
// console.log(searchMeals);

        
        
async function searchDefault(){
    spinnerIn()

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    // console.log(arrApi.meals);
    displayHome()
    spinnerOut()

}

searchDefault()


function displayHome(){
    // showMeals.innerHTML = ""
    let cartoona = `` 
    for(let i =0 ; i < arrResult.length ; i++) {
        cartoona += `<div onclick="getApiDetails(${arrResult[i].idMeal})" class="col-sm-12 col-md-6 col-lg-3 overflow-hidden">
        <div class="img-hover  position-relative  w-100" id="img-hover">
        <img src="${arrResult[i].strMealThumb}" class=" w-100 rounded-3" alt="">
        <div class="overlay rounded-3 position-absolute d-flex p-2  align-items-center">
                <h3 class="">${arrResult[i].strMeal}</h3>
             </div>
        </div>
    </div>
        `
        // console.log(arrResult[i].idMeal);
    }
    showMeals.innerHTML = cartoona
}



async function getApiDetails(id){
    spinnerIn()

    showMeals.innerHTML = ""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    // console.log(arrApi.meals);
    displayDetails(arrResult[0])
    spinnerOut()

}

function displayDetails(details){
    // showMeals.innerHTML = ""
    let cartoona = `` 
    let boxTags = ''
    let boxIngredient = ``
    for(let i =0 ; i < arrResult.length ; i++) {
        for (let i = 1; i <= 20; i++) {
            if (details[`strIngredient${i}`]) {
                boxIngredient += `<li class="alert alert-info m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
            }
        }

        let tag = details.strTags?.split(",")    
        if (tag != true) {
            tag = []
        }
        for (let i = 0; i < tag.length; i++) {
            boxTags += `
            <li class="alert alert-danger m-2 p-1">${tag[i]}</li>`
        }
    

        cartoona += `
        <div class="col-md-4">
        <img src="${arrResult[i].strMealThumb}" class="w-100 rounded-2" alt="">
        <h3 class="text-white">${arrResult[i].strMeal}</h3>
    </div>
    <div class="col-md-8 text-white">
        <h3>Instructions</h3>
        <p>${arrResult[i].strInstructions}</p>
        <h3>Area : ${arrResult[i].strArea}</h3>
        <h3>Category : ${arrResult[i].strCategory}</h3>
        <div>
            <h3>Recipes :</h3>
            <ul class=" d-flex flex-wrap list-unstyled">
                ${boxIngredient}
            </ul>
        </div>
        <div>
            <h3>Tags :</h3>
            <ul class=" d-flex flex-wrap list-unstyled">
                ${boxTags}
            </ul>
        </div>
    
        <a class="btn btn-success" href="${arrResult[i].strSource}">Source</a>
        <a class="btn btn-danger" href="${arrResult[i].strYoutube} target="_blank">Youtube</a>
    </div>`
        
        // console.log(arrResult[i].idMeal);
    }
    showMeals.innerHTML = cartoona
}




$('#lista li').click(function(){
    if($(this)[0].innerText == "Search"){
        displaySearchInputs()
    }else if($(this)[0].innerText == "Categories"){
        getCategories()
    }else if($(this)[0].innerText == "Area"){
        getArea()   
    }else if($(this)[0].innerText == "Ingredients"){
        getIngredients()   
    }else if($(this)[0].innerText == "Contact Us" ){
        displayContactUs()
    }
})



function displaySearchInputs(){
    closeNav()
    let cartoona = ``
    
    cartoona= `     
    <div class="col-md-6 searchInput">
    <input onkeyup="searchByName(this.value)"  type="text" class="form-control bg-transparent text-white rounded-3" placeholder="Search By Name" >
    </div>
    <div class="col-md-6 searchInput">
    <input onkeyup="searchByFirstLetter(this.value)" type="text" class="form-control bg-transparent text-white rounded-3" maxlength="1" placeholder="Search By First Letter">
    </div>` 
    searchMeals.innerHTML = cartoona
    showMeals.innerHTML = ""
    
}

async function searchByName(search){
    spinnerIn()
    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    try {
        displayHome()
    } catch (search) {
        console.log("error");
    }
    spinnerOut()
    // if(search){
    // }else{
    // }
}

async function searchByFirstLetter(letter){
    spinnerIn()

    showMeals.innerHTML = ""
    // if(letter.length == 1){
        // console.log("ok");
    if (!letter){
        letter = "a"
    }
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter[0]}`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    try {
        displayHome()
    } catch (letter) {
        console.log("error");
    }
    spinnerOut()
    // displayHome()
}


async function getCategories(){
    spinnerIn()

    searchMeals.innerHTML = ""
    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let arrApi = await api.json();
    arrResult = arrApi.categories
    // console.log(arrApi.categories);
    displayCategories()
    spinnerOut()

}



function displayCategories(){
    closeNav()
    showMeals.innerHTML = ""

    let cartoona = `` 
    for(let i =0 ; i < arrResult.length ; i++) {
        cartoona += `<div onclick="getCategoriesDetails('${arrResult[i].strCategory}')" class="col-sm-12 col-md-6 col-lg-3 overflow-hidden  ">
        <div class="img-hover position-relative" id="img-hover">
            <img src="${arrResult[i].strCategoryThumb}" class=" w-100 rounded-3" alt="">
            <div class="overlay rounded-3 position-absolute  text-center">
                <p class="fs-3 ps-2">${arrResult[i].strCategory}</p>
                <p class=" ps-2">${arrResult[i].strCategoryDescription.split(10)}</p>
             </div>
        </div>
    </div>
        `
        // console.log(arrResult[i].idMeal);
    }
    showMeals.innerHTML = cartoona
}


async function getCategoriesDetails(strCategory){
    spinnerIn()
    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    displayHome()
    spinnerOut()
    // console.log(arrResult);
}


async function getArea(){
    spinnerIn()

    searchMeals.innerHTML = ""
    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    // console.log(arrApi.categories);
    displayArea()
    spinnerOut()

}



function displayArea(){

    closeNav()
    showMeals.innerHTML = ""

    let cartoona = `` 
    for(let i =0 ; i < arrResult.length ; i++) {
        cartoona += `<div onclick="getAreaDetails('${arrResult[i].strArea}')" class="col-sm-12 col-md-6 col-lg-3 text-white text-center pointer">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${arrResult[i].strArea}</h3>
    </div>
        `
        // console.log(arrResult[i].idMeal);
    }
    showMeals.innerHTML = cartoona
}


async function getAreaDetails(strArea){
    spinnerIn()

    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    displayHome()
    spinnerOut()

    // console.log(arrResult);
}


async function getIngredients(){
    spinnerIn()
    searchMeals.innerHTML = ""
    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    // console.log(arrApi.categories);
    displayIngredients()
    spinnerOut()
}



function displayIngredients(){
    closeNav()
    showMeals.innerHTML = ""

    let cartoona = `` 
    for(let i =0 ; i <= 24  ; i++) {
        cartoona += `
        <div onclick="getIngredientsDetails('${arrResult[i].strIngredient}')" class="col-sm-12 col-md-6 col-lg-3 text-white text-center pointer overflow-hidden" style="height: 200px;">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arrResult[i].strIngredient}</h3>
                <p>${arrResult[i].strDescription}</p>
            </div>
        `
        // console.log(arrResult[i].idMeal);
    }
    showMeals.innerHTML = cartoona
}


async function getIngredientsDetails(strIngredient){
    spinnerIn()
    showMeals.innerHTML = ""
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
    let arrApi = await api.json();
    arrResult = arrApi.meals
    displayHome()
    spinnerOut()

    // console.log(arrResult);
}


function displayContactUs(){
    closeNav()
    searchMeals.innerHTML = ""
    showMeals.innerHTML = ""

    let cartoona = ``
    cartoona+= `
    <div class="col-md-6 marginTop">
                        <input id="nameInput" onkeyup="validate()" type="text" class="w-100 p-1 rounded-2" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                        </div>
                    <div class="col-md-6 marginTop">
                        <input id="emailInput" onkeyup="validate()" type="email" class="w-100 p-1 rounded-2" placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                        </div>
                    <div class="col-md-6 ">
                        <input id="phoneInput" onkeyup="validate()" type="text" class="w-100 p-1 rounded-2" placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                        </div>
                    <div class="col-md-6 ">
                        <input id="ageInput" onkeyup="validate()" type="number" class="w-100 p-1 rounded-2" placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                        </div>
                    <div class="col-md-6 ">
                        <input id="passInput" onkeyup="validate()" type="password" class="w-100 p-1 rounded-2" placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                        </div>
                    <div class="col-md-6 ">
                        <input id="rePassInput" onkeyup="validate()" type="password" class="w-100 p-1 rounded-2" placeholder="Repassword">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                        </div>
                    <div class="col-md-12 text-center">
                        <button id="submit" class="btn btn-danger " disabled>Submit</button>
                    </div>
    `
showMeals.innerHTML = cartoona
}



let nameRegex = /^[a-z|A-Z]+$/
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let phoneRegex = /^["+"]?(022)?01[1|2|5|0]{1}[0-9]{8}$/ 
let ageRegex = /^[1-9]{1}$|^([1-9][0-9]){1}$|[1]{1}[0-9]?[0-9]?$|(200)$/ 
let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.).{8,}$/
// let rePassRegex = /^(?=.*\d)(?=.*[a-z])(?=.).{8,}$/




function nameValidate(name){    
    if(nameRegex.test(name)){
        return true
    }
}
function emailValidate(email){    
    if(emailRegex.test(email)){
        return true
    }
}
function phoneValidate(phone){    
    if(phoneRegex.test(phone)){
        return true
    }
}
function ageValidate(age){    
    if(ageRegex.test(age)){
        return true
    }
}
function passValidate(pass){    
    if(passRegex.test(pass)){
        return true
    }
}


let namefocusd = false;
let emailfocusd = false;
let phonefocusd = false;
let agefocusd = false;
let passfocusd = false;
let rePassfocusd = false;


function validate(){
    let nameInput = document.getElementById('nameInput')
    let emailInput = document.getElementById('emailInput')
    let phoneInput = document.getElementById('phoneInput')
    let ageInput = document.getElementById('ageInput')
    let passInput = document.getElementById('passInput')
    let rePassInput = document.getElementById('rePassInput')

    function rePassValidate(){    
        if(passInput.value == rePassInput.value){
            return true
        }
    }





    nameInput.addEventListener("focus", () => {
        namefocusd = true
    })

    emailInput.addEventListener("focus", () => {
        emailfocusd = true
    })

    phoneInput.addEventListener("focus", () => {
        phonefocusd = true
    })

    ageInput.addEventListener("focus", () => {
        agefocusd = true
    })

    passInput.addEventListener("focus", () => {
        passfocusd = true
    })

    rePassInput.addEventListener("focus", () => {
        rePassfocusd = true
    })



    if (namefocusd) {
        if (nameValidate(nameInput.value)) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailfocusd) {

        if (emailValidate(emailInput.value)) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phonefocusd) {
        if (phoneValidate(phoneInput.value)) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (agefocusd) {
        if (ageValidate(ageInput.value)) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passfocusd) {
        if (passValidate(passInput.value)) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (rePassfocusd) {
        if (rePassValidate()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }











    if(nameValidate(nameInput.value) 
    && emailValidate(emailInput.value) 
    && phoneValidate(phoneInput.value) 
    && passValidate(passInput.value) 
    && ageValidate(ageInput.value) 
    && rePassValidate()){
        document.getElementById('submit').removeAttribute("disabled");
    }else{
        document.getElementById('submit').setAttribute("disabled" , true);
    }
}


