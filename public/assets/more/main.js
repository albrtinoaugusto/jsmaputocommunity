var myData = JSON.parse(localStorage.getItem("data"));

var day = "";
var year = "";
var month = "";
var hours = "";
var minutes = "";
var seconds = "";
var AM_PM = " AM"


var dateTimeString = "";
var dateTimeResponse = "";

function getDate(type) {

    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://ceg-apis.herokuapp.com/get-date?type=' + type);

    xhr.onload = function () {
        console.log(xhr.response);
        setDateOrTime(xhr.responseText);
    }
    xhr.send();

    refresDate();

    // The think
    switch (type) {
        case "month":
            dateTimeResponse = month;
            break;
        case "year":
            dateTimeResponse = year;
            break;
        case "day":
            dateTimeResponse = day;
            break;
        case "time":
            dateTimeResponse = hours + ":" + minutes;
            break;
        case "time-secs":
            dateTimeResponse = hours + ":" + minutes + ":" + seconds;
            break;
    }
}


function refresDate() {
    hours = new Date().getHours();
    day = new Date().getDate() + 1;
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();

    if (hours >= 12){
        AM_PM = " PM";
    }
    
    if (day < 10) {
        day = "0" + day;
    }

    if (month < 10) {
        month = "0" + month;
    }
    
    if (hours < 10) {
        hours = "0" + hours;
    }
    
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    dateTimeString = day + "-" + month + "-" + year + "-AT-" + hours + ":" + minutes + ":" + seconds;
    dateTimeResponse = day + "-" + month + "-" + year + " - " + hours + ":" + minutes + ":" + seconds;
}


function setDateOrTime(responseText) {
    dateTimeResponse = responseText;
    console.log(dateTimeResponse);
}


function checkField(input) {
    if (input.value === null || input.value.length === 0) {
        input.setCustomValidity('Preencha este campo.');
        return false;
    } else {
        input.setCustomValidity("");
        return true;
    }
}


function checkPasswords(input, id) {
    let element = document.getElementById(id);
    if (element.value !== null && element.value.length > 0) {
        if (input.value !== element.value) {
            input.setCustomValidity('Senhas diferentes. Reveja!');
        } else {
            input.setCustomValidity('');
        }
    }
}


function generateEmail(input) {
    let name = input.value;

    if (name !== null && name.length > 0) {
        let newName = name.toLowerCase();
        document.getElementById("f_mail").value = newName + "@root.com";
    } else {
        document.getElementById("f_mail").value = "";
    }
}


function emptyFieldAlert(msg) {
    if (msg === null || msg.length === 0) {
        msg = "Por favor, preecha todos campos.";
    }

    swal({
        title: "Opah!",
        text: msg,
        timer: 2000,
        showConfirmButton: false
    });
}


function infoAlert(msg) {
    if (msg === null || msg.length === 0) {
        msg = "Ocorreu um erro ao executar a operação.";
    }

    swal({
        title: "Opah!",
        text: msg,
        timer: 2000,
        showConfirmButton: false
    });
}


function waitAlert(ms) {
    if (ms === null || typeof(ms) === "undefined" || ms.length === 0){
        ms = "Aguarde...";
    }
    swal({
        title: "",
        text: ms,
        timer: 3000,
        showConfirmButton: false
    });
}



function sucessAlert(msg) {
    if (msg === null || msg.length === 0) {
        msg = "Operação feita com sucesso.";
    }

    swal("Sucesso!", msg, "success");
}


function confirmQuestionAlert(key) {
    swal({
        title: "Tem certeza?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Sim, apaga",
        cancelButtonText: "Não, cancela",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            // Done..
        } else {
            swal("Cancelado", "", "error");
        }
    });
}



