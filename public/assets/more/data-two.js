var myData = JSON.parse(localStorage.getItem("data"));

function dataTwo() {
    const editor1 = new Jodit('#more_info', {
        language: 'auto',
        i18n: 'pt',
        preset: 'inline',
        spellcheck: true,
        removeButtons: ['image', 'video', 'about', 'symbol', 'source', 'supercript', 'file', 'table', 'print', 'subcript', 'strikethrough', 'fontsize', 'colors', 'link', 'dots']
    });

    // Form info preview
    refreshData();
}

const goNew = document.getElementById("grade_drop");
goNew.addEventListener("change", function (){
    let val = this.value;

    if (val !== "x" && val.length > 0) {
        document.location = "../../../payment/?grade=" + val + "&source=Xxxihhifysd0445sdxbf64bxfx4&code=MarTeXPI558";
    }
});

function refreshData() {

    if (myData !== null) {
        //Grade setting
        let gradeOptions = document.getElementById("grade_drop");

        if (typeof(myData.grade) === "undefined" || myData.grade === null) {
            let opt = document.createElement("option");
            opt.text = "- selecione -";
            opt.value = "x";
            gradeOptions.appendChild(opt);
        }

        for (let i = 8; i <= 12; i++) {
            let option = document.createElement("option");
            option.text = i + "ª Classe";
            option.value = i;

            if (typeof(myData.grade) !== "undefined" && myData.grade !== null) {
                if (myData.grade === i) {
                    option.selected = true;
                }
            }
            gradeOptions.appendChild(option);
        }

        //Set FatherNumber
        if (typeof(myData.phone) !== "undefined" && myData.phone[1] !== null) {
            document.getElementById("f_cell_father").value = myData.phone[1];
        }

        //Set MotherNumber
        if (typeof(myData.phone) !== "undefined" && myData.phone[2] !== null) {
            document.getElementById("f_cell_mother").value = myData.phone[2];
        }

        //Set Name
        if (typeof(myData.name) !== "undefined" && myData.name !== null) {
            document.getElementById("f_name").value = myData.name;
        }

        //Set LastName
        if (typeof(myData.surname) !== "undefined" && myData.surname !== null) {
            document.getElementById("f_surname").value = myData.surname;
        }


        //Gender setting
        let genderOptions = document.getElementById("sex_drop");

        if (myData.gender === null || typeof(myData.gender) === "undefined") {
            let opt = document.createElement("option");
            opt.text = "- selecione -";
            opt.value = "x";
            genderOptions.appendChild(opt);
        }

        for (let i = 0; i < 2; i++) {
            let option = document.createElement("option");
            option.value = i + "";
            if (option.value === "0") {
                option.text = "Femenino";
            } else {
                option.text = "Masculino";
            }

            if (myData.gender !== null && typeof(myData.gender) !== "undefined") {
                if (parseInt(myData.gender) === i) {
                    option.selected = true;
                }
            }
            genderOptions.appendChild(option);
        }

        //Set LastName
        if (myData.born !== null && typeof(myData.born) !== "undefined") {
            document.getElementById("born_date").value = myData.born;
        } else {
            document.getElementById("born_date").value = "2002-01-01";
        }


        //Set Nationality
        let nationalityOptions = document.getElementById("nationality_drop");

        if (myData.nationality === null || typeof(myData.nationality) === "undefined") {
            let opt = document.createElement("option");
            opt.text = "- selecione -";
            opt.value = "x";
            nationalityOptions.appendChild(opt);
        }


        let optnat1 = document.createElement("option");
        optnat1.value = "Moçambicana";
        optnat1.text = "Moçambicana";

        let optnat2 = document.createElement("option");
        optnat2.value = "Extrangeira";
        optnat2.text = "Extrangeira";

        if (myData.nationality !== null && typeof(myData.nationality) !== "undefined") {
            if (myData.nationality === "Moçambicana") {
                optnat1.selected = true;
            }

            if (myData.nationality === "Extrangeira") {
                optnat2.selected = true;
            }
        }

        nationalityOptions.appendChild(optnat1);
        nationalityOptions.appendChild(optnat2);


        //Marital setting
        let maritalOptions = document.getElementById("marital_drop");

        if (myData.marital === null || typeof(myData.marital) === "undefined") {
            let opt = document.createElement("option");
            opt.text = "- selecione -";
            opt.value = "x";
            maritalOptions.appendChild(opt);
        }

        for (let i = 0; i < 4; i++) {
            let option = document.createElement("option");
            option.value = i + "";
            if (option.value === "0") {
                option.text = "Solteiro (a)";
            } else if (option.value === "1") {
                option.text = "Casado (a)";
            } else if (option.value === "2") {
                option.text = "Divorciado (a)";
            } else if (option.value === "3") {
                option.text = "Víuvo (a)";
            }

            if (myData.marital !== null && typeof(myData.marital) !== "undefined") {
                if (parseInt(myData.marital) === i) {
                    option.selected = true;
                }
            }
            maritalOptions.appendChild(option);
        }



        //DocType setting
        let doctypeOptions = document.getElementById("docType");

        if (myData.docType === null || typeof(myData.docType) === "undefined") {
            let opt = document.createElement("option");
            opt.text = "- selecione -";
            opt.value = "x";
            doctypeOptions.appendChild(opt);
        }

        for (let i = 0; i < 3; i++) {
            let option = document.createElement("option");
            option.value = i + "";
            if (option.value === "0") {
                option.text = "BI";
            } else if (option.value === "1") {
                option.text = "Passaporte";
            } else {
                option.text = "Outro";
            }


            if (myData.docType !== null && typeof(myData.docType) !== "undefined") {
                if (parseInt(myData.docType) === i) {
                    option.selected = true;
                }
            }
            doctypeOptions.appendChild(option);
        }


        //Set NumDoc
        if (myData.numDoc !== null && typeof(myData.numDoc) !== "undefined") {
            document.getElementById("f_num_doc").value = myData.numDoc;
        }


        //Set MyPhone
        if (typeof(myData.phone) !== "undefined" && myData.phone[0] !== null) {
            document.getElementById("f_phone").value = myData.phone[0];
        }



        //Seting province
        let proviceOptions = document.getElementById("province-list");

        if (myData.province === null || typeof(myData.province) === "undefined") {
            let opt = document.createElement("option");
            opt.text = "- selecione -";
            opt.value = "x";
            proviceOptions.appendChild(opt);
        }

        for (let i = 0; i < 11; i++) {
            let option = document.createElement("option");
            option.value = i + "";
            if (option.value === "0") {
                option.text = "Maputo";
                option.value = "Maputo";
            } else if (option.value === "1") {
                option.text = "Maputo (Matola)";
                option.value = "Maputo (Matola)";
            } else if (option.value === "2") {
                option.text = "Gaza";
                option.value = "Gaza";
            } else if (option.value === "3") {
                option.text = "Inhambane";
                option.value = "Inhambane";
            } else if (option.value === "4") {
                option.text = "Manica";
                option.value = "Manica";
            } else if (option.value === "5") {
                option.text = "Sofala";
                option.value = "Sofala";
            } else if (option.value === "6") {
                option.text = "Tete";
                option.value = "Tete";
            } else if (option.value === "7") {
                option.text = "Zambézia";
                option.value = "Zambézia";
            } else if (option.value === "8") {
                option.text = "Nampula";
                option.value = "Nampula";
            } else if (option.value === "9") {
                option.text = "Niassa";
                option.value = "Niassa";
            } else if (option.value === "10") {
                option.text = "Cabo Delgado";
                option.value = "Cabo Delgado";
            }


            if (myData.province !== null && typeof(myData.province) !== "undefined") {
                if (myData.province === option.value) {
                    option.selected = true;
                }
            }
            proviceOptions.appendChild(option);
        }


        //Set Address
        if (myData.address !== null && typeof(myData.address) !== "undefined") {
            document.getElementById("f_address").value = myData.address;
        }


        //Set MoreInfo
        if (myData.details !== null && typeof(myData.details) !== "undefined") {
            document.getElementById("more_info").value = myData.details;
            document.getElementById("more_info").innerHTML = myData.details;
        }


        //Set email
        if (myData.email !== null && typeof(myData.email) !== "undefined") {
            document.getElementById("f_mail").value = myData.email;
        }
    }
}



