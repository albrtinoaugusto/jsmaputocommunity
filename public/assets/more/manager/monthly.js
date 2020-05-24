function groupOne() {

    $('.table tr').css('display', 'none');
    $('.table tr[data-status=allests]').fadeIn('slow');

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });

    statusOfMonthly();
}


function statusOfMonthly() {

    getDate("month");
    let month = parseInt(dateTimeResponse);
    if (month < 11 && month >= 2) {
        document.getElementById("month" + month).className = "btn  btn-simple btn-sm btn-warning btn-filter";
    }

    for (let i = 2; i <= 11; i++) {
        if (i < month) {
            document.getElementById("stats" + i).innerHTML = "<span class='badge badge-danger'>Passado</span>";
            let is = document.getElementsByClassName("stats" + i + "three");
            is[0].innerHTML = "<span class='badge badge-danger'>Passado</span>";
            is[1].innerHTML = "<span class='badge badge-danger'>Passado</span>";
            is[2].innerHTML = "<span class='badge badge-danger'>Passado</span>";
        }

        if (i === month) {
            document.getElementById("stats" + i).innerHTML = "<span class='badge badge-success'>Activo</span>";
            let is = document.getElementsByClassName("stats" + i + "three");
            is[0].innerHTML = "<span class='badge badge-success'>Activo</span>";
            is[1].innerHTML = "<span class='badge badge-success'>Activo</span>";
            is[2].innerHTML = "<span class='badge badge-success'>Activo</span>";
        }

        if (i > month) {
            document.getElementById("stats" + i).innerHTML = "<span class='badge badge-info'>Proximo</span>";
            let is = document.getElementsByClassName("stats" + i + "three");
            is[0].innerHTML = "<span class='badge badge-info'>Proximo</span>";
            is[1].innerHTML = "<span class='badge badge-info'>Proximo</span>";
            is[2].innerHTML = "<span class='badge badge-info'>Proximo</span>";
        }

        getMonthTotal(i);
    }


}


function getMonthTotal(month) {

    //Query student grade 8, 9 and 11 with this month payed then add innerHTML to especific TD
    let students = db.collection("students").where('grade', '==', '8');
    students.get().then(function (rs) {
        let totalPayed = 0;

        rs.forEach(function (doc) {
            let student = doc.data();
            if (typeof(student.monthly) !== "undefined" && student.monthly !== null) {
                for (let i = 0; i < student.monthly.length; i++) {
                    getDate("year");
                    let monthly = student.monthly[i];
                    if (monthly.year === parseInt(dateTimeResponse) && monthly.month === month && monthly.status === 1) {
                        totalPayed ++;
                    }
                }
            }
        });   

        countAllStudents(month, totalPayed);

    }).catch((err) => {
        console.log(err.message);
    });
}


function countAllStudents(month, totalPayed){
    db.collection('students').get().then(snapshot => {
        let total = 0;
        snapshot.forEach(doc => {
            total++;
        });


        db.collection("students").where('grade', '==', '9').get().then(function (rs) {
            let total2 = 0;
            rs.forEach(function (doc) {
                let student = doc.data();
                if (typeof(student.monthly) !== "undefined" && student.monthly !== null) {
                    for (let i = 0; i < student.monthly.length; i++) {
                        getDate("year");
                        let monthly = student.monthly[i];
                        if (monthly.year === parseInt(dateTimeResponse) && monthly.month === month && monthly.status === 1) {
                            total2 ++;
                        }
                    }
                }  
            }); 


            db.collection("students").where('grade', '==', '11').get().then(function (rs) {
                let total3 = 0;
                rs.forEach(function (doc) {
                    let student = doc.data();
                    if (typeof(student.monthly) !== "undefined" && student.monthly !== null) {
                        for (let i = 0; i < student.monthly.length; i++) {
                            getDate("year");
                            let monthly = student.monthly[i];
                            if (monthly.year === parseInt(dateTimeResponse) && monthly.month === month && monthly.status === 1) {
                                total3 ++;
                            }
                        }
                    }  
                }); 
                
                let innContect = "Total: "+ total +" | 8ª Classe: "+ totalPayed +" | 9ª Classe: "+ total2 +" | 11ª Classe: " + total3;
                document.getElementById("totalMon" + month).innerHTML = innContect;
    
            }).catch((err) => {
                console.log(err.message);
            }); 
        }).catch((err) => {
            console.log(err.message);
        }); 
    }).catch(err => {
        console.log(err.message)
    });
}