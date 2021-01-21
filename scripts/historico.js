$(document).ready(() => {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    $('#welcome').text(`Bem vindo, ${user.name}!`)

    const historicRows = user.historico || [];
    historicRows.forEach(row => {
        const elem = $(`<tr><td>${row.treino}</td><td>${row.data}</td><td>${row.duracao}</td><td>${row.calorias}</td></tr>`)
        $("#historicTable > tbody").append(elem) 
    });

    $('#saveHistory').on('click', () => {
        const treino = $("#treino option:selected").val()

        const date = new Date($('#data').val());
        const dayInt = date.getDate();
        let day = `${dayInt}`
        day = day.length < 2 ? `0${day}` : day
        const monthInt = date.getMonth() + 1;
        let month = `${monthInt}`
        month = month.length < 2 ? `0${month}` : month
        const year = date.getFullYear();
        const data = [day, month, year].join('/')

        const duracao = $("#duracao").val() + " min"

        const calorias = $("#calorias").val() + " kcal"

        historicRows.push({
            treino,
            data,
            duracao,
            calorias
        })

        historicRows.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0))
        user.historico = historicRows
        $('#addSessionModal').modal('toggle');
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        reloadScreen()
    })

    const caloriesHistoric = user.caloriesHistoric || []
    caloriesHistoric.forEach(row => {
        const elem = $(`<tr><td>${row.data}</td><td>${row.calorias_ing} kcal</td><td>${row.calorias_gas} kcal</td><td>${row.calorias_diff} kcal</td></tr>`)
        $("#caloriesList > tbody").append(elem) 
    });

    $('#saveCalories').on('click', () => {
        const date = new Date($('#dataCalorias').val());
        const dayInt = date.getDate();
        let day = `${dayInt}`
        day = day.length < 2 ? `0${day}` : day
        const monthInt = date.getMonth() + 1;
        let month = `${monthInt}`
        month = month.length < 2 ? `0${month}` : month
        const year = date.getFullYear();
        const data = [day, month, year].join('/')

        const calorias_ing = parseInt($("#calorias_ing").val())

        const calorias_gas = parseInt($("#calorias_gas").val())

        const calorias_diff = calorias_ing - calorias_gas

        caloriesHistoric.push({
            data,
            calorias_ing,
            calorias_gas,
            calorias_diff
        })

        caloriesHistoric.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0))

        user.caloriesHistoric = caloriesHistoric
        $('#addCaloriesModal').modal('toggle');
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        reloadScreen()
    })


})

function reloadScreen() {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"))
    $("#historicTable > tbody").empty()
    const historicRows = user.historico || [];
    historicRows.forEach(row => {
        const elem = $(`<tr><td>${row.treino}</td><td>${row.data}</td><td>${row.duracao}</td><td>${row.calorias}</td></tr>`)
        $("#historicTable > tbody").append(elem) 
    });

    $("#caloriesList > tbody").empty()
    const caloriesHistoric = user.caloriesHistoric || []
    caloriesHistoric.forEach(row => {
        const elem = $(`<tr><td>${row.data}</td><td>${row.calorias_ing} kcal</td><td>${row.calorias_gas} kcal</td><td>${row.calorias_diff} kcal</td></tr>`)
        $("#caloriesList > tbody").append(elem) 
    });
}