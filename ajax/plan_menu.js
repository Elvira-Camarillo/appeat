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
})
document.getElementById("comida-favorita").innerHTML = comidas
})

})

$("#tipo-cena").change(async() => {
    filtrarComida($("#tipo-cena").val())
        .then(function(data) {

            let comidas = '<option id="recipe_title" value="elegir">Elegir receta</option>'
            data.forEach((cena) => {
                comidas += `
                <option  
                    value="${cena.id }"
                    data-recipeid="${cena.cat_recipe.id }"
                    data-id="${cena.id}"
                >${cena.cat_recipe.title}</option>
                `
            })
            document.getElementById("cena-favorita").innerHTML = comidas
        })

})





function generateWeekNum(start_date) {

    let now = new Date(start_date);
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7) - 1;

    console.log(week);
    return week
}



function modalHandler() {

    if (localStorage.length > 1) {
        myModal1._element.querySelector('#modal_message').innerText = "LISTO !!! Por favor presiona siguiente"
        myModal1._element.querySelector("#modal_continue").style.display = "block"
    } else {
        myModal1._element.querySelector('#modal_message').innerText = "Por favor revisa tus datos de nuevo"
        myModal1._element.querySelector("#modal_back").style.display = "block"
    }

}


function guardarTiempo() {
    let meal_date = document.getElementById("myDatePicker")
        // console.log(meal_date)
}




$(document).ready(async() => {

    my_container = document.querySelector(".json_container")
    my_template_item = my_container.children[0]



    $('#myDatePicker').datepicker({
        format: "yyyy-mm-dd",
        language: "es",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    })

    $('#myDatePicker').datepicker().on('changeDate', function(e) {
        user_period_start = $('#myDatePicker').datepicker('getFormattedDate')
            //console.log(user_period_start.toString())
    })

    $("#tipo-desayuno").val("desayuno").trigger("change")
    $("#tipo-comida").val("comida").trigger("change")
    $("#tipo-cena").val("cena").trigger("change")

    $('#guardar_menu').click(() => {
        var done = false
        var meal_date = $('#myDatePicker').val()
        var idDesayuno = $('#desayuno-favorito').val()
        var idComida = $('#comida-favorita').val()
        var idCena = $('#cena-favorita').val()

        //console.log(id, user_planner, meal_date, meal_type, user_recipe, done)
        $.post(`${API_URL}users/profiles/planner/menu/ `, {

            user_planner: parseInt(localStorage.getItem('user_planner_id')),
            meal_date: meal_date,
            meal_type: "desayuno",
            user_recipe: idDesayuno,
            done: done
        }).done(function(data) {
            // console.log('desayuno guardado')
            $.post(`${API_URL}users/profiles/planner/menu/ `, {

                user_planner: parseInt(localStorage.getItem('user_planner_id')),
                meal_date: meal_date,
                meal_type: "comida",
                user_recipe: idComida,
                done: done
            }).done(function(data) {
                // console.log('comida guardada')
                $.post(`${API_URL}users/profiles/planner/menu/ `, {

                    user_planner: parseInt(localStorage.getItem('user_planner_id')),
                    meal_date: meal_date,
                    meal_type: "cena",
                    user_recipe: idCena,
                    done: done
                }).done(function(data) {
                    //console.log('Cena guardada')
                    window.location.href = 'ver_menu.html'
                })
            })
        })
    })


});