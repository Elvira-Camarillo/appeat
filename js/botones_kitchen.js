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
if (lockFunctions === false) {
    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
}
})


// --------------------------------------------------------------------------------------------------------------------

// USER ID INITIAL CONFIGURATION

let welcome = document.getElementById('user_welcome')

if (localStorage.length > 1) {
    welcome.innerText = "Hola " + localStorage.user
}


let blockConfirm = document.querySelector('#block_next')
let btnNext = document.querySelector('#people_next')

let blockSave = document.querySelector('#block_save')
let btnSave = blockSave.querySelector('.btn-green')
btnSave.style.display = "none"


// --------------------------------------------------------------------------------------------------------------------

function generateJSON() {

    kitchenDict = []
    let datos = []

    let kitchenCheck = document.querySelectorAll(".btn-kit i.check")
    let kitchenPressed = document.querySelectorAll(".btn-kit img.pressed")

    for (let i = 0; i < kitchenPressed.length; i++) {

        let result = kitchenPressed[i].closest(".btn-kit").id
        datos.push({
            user_profile: localStorage.id,
            app_name: result
        })
    }

    for (let i = 0; i < kitchenCheck.length; i++) {

        let result = kitchenCheck[i].closest(".btn-kit").id
        datos.push({
            user_profile: localStorage.id,
            app_name: result
        })
    }

    return datos
}


function dumpJSON(datos) {

    for (let i = 0; i < datos.length; i++) {

        if (datos[i].app_name == "olla de presion") {
            document.getElementById("olla_de_presion").firstElementChild.classList.add(kitchenIcon["olla_de_presion"])
        } else {
            document.getElementById(datos[i].app_name).firstElementChild.classList.add(kitchenIcon[datos[i].app_name])
        }
    }
}


// -------------------------------------------------------------------------------------------------------------------------------

// RETRIEVE USER PROFILE
const retrieveProfile = async() => {

    const data = await fetch(`${API_URL}users/profiles/apps/?search=${localStorage.id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })

    const dataResult = await data.json() //dumpJSON(dataResult) -> could be optional do it here or into a "then"
    console.log("AJAX Fetch Result:", dataResult)

    return dataResult
}


// POST USER PROFILE
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
    window.location.href = "sugerencias.html"
})


btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    lockFunctions = true

    dataToSend = generateJSON()
        //console.log("Saving this AJAX POST before to go", dataToSend)

    try {
        let response = postFetch("users/profiles/apps/", dataToSend)
        setTimeout(function() { window.location.href = "#" }, 2000);

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




/*  TO BE VALIDATED
    let kitchenPressed = document.querySelectorAll(".btn-kit i.pressed")

    for (let i = 0; i < kitchenPressed.length; i++) {
        console.log(i.parentNode)
    }
    */