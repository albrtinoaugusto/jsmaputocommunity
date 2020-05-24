var grade = 8;

function prepareEverthing(g) {
    grade = g;
}

const linkPay = document.getElementById("linkPay");
linkPay.addEventListener("click", function(){
    document.location = "../../../payment/?grade="+ grade +"&source=Xxxihhifysd0445sdxbf64bxfx4&code=MarTeXPI558";
});