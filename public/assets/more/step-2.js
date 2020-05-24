var done = false;
var done2 = false;


function prepareEverthing(grade) {
    let gradeInt = parseInt(grade);

    let descLabel = document.getElementById("descLabel");

    if (gradeInt == 8 || gradeInt == 9 || gradeInt == 10) {
        descLabel.innerHTML = "Certificado da 7ª Classe";
    }
    else {
        descLabel.innerHTML = "Certificado da 10ª Classe";
    }
}

var formUpdate = document.querySelector("#form_step2");
formUpdate.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let student = JSON.parse(localStorage.getItem('data'));

    if (student.doc === null || typeof(student.doc) === "undefined" && student.certificate === null || typeof(student.certificate) === "undefined") {
        infoAlert("Carregue os documentos necessários.");
    } else {
        document.location = "../step-3/";
    }

});