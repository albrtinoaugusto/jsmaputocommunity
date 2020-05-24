auth.onAuthStateChanged(user => {
    if (!user) {
        localStorage.removeItem('data');

        let origin = window.location.origin
        if (!origin.includes("public")) {
            origin += "/public"
        }
        window.location = origin + "/tchitchinha/login/"
    }
})