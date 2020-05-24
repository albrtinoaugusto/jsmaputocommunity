const classForm = document.querySelector("#write_subsjects");
classForm.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let description = document.getElementById("f_desc");
    let grade = document.getElementById("f_grade");

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
            grade: grade.value
        }

        db.collection("subjects").add(obj).then(function (sub){
            return db.collection("subjects").doc(sub.id).update({id: sub.id});
        }).then(function () {
   
            grade.value = 8;
            description.value = "";
            sucessAlert("Disciplina cadastrada com sucesso.");
        }).catch(err => {
            console.log(err.message);
            infoAlert("Erro ao cadastrar.");
        });
    }

    count = 0;
});

