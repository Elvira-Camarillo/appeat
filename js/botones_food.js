const API_URL = "https://appeateasier.autodev.studio/api/"

let myForm = document.querySelector('#formLogin')

var myModal1 = new bootstrap.Modal(document.getElementById('myModalLogin'), { keyboard: false })
myModal1._element.querySelector("#modal_continue").style.display = "none"
myModal1._element.querySelector("#modal_back").style.display = "none"

// Local Storage to reduce number of server´s requests
function saveUserProfile(myJSON) {
    localStorage.clear();

    for ([key, value] of Object.entries(myJSON)) {
        localStorage.setItem(key, value);
        console.log("mi item key is: " + key);
        console.log("my value is: " + value);
    }
}

function modalHandler() {

    if (localStorage.length > 1) {
        myModal1._element.querySelector('#modal_message').innerText = "BIENVENIDO !!! Por favor presiona siguiente"
        myModal1._element.querySelector("#modal_continue").style.display = "block"
    } else {
        myModal1._element.querySelector('#modal_message').innerText = "Por favor revisa tus datos de nuevo"
        myModal1._element.querySelector("#modal_back").style.display = "block"
    }

}

// Form Data Retrieve
function getFormData() {

    let user_profile = {}

    let username = myForm.querySelector('#myUserName').value
    let password = myForm.querySelector('#myPassword').value

    user_profile = {...user_profile, username }
    user_profile = {...user_profile, password }

    return user_profile

}


// AJAX Comms to End-Point
const postFetch = async(postData) => {

    const data = await fetch(`${API_URL}users/login/`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })

    const dataResult = await data.json()

    console.log(dataResult)
    saveUserProfile(dataResult)

    return dataResult
}


// Event Handler
myForm.addEventListener('submit', (e) => {

    e.preventDefault()
    e.stopPropagation()

    let userData = getFormData()
        // console.log("Form Data Result: ", userData)

    let myResponse = postFetch(userData)

    myResponse.then(console.log("Ajax Response Result: ", myResponse.data))
    myResponse.then(myModal1.show())
    myResponse.then(setTimeout(() => { modalHandler() }, 2000))
    myResponse.catch((error) => console.log(error))

    //myResponse.then(console.log("SUCESS"),console.log("Something Wrong"))
    //window.location.href = "people_amount.html" // If I enable this promise its interrupted and localStorage as well
})

/* 
-------------------------------------------------
    Algorithm description for this ajax 
-------------------------------------------------

1. user data introduction into form
2. user data validation
3. submit btn add event listener
4. prevent default
5. user data into json format
6. ajax comms to endpoint
7. catch BE response
8. store user ID into localstorage
9. redirect to the next page

*/
}
else {
    e.target.classList.add('check')
}
} // e.target.classList
})

lacteos.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }
    } // e.target.classList
})

frutas.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }
    } // e.target.classList
})

verduras.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }
    } // e.target.classList
})

gluten.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }
    } // e.target.classList
})


// --------------------------------------------------------------------------------------------------------------------

// USER ID INITIAL CONFIGURATION

let welcome = document.getElementById('user_welcome')

if (localStorage.length > 1) {
    welcome.innerText = "Hola " + localStorage.user
    foodDict.user_profile = localStorage.id
}


let blockConfirm = document.querySelector('#block_next')
let btnNext = document.querySelector('#food_next')

let blockSave = document.querySelector('#block_save')
let btnSave = blockSave.querySelector('.btn-green')
btnSave.style.display = "none"


// -------------------------------------------------------------------------------------------------------------------------------


function generateJSON() {
    foodDict = []
    let datos = []
    let foodCheck = document.querySelectorAll(".btn-food i.check")

    for (let i = 0; i < foodCheck.length; i++) {

        let result = foodCheck[i].closest(".btn-food").id
        datos.push({
            user_profile: localStorage.id,
            food_type: result
        })
    }
    //console.log("Data from generateJSON(): ", datos)
    return datos
}


function dumpJSON(datos) {

    for (let i = 0; i < datos.length; i++) {

        document.getElementById(datos[i].food_type).firstElementChild.classList.add(foodIcon[datos[i].food_type]);
    }
}


// -------------------------------------------------------------------------------------------------------------------------------

// RETRIEVE USER PROFILE FOOD
const retrieveProfile = async() => {

    const data = await fetch(`${API_URL}users/profiles/food/?search=${localStorage.id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })

    const dataResult = await data.json()

    //console.log("AJAX Fetch Result:", dataResult)

    return dataResult
}

// POST USER PROFILE FOOD
const postFetch = async(url, datos) => {
    const data = await fetch(`${API_URL + url}`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
    return await data.json()
}

// -------------------------------------------------------------------------------------------------------------------------------

btnNext.addEventListener('click', (e) => {
    window.location.href = "kitchen.html"
})


btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    lockFunctions = true

    dataToSend = generateJSON()
        //console.log("Saving this AJAX POST before to go", dataToSend)

    try {
        let response = postFetch("users/profiles/food/", dataToSend)
        setTimeout(function() { window.location.href = "kitchen.html" }, 3000);

    } catch (error) {
        console.log(error)

    }

})


// ---------------------------------------------------------------------------------------------------------------

function handleEmptyProfile(dataResult) {

    if (dataResult.length == 0) {

        lockFunctions = false

        blockConfirm.querySelector('.btn-nar').style.display = "none"
        blockConfirm.style.display = "none"

        btnSave.style.display = "block"

    } else {

        lockFunctions = true
        dumpJSON(dataResult)
    }
}

window.addEventListener('load', (e) => {

    let myResponse = retrieveProfile()


    myResponse.then(console.log("AJAX Retrieve in Main", myResponse.dataResult))
    myResponse.then((dataResult) => { handleEmptyProfile(dataResult) })
    myResponse.catch((error) => { console.log(error) })

})