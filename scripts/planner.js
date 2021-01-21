$(document).ready(() => {
    $("#datepicker").datepicker({
        format: "dd/mm/yyyy",
        inline: true,
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    }).on("changeDate", () => {
        showWorkouts()
    })
    $("#datepicker").datepicker("update", new Date())
    showWorkouts()
    $(".workoutPicker").hide()

    $("#addWorkout").on("click", (e) => {
        e.stopImmediatePropagation()

        $("#addWorkout").hide()
        $(".workoutPicker").show()
    })

    $(".workoutPicker .btn-danger").on("click", (e) => {
        e.stopImmediatePropagation()
        $("#addWorkout").show()
        $(".workoutPicker").hide()
    })

    $(".workoutPicker .btn-primary").on("click", (e) => {
        e.stopImmediatePropagation()

        const refDate = $("#datepicker").data('datepicker').getFormattedDate("dd/mm/yyyy");

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {}

        const treino =  $("#workoutSelector option:selected").val()

        const workouts = loggedUser.workouts[refDate] || []
        workouts.push({
            treino,
            descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a tincidunt sapien. Mauris nisl enim, bibendum nec faucibus quis, suscipit molestie quam. Aliquam viverra feugiat sapien. Phasellus cursus semper nunc."
        })
        loggedUser.workouts[refDate] = workouts
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
        $("#addWorkout").show()
        $(".workoutPicker").hide()
        showWorkouts()
    })
})

function showWorkouts() {
    const refDate = $("#datepicker").data('datepicker').getFormattedDate("dd/mm/yyyy");

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || {}

    const workouts = loggedUser.workouts[refDate] || []
    $("#workouts").empty()

    if (workouts.length == 0) {
        $("#workouts").append(
            $(`<h4 style="margin-top: 20px">Não tem workouts planeados para esta data</h4>`)
        )
    } else {
        workouts.forEach(workout => {
            $("#workouts").append(
                $(`<div style="padding-bottom: 4vh"><h5 style="font-weight:bold">${workout.treino}</h5><p style="text-align:justify; text-justify:inter-word">${workout.descricao}</p></div>`)
            )
        });
    }

}