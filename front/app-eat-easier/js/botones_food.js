console.log("hola")
const API_URL = "http://localhost:8000/api/"

//pereferred_food

let res = document.querySelector('#res')
let pollo = document.querySelector('#pollo')
let cerdo = document.querySelector('#cerdo')
let pescado = document.querySelector('#pescado')
let huevo = document.querySelector('#huevo')
let cheese = document.querySelector('#cheese')
let frutas = document.querySelector('#frutas')
let verduras = document.querySelector('#verduras')
let gluten = document.querySelector('#gluten')


let res_pref = {
    user_profile: 5,
    food_type: "res"
}
console.log(res_pref)






//fetch
const postFetch = async(datos) => {
    const data = await fetch(`${API_URL}users/profiles/food/`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
    return await data
}


// FOOD ICONS EVENT HANDLERS


res.addEventListener('click', (e) => {

    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    } // e.target.classList
})





pollo.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

cerdo.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

pescado.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

huevo.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

lacteos.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

frutas.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

verduras.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})

gluten.addEventListener('click', (e) => {
    console.log(e.target.classList)

    if (e.target.classList.contains('check')) {

        e.target.classList.remove('check')

    } else {
        e.target.classList.add('check')
    }
    // e.target.classList
})



let food_next = document.querySelector('#food_next')

food_next.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('click')
    let response = postFetch(foodPreference)
    if (response.status === 200 || response.status === 201) {
        location.href = "pereferred_food.html"

    }
})