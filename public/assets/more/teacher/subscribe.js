const classForm = document.querySelector("#asign");
classForm.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let numDoc = document.getElementById("numDoc").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("f_pass").value;
    let repass = document.getElementById("f_repass").value;

    let msg = "";

    if (numDoc === null || numDoc.length === 0 && msg.length === 0) {
        msg = "Esqueceu de informar o número do documento.";
    }

    if (email === null || email.length === 0 && msg.length === 0) {
        msg = "Esqueceu de informar o seu email.";
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

        let teacherObjSample = {
            numDoc: numDoc,
            email: email, 
            pass: pass
        };

        checkAllowedId(numDoc, teacherObjSample);
    }

    count = 0;
});


function checkAllowedId(allowedId, teacherObjSample){

    db.collection('allowedids').doc(allowedId).get().then(doc => {
        if (doc.exists) {
            //console.log(doc.data());
            addTeacher(teacherObjSample);
        } else {
            infoAlert("Número de Documento não associado a plataforma.");
        }
    }).catch(err =>{
        console.log(err.message);
        infoAlert("Ocorreu um erro a verificar.");
    });
}


function addTeacher(teacherObjSample){

    auth.createUserWithEmailAndPassword(teacherObjSample.email, teacherObjSample.pass).then(credentials => {
        let uid = credentials.user.uid;

        let obj = {
            id: uid,
            email: teacherObjSample.email,
            date: dateTimeResponse,
            numDoc: teacherObjSample.numDoc,
            type: "w"
        }

        localStorage.setItem('data', JSON.stringify(obj));
        return db.collection("teachers").doc(uid).set(obj);
    }).then(() => {
        document.location = "../../../teacher/";
    }).catch(err => {
        if (err.message === "The email address is already in use by another account.") {
            infoAlert("Existe um Professor cadastrado com este E-mail.");
        } else {
            console.log(err.message);
            infoAlert("Ocorreu um erro ao criar a conta.");
        }
    });
}
