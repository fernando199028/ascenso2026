let preguntas = [];
let examen = [];
let indice = 0;
let puntaje = 0;

async function iniciarExamen() {

    const respuesta = await fetch("preguntas.json");
    preguntas = await respuesta.json();

    examen = preguntas.sort(() => Math.random() - 0.5).slice(0,10);

    indice = 0;
    puntaje = 0;

    document.getElementById("pantallaInicio").style.display="none";
    document.getElementById("examen").style.display="block";

    mostrarPregunta();

}

function mostrarPregunta(){

    let p = examen[indice];

    document.getElementById("pregunta").innerHTML =
    "<h2>"+(indice+1)+". "+p.pregunta+"</h2>";

    let html="";

    p.opciones.forEach((op,i)=>{

        html += `
        <button onclick="responder(${i})">
        ${op}
        </button>
        <br><br>
        `;

    });

    document.getElementById("opciones").innerHTML=html;

}

function responder(opcion){

    if(opcion==examen[indice].correcta){

        puntaje++;

    }

    indice++;

    if(indice<10){

        mostrarPregunta();

    }else{

        finalizar();

    }

}

function finalizar(){

document.getElementById("examen").style.display="none";

document.getElementById("resultado").innerHTML=`
<h2>Examen terminado</h2>

<h1>${puntaje}/10</h1>

<button onclick="location.reload()">

Volver a empezar

</button>

`;

}