const formUpdate = document.querySelector("#update_student");
formUpdate.addEventListener("submit", function(ev) {
    ev.preventDefault();

    let name = document.getElementById("f_name");
    let surname = document.getElementById("f_surname");
    let sexDrop = document.getElementById("sex_drop");
    let bornDate = document.getElementById("born_date");
    let nationality = document.getElementById("nationality_drop");
    let maritalDrop = document.getElementById("marital_drop");

    let docType = document.getElementById("docType");
    let num_doc = document.getElementById("f_num_doc");

    let province = document.getElementById("province_drop");
    let grade = document.getElementById("grade_drop");
    let address = document.getElementById("f_address");
    let moreInfo = document.getElementById("more_info");

    let phone = document.getElementById("f_phone");
    let cellFather = document.getElementById("f_cell_father");
    let cellMother = document.getElementById("f_cell_mother");

    let email = document.getElementById("f_mail");
    let pass = document.getElementById("f_pass");
    let repass = document.getElementById("f_repass");

    let msg = "";
    let count = 0;

    if (cellFather.value === null || cellFather.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o celular do seu Pai.";
    }

    if (cellMother.value === null || cellMother.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o celular da sua Mãe.";
    }


    if (name.value === null || name.value.length === 0) {
        count++;
        msg = "Esqueceu de informar o seu nome.";
    }

    if (surname.value === null || surname.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o seu apelido.";
    }

    if (nationality.value === "x" && count === 0) {
        count++;
        msg = "Selecione a sua nacionalidade.";
    }

    if (docType.value === "x" && count === 0) {
        count++;
        msg = "Selecione o tipo de documento.";
    }

    if (num_doc.value === null || num_doc.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o número do documento.";
    } else {
        if (num_doc.value.length > 0 && num_doc.value.length < 4) {
            count++;
            msg = "O número do documento deve ter um mínimo de 4 Dígitos.";
        }
    }

    if (phone.value === null || phone.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o número de celular.";
    }

    if (province.value === "x" && count === 0) {
        count++;
        msg = "Selecione a sua provincia.";
    }

    if (address.value === null || address.value.length === 0 && count === 0) {
        count++;
        msg = "Informe o seu endereço.";
    }

    if (moreInfo.value === null || moreInfo.value.length === 0 && count === 0) {
        count++;
        msg = "Informe um pouco mais sobre si.";
    }

    if (count > 0) {
        infoAlert(msg);
    } else {

        waitAlert();
        
        let updateStudent = {
            name: name.value,
            surname: surname.value,
            gender: sexDrop.value,
            born: bornDate.value,
            nationality: nationality.value,
            marital: maritalDrop.value,
            docType: docType.value,
            numDoc: num_doc.value,
            phone: [phone.value, cellFather.value, cellMother.value],
            province: province.value,
            address: address.value,
            details: moreInfo.value,
            email: email.value,
            id: myData.id,
            type: "x"
        }

        db.collection("students").doc(myData.id).update(updateStudent).then(() => {
            localStorage.setItem("data", JSON.stringify(updateStudent));

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