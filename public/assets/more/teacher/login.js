const classForm = document.querySelector("#goTeacher");
classForm.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let username = document.getElementById("f_mail").value
    let password = document.getElementById("f_pass").value

    if (username !== null && username.length > 0 && password !== null && password.length > 0) {
        let contains = username.toString().includes("@");
        let contains2 = username.toString().includes(".");
        let contains3 = username.toString().includes("@.");

        let msg = "";

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

        if (msg.length === 0) {
            waitAlert();
            checkTeacherIntegrity(username, password)
        } else {
            infoAlert(msg);
        }
    } else {
        emptyFieldAlert("")
    }
});

