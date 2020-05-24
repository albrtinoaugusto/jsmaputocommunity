auth.onAuthStateChanged(user => {

    let origin = window.location.origin
    if (!origin.includes("public")) {
        origin += "/public"
    }

    if (!user) {
        window.location = origin + "/tchitchinha/login/";
    } else {
        db.collection("admins").doc(user.uid).get().then((doc) => {
            let admin = doc.data();
            if (admin.type !== "y" && admin.type !== "z") {
                window.location = origin + "/tchitchinha/login/";
            }
        }).catch(err => {
            console.log(err.message);
            //window.location = origin + "/tchitchinha/login/";
        });
    }
})