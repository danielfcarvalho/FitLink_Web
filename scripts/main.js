if (!window.localStorage.getItem("users")) {
    window.localStorage.setItem("users", JSON.stringify([
        {
            name: "Daniel Carvalho",
            email: "danic96@user.com",
            password: "123456",
            role: "pt"
        },
        {
            name: "Sónia Rodrigues",
            email: "soro90@user.com",
            password: "soro456",
            role: "subscriber",
            historico: [
                {
                    treino: "Treino de Força 1",
                    data: "15/12/2020",
                    duracao: "30 min",
                    calorias: "120 kcal"
                },
                {
                    treino: "Treino de Cardio 1",
                    data: "15/12/2020",
                    duracao: "30 min",
                    calorias: "180 kcal"
                }
            ],
            caloriesHistoric: [{
                data: "15/12/2020",
                calorias_ing: 2000,
                calorias_gas: 300,
                calorias_diff: 1700
            }],
            workouts: {
                "22/01/2021": [{
                    data: "22/01/2021",
                    treino: "Treino de Força 1",
                    descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a tincidunt sapien. Mauris nisl enim, bibendum nec faucibus quis, suscipit molestie quam. Aliquam viverra feugiat sapien. Phasellus cursus semper nunc."
                }, 
            {
                data: "22/01/2021",
                treino: "Treino de Cardio 1",
                descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a tincidunt sapien. Mauris nisl enim, bibendum nec faucibus quis, suscipit molestie quam. Aliquam viverra feugiat sapien. Phasellus cursus semper nunc."
            }]
            }
        }
    ]))
}

const securePages = ["profile.html", "historico.html", "planner.html", "pt_profile.html", "pt_client_profile.html"]
const subscriberPages = ["profile.html", "historico.html", "planner.html"]
const ptPages = ["pt_profile.html", "pt_client_profile.html"]

$(document).ready(function () {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    const href = window.location.href.split("/")
    const page = href[href.length - 1]
    if (!loggedUser) {

        if (securePages.includes(page)) {
            window.location.href = "login.html"
        }
    } else {
        const loggedUserIsPt = loggedUser.role === "pt"
        console.log(loggedUser)

        if (loggedUserIsPt) {
            console.log(page)
            if (subscriberPages.includes(page))
                window.location.href = "pt_profile.html"
        } else {
            if (ptPages.includes(page)) {
                window.location.href = "profile.html"
            }

        }
    }

    $('input[type=radio][name=role]').on("change", function () {

        if (this.value == 'pt') {
            $('#cliente_select').hide();
        } else {
            $('#cliente_select').show();
        }
    })

    $('#submit_registar').on("click", function (event) {
        event.preventDefault();
        pessoa = {};
        pessoa.name = $("#name").val();
        pessoa.email = $("#email").val();
        pessoa.password = $("#password").val();
        pessoa.role = $('input[type=radio][name=role]:checked').val();
        pessoa.historico = []
        pessoa.caloriesHistoric = []

        const users = JSON.parse(window.localStorage.getItem("users"));
        users.push(pessoa);
        console.log(users);
        window.localStorage.setItem("users", JSON.stringify(users))
        window.localStorage.setItem("loggedUser", JSON.stringify(pessoa))
        window.location = "profile.html";
    })

    $('#submit_login').on("click", function (event) {
        event.preventDefault();
        pessoa = {};
        pessoa.email = $("#email_login").val();
        pessoa.password = $("#password_login").val();
        const users = JSON.parse(window.localStorage.getItem("users"));
        var result = users.filter(function (user) {
            return user.email === pessoa.email && user.password === pessoa.password;
        });
        console.log(result)
        if (result.length === 1) {
            window.localStorage.setItem("loggedUser", JSON.stringify(result[0]))
            window.location = "profile.html";
        } else {
            alert("Utilizador ou palavra-passe incorrecta!")
        }
    })

    $('#logout').on('click', (e) => {
        e.preventDefault()
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
        let users = JSON.parse(localStorage.getItem("users"))
        users = users.filter(user => user.email !== loggedUser.email)
        users.push(loggedUser)
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.removeItem("loggedUser")
        window.location = "login.html"
    })
})