function uploadIdDoc(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function () {

            let base64 = reader.result;
            if (!base64.split(",")[0].includes("pdf")) {
                infoAlert("Por favor carregue um arquivo em .PDF")
            } else {
                base64 = base64.split(",")[1];
                let theId = myData.id;

                if (theId === null || theId.length === 0) {
                    theId = "bi"
                }

                waitAlert("A enviar...");

                var uploadTask = bag.ref('ids/' + theId + '/').child('documento.pdf').putString(base64, 'base64', { contentType: 'application/pdf' });
                uploadTask.on('state_changed', function (snapshot) {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    let uploadBtn = document.getElementById("upload-doc");
                    if (typeof (uploadBtn) !== "undefined" && uploadBtn !== null) {
                        uploadBtn.innerText = progress + "%";
                    }

                }, function (error) {
                    console.log(error);
                    infoAlert("Ocorreu um erro au carregar o documento.")
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);

                        db.collection("students").doc(theId).update({
                            doc: downloadURL
                        }).then(() => {
                            var docRef = db.collection("students").doc(theId);
                            docRef.get().then(function (doc) {
                                if (doc.exists) {
                                    localStorage.setItem('data', JSON.stringify(doc.data()));
                                }

                                if (typeof (uploadBtn) !== "undefined" && uploadBtn !== null) {
                                    uploadBtn.innerHTML = "<i class='icon icon-doc'></i> <i class='icon icon-check'></i>";
                                }

                                let viewDiv = document.getElementById("view-div");
                                if (typeof (viewDiv) !== "undefined" && viewDiv !== null) {
                                    var data = JSON.parse(localStorage.getItem("data"));
                                    document.getElementById("id-link").href = data.doc;
                                }

                                sucessAlert("Documento carregado com sucesso!");
                            }).catch(function (error) {
                                console.log({ message: error.message })
                            });
                        });
                    });
                });
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}





function uploadMyCertificate(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function () {

            let base64 = reader.result;
            if (!base64.split(",")[0].includes("pdf")) {
                infoAlert("Por favor carregue um arquivo em .PDF")
            } else {
                base64 = base64.split(",")[1];
                let theId = myData.id;

                if (theId === null || theId.length === 0) {
                    theId = "certificado"
                }

                waitAlert("A enviar...");
                
                var uploadTask = bag.ref('certificates/' + theId + '/').child('certificate.pdf').putString(base64, 'base64', { contentType: 'application/pdf' });
                uploadTask.on('state_changed', function (snapshot) {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    let uploadBtn2 = document.getElementById("upload-doc-2");
                    if (typeof (uploadBtn2) !== "undefined" && uploadBtn2 !== null) {
                        uploadBtn2.innerText = progress + "%";
                    }

                }, function (error) {
                    console.log(error);
                    infoAlert("Ocorreu um erro au carregar o documento.")
                }, function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);

                        db.collection("students").doc(theId).update({
                            certificate: downloadURL
                        }).then(() => {
                            var docRef = db.collection("students").doc(theId);
                            docRef.get().then(function (doc) {
                                if (doc.exists) {
                                    localStorage.setItem('data', JSON.stringify(doc.data()));
                                }

                                if (typeof (uploadBtn2) !== "undefined" && uploadBtn2 !== null) {
                                    uploadBtn2.innerHTML = "<i class='icon icon-doc'></i> <i class='icon icon-check'></i>";
                                }

                                let viewDiv = document.getElementById("view-div-2");
                                if (typeof (viewDiv) !== "undefined" && viewDiv !== null) {
                                    var data = JSON.parse(localStorage.getItem("data"));
                                    document.getElementById("certificate-link").href = data.certificate;
                                }

                                sucessAlert("Documento carregado com sucesso!")
                            }).catch(function (error) {
                                console.log({ message: error.message })
                            });
                        });
                    });
                });
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}



function addView(){
    db.collection("refreshes").doc("A9lDah36qjNXcWCfMmMU").get().then(doc => {
        let refres = doc.data();
        let count = parseInt(refres.views) + 1;
        return db.collection("refreshes").doc("A9lDah36qjNXcWCfMmMU").update({
            views: count
        })
    }).catch(err => {
        console.log(err.message);
    })
}

