let tIdBody = document.getElementById("tIdBody");

const classForm = document.querySelector("#allowTeacher");
classForm.addEventListener("submit", function (ev) {
    ev.preventDefault();

    let num = document.getElementById("f_num");

    let msg = "";
    let count = 0;

    if (num.value === null || num.value.length === 0) {
        count++;
        msg = "Esqueceu de informar o Número do Documento.";
    }

    if (count > 0) {
        emptyFieldAlert(msg);
    } else {
        waitAlert();

        let firstTd = document.getElementById("firstTd");
        if (firstTd !== null && typeof (firstTd.innerHTML) !== "undefined" && firstTd.innerHTML !== null) {
            tIdBody.innerHTML = "";
        }

        db.collection("allowedids").doc(num.value).set({id: num.value}).then(() => {
            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.style = "color: white";
            td1.innerText = num.value;

            let td2 = document.createElement("td");
            td2.style = "color: white";
            td2.innerHTML = "<label class='badge badge-success'>Permitido</label>";

            tr.appendChild(td1);
            tr.appendChild(td2)
            tIdBody.appendChild(tr);

            sucessAlert("Pre-registo efectuado com sucesso.");
        }).catch(err => {
            console.log(err.message);
            infoAlert("Erro ao cadastrar.");
        });
    }

    count = 0;
});

