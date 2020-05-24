var reference = "";

window.onload = function() {
    try {
        let urlStr = (window.location.href);
        let url = new URL(urlStr);
        let grade = url.searchParams.get("grade");
        //console.log(grade);
        reverseData(grade)
    } catch (err) {
        console.log(err)
    }
}

function reverseData(ref) {
    reference = ref;
}


function enterNumberDialog() {
    swal({
        title: "Pagamento",
        text: "Introduza o número:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "8X XXX XXX X"
    }, function(inputValue) {
        if (inputValue === false) {
            return false;
        }

        if (inputValue === "") {
            swal.showInputError("Introuza o número de celular!");
            return false;
        }
        //swal("Nice!", "You wrote: " + inputValue, "success");
        doTheThing(reference, inputValue);
    });
}


function showNumAcountDialog() {
    swal("Here's a message!", "It's pretty, isn't it?");
}



function doTheThing(ref, phone) {

    $.ajax({
            method: "POST",
            url: "paywithmpesa",
            data: {
                ref: ref,
                phone: phone
            }
        }).done(function(response) {

            if (response === "SESSION") {
                infoAlert("Sessão expirada, renicie a sessão.");
            }

            if (response === "3") {
                //             sucessAlert("Pagamento efectuado com sucesso.");
                document.location = "../information/confirmation/?exception=payment";
            }

            if (response === "2") {
                infoAlert("Sem saldo insuficiente.");
            }

            if (response === "0") {
                infoAlert("Lamentamos! Mas, ocorreu um erro ao debitar.");
            }

            if (response === "00") {
                infoAlert("Lamentamos! Mas, ocorreu um erro ao se conectar ao servidor.");
            }
        })
        .fail(function(xhr, status, errorThrown) {

        });

}