const form = document.querySelector("#add_admin");
form.addEventListener("submit", function(ev) {
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

    if (count > 0) {
        emptyFieldAlert(msg);
    } else {
        waitAlert();
        
        auth.createUserWithEmailAndPassword(email.value, pass.value)
            .then(credentials => {
                return db.collection("admins").doc(credentials.user.uid).set({
                    id: credentials.user.uid,
                    name: name.value,
                    surname: surname.value,
                    email: email.value,
                    type: "y"
                });
            }).then(() => {

                name.value = "";
                surname.value = "";
                email.value = "";
                pass.value = "";
                repass.value = "";

                sucessAlert("Administrador cadastrado com sucesso.");
            }).catch(err => {
                infoAlert("Erro ao cadastrar.");
            });
    }

    count = 0;
});