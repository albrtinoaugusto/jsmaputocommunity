var myData = JSON.parse(localStorage.getItem("data"));

function setData() {
    if (myData !== null && typeof(myData) !== "undefined") {
        document.getElementById("f_name").value = myData.name;
        document.getElementById("f_surname").value = myData.surname;
        document.getElementById("f_mail").value = myData.email;
    }
}

const formUpdate = document.querySelector("#admin_update");
formUpdate.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let name = document.getElementById("f_name");
    let surname = document.getElementById("f_surname");
    let email = document.getElementById("f_mail");
    let pass = document.getElementById("f_pass");
    let repass = document.getElementById("f_repass");


    let msg = "";
    let count = 0;

    if (name.value === null || name.value.length === 0) {
        count++;
    }

    if (surname.value === null || surname.value.length === 0) {
        count++;
    }

    if (email.value === null || email.value.length === 0) {
        msg = "Não esqueça de informar seu e-mail.";
    }

    if (pass.value !== null && pass.value.length > 0 || repass.value !== null && repass.value.length > 0) {

        if (pass.value === null || pass.value.length === 0 && count === 0) {
            count++;
            msg = "Esqueceu de informar sua Senha.";
        }

        if (repass.value === null || repass.value.length === 0 && count === 0) {
            count++;
            msg = "Confirme a sua Senha.";
        }


        if (count === 0) {
            if (pass.value.length < 6) {
                count++;
                msg = "A sua senha deve ter um mínimo de 6 Dígitos.";
            } else {
                if (pass.value !== repass.value) {
                    count++;
                    msg = "Senhas diferente! Confirme a sua Senha.";
                }
            }
        }
    }

    if (count > 0) {
        emptyFieldAlert(msg);
    } else {
        waitAlert();

        db.collection("admins").doc(myData.id).update({
            name: name.value,
            surname: surname.value,
            email: email.value,
            avatar: myData.avatar,
            type: myData.type
        }).then(() => {

            //Changing Password
            if (pass.value.length > 0) {
                auth.currentUser.updatePassword(pass.value).then(function() {
                    console.log("Password updated");
                    sucessAlert("Dados actualizados com sucesso.");
                }).catch(function(error) {
                    console.log(error)
                });
            } else {
                sucessAlert("Dados actualizados com sucesso.");
            }

            document.getElementById("f_name").value = "";
            document.getElementById("f_surname").value = "";
            document.getElementById("f_mail").value = "";
            document.getElementById("f_pass").value = "";
            document.getElementById("f_repass").value = "";

        }).catch(err => {
            console.log(err.message)
        })
    }

    count = 0;
});