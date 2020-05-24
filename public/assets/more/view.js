window.onload = function() {
    try {
        let urlStr = (window.location.href);
        let url = new URL(urlStr);
        let key = url.searchParams.get("key");
        setSomeViewConfigs(key)
    } catch (err) {
        console.log(err)
    }
}


function setSomeViewConfigs(key) {
    let invoice = null;

    if (key !== null && key.length() > 0) {
        invoice = new InvoiceDAO().getInvoiceByID(key);
        document.getElementById("title").innerHTML = "Factura " + key;
    }

    if (invoice != null) {

    } else {

    }

    /*
        if (nao haver sess\ao do estudante)
        {
            document.getElementById("tabChooser").remove();
        }
        */
}