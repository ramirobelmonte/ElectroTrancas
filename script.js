const url_api = 'https://script.google.com/macros/s/AKfycbziV-OOFZjOliy94MpjIsRhELkzYOQ7P7rmM41-h3XFwJOUVngnFXY9ao-Ff2JD7bIe-w/exec';

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

    var pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(item.efectivo);

    clone.querySelector('.card').id = base36(item.nombre)
    
    clone.querySelector('.categoria').textContent = item.categoria
    clone.querySelector('.nombre').textContent = item.nombre
    clone.querySelector('.efectivo').textContent = pesos

    clone.querySelector('.card-action').href = 'https://api.whatsapp.com/send?phone=543813343477&text=' + 'Información sobre: ' + item.nombre + ' a precio: ' + pesos

    main.appendChild(clone)
}

function base36(str) {
  return parseInt(str, 36);
}