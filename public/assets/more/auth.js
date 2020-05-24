function checkIntegrity(username, password) {
    auth.signInWithEmailAndPassword(username, password).then((credentials) => {

        let reference = "students";
        if (username.includes("@root.")) {
            reference = "admins";
        }

        var docRef = db.collection(reference).doc(credentials.user.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                localStorage.setItem('data', JSON.stringify(doc.data()));

                if (doc.data().type === "x") {
                    document.location = "../student/"
                } else if (doc.data().type === "y") {
                    document.location = "../administration/manage/"
                } else if (doc.data().type === "z") {
                    document.location = "../administration/admin/list/"
                } else {
                    localStorage.removeItem("data");
                }
            }
            else{
                closeIntegrity();
            }
        }).catch(function(error) {
            console.log({ message: "Erro ao buscar o documento!" });
        });
    }).catch(err => {
        console.log({ message: err.message })
        infoAlert("E-mail ou senha incorrecto (s).");
    })
}


function checkTeacherIntegrity(username, password) {
    auth.signInWithEmailAndPassword(username, password).then((credentials) => {
        var docRef = db.collection("teachers").doc(credentials.user.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                localStorage.setItem('data', JSON.stringify(doc.data()));
                
                if (doc.data().type === "w") {
                    document.location = "../../teacher/"
                } 
            }
            else{
                closeIntegrity();
            }
        }).catch(function(error) {
            console.log(error.message);
        });
    }).catch(err => {
        console.log(err.message)
        infoAlert("E-mail ou senha incorrecto (s).");
    })
}


function closeIntegrity() {
    auth.signOut().then(() => {
        localStorage.removeItem('data');

        let origin = window.location.origin
        if (!origin.includes("public")) {
            origin += "/public"
        }
        window.location = origin + "/tchitchinha/login/"
    })
}