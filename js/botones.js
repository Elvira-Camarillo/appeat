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

fillAdultRow(5)
}
})


// ----------------------------------------------------------------------------------------------------------

// ALGORITHM FOR CHILD COLOR TOGGLE SELECTOR 


let child1 = document.querySelector('#child1')
let child2 = document.querySelector('#child2')
let child3 = document.querySelector('#child3')
let child4 = document.querySelector('#child4')
let child5 = document.querySelector('#child5')


// ADULT ICONS EVENT HANDLERS

child1.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }

        fillChildRow(1)
    }
})

child2.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }

        fillChildRow(2)
    }
})

child3.addEventListener('click', (e) => {
    // console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }

        fillChildRow(3)
    }
})

child4.addEventListener('click', (e) => {
    // console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }

        fillChildRow(4)
    }
})

child5.addEventListener('click', (e) => {
    //console.log(e.target.classList)

    if (lockFunctions === false) {
        if (e.target.classList.contains('check')) {

            e.target.classList.remove('check')

        } else {
            e.target.classList.add('check')
        }

        fillChildRow(5)
    }
})


// ---------------------------------------------------------------------------------------------------------------


function fillAdultRow(fill_num) {

    if (lockFunctions === false) {

        people_qty.adults_qty = fill_num

        for (i = 0; i < adult_row.children.length; i++) {
            if (i < fill_num) {
                adult_row.children[i].querySelector("i").classList.add("check")
            } else {
                adult_row.children[i].querySelector("i").classList.remove("check")
            }
        }
    }
}


function fillChildRow(fill_num) {

    if (lockFunctions === false) {

        people_qty.child_qty = fill_num

        for (i = 0; i < child_row.children.length; i++) {
            if (i < fill_num) {
                child_row.children[i].querySelector("i").classList.add("check")
            } else {
                child_row.children[i].querySelector("i").classList.remove("check")
            }
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------

// USER ID INITIAL CONFIGURATION

let welcome = document.getElementById('user_welcome')

if (localStorage.length > 1) {
    welcome.innerText = "Hola " + localStorage.user
    people_qty.user_profile = localStorage.id
}


let blockConfirm = document.querySelector('#block_next')
let btnNext = document.querySelector('#people_next')

let blockSave = document.querySelector('#block_save')
let btnSave = blockSave.querySelector('.btn-green')
btnSave.style.display = "none"


// -------------------------------------------------------------------------------------------------------------------------------

function updateCounters(profileData) {

    people_qty.user_profile = profileData[0].user_profile
    people_qty.adults_qty = profileData[0].adults_qty
    people_qty.child_qty = profileData[0].child_qty

    // console.log("People Qty Updated: ", people_qty)
}


// -------------------------------------------------------------------------------------------------------------------------------

// RETRIEVE USER PROFILE
const retrieveProfile = async() => {

    const data = await fetch(`${API_URL}users/profiles/qty/?search=${people_qty.user_profile}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })

    const dataResult = await data.json()
    updateCounters(dataResult)
        //console.log("AJAX Fetch Result:", dataResult)

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
    window.location.href = "preferred_food.html"
})


btnSave.addEventListener('click', (e) => {
    e.preventDefault()
    lockFunctions = true

    try {
        let response = postFetch("users/profiles/qty/", people_qty)
        setTimeout(function() { window.location.href = "preferred_food.html" }, 3000);

    } catch (error) {
        console.log(error)

    }

})

// ---------------------------------------------------------------------------------------------------------------


function handleEmptyProfile(errorMsg) {

    lockFunctions = false
    console.log("My Response Catch Error: ", errorMsg)

    blockConfirm.querySelector('.btn-nar').style.display = "none"
    blockConfirm.style.display = "none"

    btnSave.style.display = "block"

}

window.addEventListener('load', (e) => {

    let myResponse = retrieveProfile()

    myResponse.then(console.log("AJAX Retrieve in Main", myResponse.dataResult))
    myResponse.then(() => { fillAdultRow(people_qty.adults_qty) })
    myResponse.then(() => { fillChildRow(people_qty.child_qty) })
    myResponse.then(() => { lockFunctions = true })
    myResponse.catch((error) => { handleEmptyProfile(error) })

})


/*
    Algoritmo para pasar de Back-End a Front-End por Ajax

    1. Sacar los datos de perfil necesarios de LocalStorage
    2. Hacer el retrieve através de FETCH
    3. En base a los datos obtenidos, hay que pintar
    los respectivos iconos
    4. Dada la estructura que ya existe, las variables relacionadas
    de conteo se deben de actualizar en automático con el punto 3
    5. Configurar el Botón de Enviar
        a. Si es un usuario nuevo la lista deberia de regresar vacia
        por lo tanto hay que configurar el botón de siguiente como POST
        para que se genere en la base de datos
        b. Si es un usuario existente solamente seria visualización y
        mostrar un modal para proteger modificaciones por lo pronto
        c. y más adelante seria agregar un botón de modificación


    Algoritmo para pasar de Front-End 
    a Back-End por Ajax

    // Obtner el feedback por parte del usuario

    1. Ir a la fila de adultos y encontrar la posición
    seleccionada
    2. Lo mismo con la de niños

    // Generar los respectivos end-points en BE

    3. Generar la estructura JSON como lo pide el Back-End
    4. Llenar dicha estructura de acuerdo a las opciones
    seleccionadas
    5. Ir a Local Storage y obtener los datos del Perfil
    del usuario para identificarse ante el BE

    // Generar las comunicaciones necesarias

    6. Generar un Ajax Post para que se guarde en BE
    7. Tener una respuesta de confirmación del BE
    8. Guardar dicha selección en el Local Storage para
    evitar hacer demasiadas requisiciones al BE
    9. Manejar la navegación para ir a la sig. Pantalla

*/



// -----------------------------------------------------------------------
// CODE BACK-UP
// Under Review
// -----------------------------------------------------------------------

/*
function getAdultNumber() {

    adult_count = 0

    for (i = 0; i <= adult_row.children.length - 1; i++) {

        item = adult_row.children[i].querySelector("i") //.classList
        console.log("Item[" + i + "]: ", item)

        for (j = 0; j <= adult_row.children[i].querySelector("i").classList.length - 1; j++) {
            console.log("class type[" + j + "]: ", adult_row.children[i].querySelector("i").classList[j])

            if (adult_row.children[i].querySelector("i").classList[j] == "check") {
                adult_count = i + 1
            }

        }
    }

    console.log("El número de adultos es: ", adult_count)
    return adult_count

}
*/