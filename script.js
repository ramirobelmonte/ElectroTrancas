const url_api = 'https://script.google.com/macros/s/AKfycby6xtHMss9-y8UrrUJslxFSTG1h4gPbWOUfUyRLyQ_3_vuwyTR9YVFXW7IpYjf4C7hkvg/exec';

let main = document.querySelector('main');
let card_template = document.getElementById('card_template').content;

const request = new Request(url_api);

fetch(request)
.then((response) => response.json())
.then((json)=>{
    json.forEach(item => {sumHtml(item)});
})

function sumHtml(item) {
    let clone = card_template.cloneNode(true)
    
    item.efectivo = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.efectivo);
    item.n1c = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.n1c);
    item.n3c = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.n3c);
    item.n6c = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.n6c);
    item.mv1c = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.mv1c);
    item.mv3c = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.mv3c);
    item.mv6c = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumSignificantDigits: 6 }).format(item.mv6c);
    
    for (const x of item.imagenes) {
        let imge = document.createElement('img')
        imge.src = 'https://drive.google.com/thumbnail?id='+ x +'&sz=w1000'
        clone.querySelector('.slider-container').appendChild(imge)
    }    
    
    clone.querySelector('.card').id = base36(item.nombre)
    clone.querySelector('.categoria').textContent = item.categoria
    clone.querySelector('.nombre').textContent = item.nombre
    clone.querySelector('.efectivo').textContent = item.efectivo

    clone.querySelector('.n1c').textContent = item.n1c;
    clone.querySelector('.n3c').textContent = item.n3c;
    clone.querySelector('.n6c').textContent = item.n6c;
    clone.querySelector('.mv1c').textContent = item.mv1c;
    clone.querySelector('.mv3c').textContent = item.mv3c;
    clone.querySelector('.mv6c').textContent = item.mv6c;
    
    clone.querySelector('.card-action>.wsp').href = 'https://api.whatsapp.com/send?phone=543813343477&text=```'+ item.nombre + '%0AEfectivo%3A%20'+ item.efectivo +'%0A%0ATarjeta%20Naranja%20-%20Visa%20Macro%3A%0A1%20cuota%3A%0A'+item.n1c+'%20-%20'+item.mv1c+'%0A3%20cuotas%3A%0A'+item.n3c+'%20-%20'+item.mv3c+'%0A6%20cuotas%3A%0A'+item.n6c+'%20-%20'+item.mv6c+'```'
    // clone.querySelector('.card-action>.share').href = '#' + base36(item.nombre)
    
    main.appendChild(clone)
}

function base36(str) {
    return parseInt(str, 36);
}