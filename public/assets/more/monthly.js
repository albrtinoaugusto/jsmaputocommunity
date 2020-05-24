var myData = JSON.parse(localStorage.getItem("data"));


var month = 0;
var year = 0;
var day = 0;


function startMonthly() {
    
    $('.table tr').css('display', 'none');
    $('.table tr[data-status=all]').fadeIn('slow');

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });

    // Mothly / Others
    refresDateNow();
    setSomeConfigs();
    setCurrentMonth();
    setPaymentStatus();
    setShowInvoice();
}


function refresDateNow(){
    getDate("month"); //Get updated time
    month = parseInt(dateTimeResponse);

    getDate("year"); //Get updated year
    year = parseInt(dateTimeResponse);

    getDate("day") //Get updated day
    day = parseInt(dateTimeResponse);
}


function setSomeConfigs() {
    //Setting year to some field
    getDate("year");
    document.getElementById("year").value = dateTimeResponse;

    if (myData !== null) {
        if (typeof (myData.grade) !== "undefined" && myData.grade.length > 0) {
            let tmain = document.getElementById("fistTr");
            tmain.remove();
        }
    } else {
        let c = 12;
        while (c >= 2) {
            let tr = document.getElementById("tr" + c);
            tr.remove();
            c--;
        }
    }
}


function submitEverthig(input, form) {
    let data = input.value.toString();
    if (!data.includes(" - ")) {
        document.forms[form].submit();
    }
}


function setCurrentMonth() {

    if (myData !== null) {
        getDate("month");
        
        let span = document.getElementById("m" + parseInt(dateTimeResponse));
        span.className = "badge badge-success";
        span.innerText = "Activo";

        let c = parseInt(month) - 1;
        while (c > 2) {
            let spn = document.getElementById("m" + c);
            spn.className = "badge badge-danger";
            spn.innerText = "Passado";
            c--;
        }

        c = parseInt(month) + 1;
        while (c <= 12) {
            let spn = document.getElementById("m" + c);
            spn.className = "badge badge-info";
            spn.innerText = "Proximo";
            c++;
        }
    }
}





function setPaymentStatus() {
    if (myData !== null) {

        let c = 12;
        while (c >= 2) {
            let td = document.getElementById("stats" + c);
            let executed = false;

            if (typeof (myData.monthly) !== "undefined" && myData.monthly !== null && arrayMon.length > 0) {
                let arrayMon = myData.monthly;

                for (let x = 0; x < arrayMon.length; x++) {
                    if (arrayMon[x].year === year && arrayMon[x].month === month && arrayMon[x].status === 1) {
                        let spn = document.createElement("span");
                        spn.className = "badge badge-success";
                        spn.innerText = "Pago";

                        td.innerHTML = "";
                        td.appendChild(spn);

                        executed = true;
                        break;
                    }
                }
            }

            if (!executed) {
                let a = document.createElement("a");
                a.href = "../../payment/?grade=mon-" + month + "-" + year + "&source=Xxxihhifysd0445sdxbf64bxfx4&code=MarTeXPI558";
                a.innerHTML = "Pagar";
                a.className = "btn btn-success btn-sm";

                td.innerHTML = "";
                td.appendChild(a);
            }

            c--;
        }
    }
}



function setShowInvoice() {
    if (myData !== null) {
        let c = 12;
        while (c >= 2) {
            let td = document.getElementById("see" + c);

            let executed = false;

            if (typeof (myData.monthly) !== "undefined" && typeof (myData.monthly) === "object") {
                if (myData.monthly.year === year && myData.monthly.month === month && myData.monthly.status === "ok") {
                    let a = document.createElement("a");
                    a.href = "../../invoice/view/?key=" + myData.monthly.year + "-" + myData.monthly.month + "-" + myData.monthly.status;
                    a.innerHTML = "Ver Factura";
                    a.className = "btn btn-success btn-sm";

                    td.innerHTML = "";
                    td.appendChild(a);

                    executed = true;
                }
            }

            if (!executed) {
                let spn = document.createElement("span");
                spn.className = "badge badge-info";
                spn.innerText = "Não Pago";

                td.innerHTML = "";
                td.appendChild(spn);
            }

            c--;
        }
    }
}