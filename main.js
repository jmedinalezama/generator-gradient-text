const d = document;

const $input = d.querySelector("#texto");
const $grados = d.querySelector("#grados");
const $texto = d.querySelector(".texto-gradiente h2");
const $colors = d.querySelector(".colors");
const $addColor = d.querySelector(".add-color");
const $template = d.querySelector(".template-color").content;

let cantidadBtnColors = 2;
let mensajeLimitTexto = true;

const agregarColor = () => {
  cantidadBtnColors++;

  $template
    .querySelector(".color")
    .setAttribute("id", `color-${cantidadBtnColors}`);
  $template.querySelector("button").dataset.id = `color-${cantidadBtnColors}`;
  $template.querySelector("button").setAttribute("class", "btns-colors");
  $template.querySelector(".color input").value = "#777777";

  let $clone = d.importNode($template, true);

  $colors.appendChild($clone);

  if (cantidadBtnColors >= 3) {
    d.querySelectorAll(".btns-colors").forEach((el) => {
      el.removeAttribute("disabled");
    });
  }

  aplicarGradiente();
};

const quitarColor = (e) => {
  cantidadBtnColors--;

  let id = e.target.dataset.id;

  let color = d.getElementById(id);

  $colors.removeChild(color);

  if (cantidadBtnColors === 2) {
    d.querySelectorAll(".btns-colors").forEach((el) => {
      el.setAttribute("disabled", "true");
    });
  }

  aplicarGradiente();
};

const establecerTexto = (e) => {
  let valor = e.target.value;

  let mensaje = null;

  if (valor.length > 50) {
    mensaje = d.createElement("div");

    mensaje.textContent = "No se permiten más caracteres.";
    mensaje.setAttribute("class", "mensaje");

    if (mensajeLimitTexto) {
      mensajeLimitTexto = false;
      $input.insertAdjacentElement("afterend", mensaje);
    }

    setTimeout(() => {
      d.querySelector(".datos-texto").removeChild(mensaje);
      mensajeLimitTexto = true;
    }, 1000);

    let limittexto = "";

    for (let i = 0; i < 50; i++) {
      limittexto += valor[i];
    }

    console.log(limittexto);

    valor = limittexto;

    $input.value = valor;

    return;
  }

  if (valor === "") {
    $texto.textContent = "Texto Ejemplo";
  } else {
    $texto.textContent = valor;
  }
};

const establecerGrados = (e) => {
  let grados = e.target.value;

  d.querySelector(".info-grados").textContent = `Grados: ${grados}`;

  aplicarGradiente();
};

const cargarBotones = () => {
  for (let i = 1; i <= cantidadBtnColors; i++) {
    $template.querySelector(".color").setAttribute("id", `color-${i}`);
    $template.querySelector("button").setAttribute("disabled", "true");
    $template.querySelector("button").dataset.id = `color-${i}`;
    $template.querySelector("button").setAttribute("class", "btns-colors");

    if (i === 1) {
      $template.querySelector(".color input").value = "#ff0000";
    } else {
      $template.querySelector(".color input").value = "#0000ff";
    }

    let $clone = d.importNode($template, true);

    $colors.appendChild($clone);
  }
};

const aplicarGradiente = () => {
  let colores = [];
  let i = 0;

  d.querySelectorAll(".color input").forEach((el) => {
    colores[i] = el.value;
    i++;
  });

  let gradiente = `linear-gradient(${$grados.value}deg,`;

  for (let i = 0; i < colores.length; i++) {
    if (i === colores.length - 1) {
      gradiente += colores[i];
    } else {
      gradiente += `${colores[i]},`;
    }
  }

  gradiente += ")";

  $texto.style.backgroundImage = `${gradiente}`;

  mostrarCodigo(gradiente);
};

const mostrarCodigo = (gradiente) => {
  let code = `<div class="selector">
                <span class="name-selector">.text</span> <span class="bracket">{</span>
              </div>
              <div class="properties">
                <span class="key">
                  background-image:
                </span>
                <span class="value">
                  ${gradiente}; 
                </span> <br/>
                <span class="key">
                  -webkit-background-clip:
                </span>
                <span class="value">
                  text;
                </span> <br/>
                <span class="key">
                  background-clip:
                </span> 
                <span class="value">
                  text;
                </span> <br/>
                <span class="key">
                  -webkit-text-fill-color:
                </span> 
                <span class="value">
                  transparent;
                </span>
              </div>
              <div class="selector">
                <span class="bracket">}</span>
              </div>`;

  d.querySelector(".code-css code").innerHTML = code;
};

d.addEventListener("input", (e) => {
  if (e.target === $input) {
    establecerTexto(e);
  }
  if (e.target === $grados) {
    establecerGrados(e);
  }
  if (e.target.matches("input[type='color']")) {
    aplicarGradiente();
  }
});

d.addEventListener("click", (e) => {
  if (e.target === $addColor) {
    e.preventDefault();

    agregarColor();
  }

  if (e.target.matches(".btns-colors")) {
    quitarColor(e);
  }
});

d.addEventListener("DOMContentLoaded", (e) => {
  cargarBotones();
  aplicarGradiente();
});
