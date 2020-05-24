var myData = JSON.parse(localStorage.getItem("data"));

function showData() {

    if (myData !== null) {
        //Grade setting

        if (typeof(myData.name) !== "undefined" || myData.name !== null) {
            document.getElementById("f_name").value = myData.name;
        }

        if (typeof(myData.surname) !== "undefined" || myData.surname !== null) {
            document.getElementById("f_surname").value = myData.surname;
        }

        if (typeof(myData.phone) !== "undefined" || myData.phone !== null) {
            document.getElementById("f_phone").value = myData.phone;
        }

        if (typeof(myData.numDoc) !== "undefined" || myData.numDoc !== null) {
            document.getElementById("f_num_doc").value = myData.numDoc;
        }

        if (typeof(myData.address) !== "undefined" || myData.address !== null) {
            document.getElementById("f_address").value = myData.address;
        }

        if (typeof(myData.email) !== "undefined" || myData.email !== null) {
            document.getElementById("f_mail").value = myData.email;
        }

    }
}



const formUpdate = document.querySelector("#updateAll");
formUpdate.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let name = document.getElementById("f_name");
    let surname = document.getElementById("f_surname");
    let phone = document.getElementById("f_phone");
    let numDoc = document.getElementById("f_num_doc");
    let address = document.getElementById("f_address");
    let email = document.getElementById("f_mail");
    let pass = document.getElementById("f_pass");
    let repass = document.getElementById("f_repass");

    let msg = "";
    let count = 0;


    if (name.value === null || name.value.length === 0) {
        count++;
        msg = "Esqueceu de informar o seu nome.";
    }

    if (surname.value === null || surname.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o seu apelido.";
    }

    if (phone.value === null || phone.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o número de celular.";
    }


    if (numDoc.value === null || numDoc.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o número do documento.";
    } else {
        if (numDoc.value.length > 0 && numDoc.value.length < 4) {
            count++;
            msg = "O número do documento deve ter um mínimo de 4 Dígitos.";
        }
    }

    
    if (address.value === null || address.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o seu endereço.";
    }


    if (count > 0) {
        infoAlert(msg);
    } else {

        waitAlert();
        
        let updateTeacher = {
            id: myData.id,
            name: name.value,
            surname: surname.value,
            phone: phone.value,
            numDoc: numDoc.value,
            address: address.value,
            email: email.value
        }

        db.collection("teachers").doc(myData.id).update(updateTeacher).then(() => {
            localStorage.setItem("data", JSON.stringify(updateTeacher));

            //Changing Email
            if (email.value !== myData.email) {
                auth.currentUser.updateEmail(email.value).then(function() {
                    console.log("Email updated")
                }).catch(function(error) {
                    console.log(error)
                });
            }

            //Changing Password
            if (pass.value.length > 0 && pass.value === repass.value) {
                auth.currentUser.updatePassword(pass.value).then(function() {
                    console.log("Password updated")
                }).catch(function(error) {
                    console.log(error)
                });
            }
    
            sucessAlert("Dados actualizados com sucesso.");
        }).catch(err => {
            console.log(err)
        })
    }
});