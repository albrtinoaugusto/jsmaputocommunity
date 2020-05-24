var grade = "";

function setGrade(g){
    grade = g;
}


const siginUpForm = document.querySelector("#form_signup");
siginUpForm.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let name = document.getElementById("f_name").value;
    let email = document.getElementById("f_email").value;
    let pass = document.getElementById("f_pass").value;
    let repass = document.getElementById("f_repass").value;

    let msg = "";

    if (name === null || name.length === 0) {
        msg = "Esqueceu de informar o seu nome.";
    }

    let hasEmail = true;
    if (email === null || email.length === 0 && msg.length === 0) {
        msg = "Informe o seu Email.";
        hasEmail = false;
    }

    if (hasEmail && msg.length === 0) {
        let contains = email.toString().includes("@");
        let contains2 = email.toString().includes(".");
        let contains3 = email.toString().includes("@.");

        if (contains === false && contains2 === false && msg.length === 0) {
            msg = "Normalmente os e-mails tem um '@' e um '.'";
        } else {
            if (contains === false && contains2 === true && msg.length === 0) {
                msg = "Normalmente os e-mails tem um '@'";
            }

            if (contains2 === false && contains === true && msg.length === 0) {
                msg = "Um e-mail sem '.'?";
            }

            if (contains3 === true && msg.length === 0) {
                msg = "Informe seu e-mail correctamente.";
            }
        }
    }


    if (pass === null || pass.length === 0 && msg.length === 0) {
        msg = "Esqueceu de informar sua senha.";
    }

    if (repass === null || repass.length === 0 && msg.length === 0) {
        msg = "Confirme a sua senha.";
    }

    if (pass !== null && pass.length > 0 && repass !== null && pass.length > 0 && msg.length === 0) {
        if (pass.length < 6) {
            msg = "A sua senha deve ter um mínimo de 6 Dígitos.";
        } else {
            if (pass !== repass) {
                msg = "Senhas diferentes! confirme a sua senha.";
            }
        }
    }

    if (msg.length > 0) {
        emptyFieldAlert(msg);
    } else {
        waitAlert();
        
        auth.createUserWithEmailAndPassword(email, pass).then(credentials => {
            let uid = credentials.user.uid;

            let obj = {
                id: uid,
                name: name,
                email: email,
                date: dateTimeResponse,
                type: "x"
            }
            localStorage.setItem('data', JSON.stringify(obj));
            return db.collection("students").doc(uid).set(obj);
        }).then(() => {
            if (grade.length > 0) {
                document.location = "step-2/?grade=" + grade;
            }
            else {
                document.location = "../../student/";
            }   
        }).catch(err => {
            if (err.message === "The email address is already in use by another account.") {
                infoAlert("Existe um Estudante cadastrado com este E-mail.");
            } else {
                console.log(err.message);
                infoAlert("Ocorreu um erro ao criar a conta.");
            }
        });
    }

});