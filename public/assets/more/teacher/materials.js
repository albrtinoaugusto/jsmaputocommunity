var myData = JSON.parse(localStorage.getItem("data"));

function getClasses(){
    if (myData !== null && typeof(myData.classes) !== "undefined" && myData.classes.length > 0) {
        setClasses(myData.classes);
    }
    else {
        let bodyRow = document.getElementById("bodyRow");
        let div = document.createElement("div");
        div.className = "col-lg-12 col-md-12 col-sm-12";
        let div2 = document.createElement("div");
        div2.innerHTML = "<br/><p class='align-center'>Ainda não foste atribuido (a) turmas.</p><br/>";
        div2.className = "card";
        div.appendChild(div2);
        
        bodyRow.appendChild(div);
    }
}



function setClasses(classes) {

    let bodyRow = document.getElementById("bodyRow");

    for (let x = 0; x < classes.length; x++) {

        let div1 = document.createElement("div");
        div1.className = "col-lg-3 col-md-4 col-sm-12";

        let div2 = document.createElement("div");
        div2.className = "card";
        div1.appendChild(div2);

        let div3 = document.createElement("div");
        div3.className = "file";
        div2.appendChild(div3);
        //========================================== 

        let a = document.createElement("a");
        a.href = "show/?owner=" + myData.id + "&class=" + classes[x].id;
        div3.appendChild(a);
        //==========================================

        let div4 = document.createElement("div");
        div4.style = "margin: 20px;";
        a.appendChild(div4);
        //==========================================

        let p1 = document.createElement("p");
        p1.className = "align-center";
        div4.appendChild(p1);
        //==========================================


        let i = document.createElement("i");
        i.className = "fa fa-5x fa-folder text-success";
        p1.appendChild(i);
        //==========================================

        let div5 = document.createElement("div");
        div5.className = "file-name";
        a.appendChild(div5);
        //==========================================

        let p2 = document.createElement("p");
        p2.className = "m-b-5 text-muted align-center";
        p2.innerText = classes[x].description;
        div4.appendChild(p2);
        //==========================================

        bodyRow.appendChild(div1);
    }
}