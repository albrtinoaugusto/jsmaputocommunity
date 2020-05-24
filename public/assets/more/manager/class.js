const classForm = document.querySelector("#write_class");
classForm.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let description = document.getElementById("f_desc");
    let romNumber = document.getElementById("f_rom");

    let msg = "";
    let count = 0;

    if (description.value === null || description.value.length === 0) {
        count++;
        msg = "Esqueceu de informar descrição da turma.";
    }


    if (count > 0) {
        emptyFieldAlert(msg);
    } else {
        waitAlert();
        
        let obj = {
            description: description.value,
            rom: romNumber.value,
            students: 0
        }

        db.collection("classes").add(obj).then(function (cl){
            return db.collection("classes").doc(cl.id).update({id: cl.id});
        }).then(function () {
            return db.collection("refreshes").doc("A9lDah36qjNXcWCfMmMU").get();
        }).then(() => {
            romNumber.value = 1;
            description.value = "";
            sucessAlert("Turma cadastrada com sucesso.");
        }).catch(err => {
            console.log(err.message);
            infoAlert("Erro ao cadastrar.");
        });
    }

    count = 0;
});

