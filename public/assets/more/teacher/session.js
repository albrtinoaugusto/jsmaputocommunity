auth.onAuthStateChanged(user => {

    let origin = window.location.origin
    if (!origin.includes("public")) {
        origin += "/public"
    }

    if (!user) {
        window.location = origin + "/tchitchinha/login/";
    } else {
        db.collection("teachers").doc(user.uid).get().then((doc) => {
            let teacher = doc.data();
            if (teacher.type !== "w" && teacher.type !== "z") {
                window.location = origin + "/tchitchinha/login/";
            }
        }).catch(err => {
            console.log(err.message);
            //window.location = origin + "/tchitchinha/login/";
        });
    }
})