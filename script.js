// form
const form = document.querySelector("form");

// inputs
const intervalInput = document.querySelector("#interval");
const startInput = document.querySelector("#start");
const endInput = document.querySelector("#end");
const switchInput = document.querySelector("#switch");
const submitSortition = document.querySelector("#submitSortition");
const submitNewSortition = document.querySelector("#submitNewSortition");

// sortition area
const sortitionHeader = document.querySelector(".sortition-header");
const sortitionHeaderTitle = document.querySelector(".sortition-header h2");
const sortitionHeaderP = document.querySelector(".sortition-header p");

// div que ira ser inserido a ul com a lista de numeros
const listingNumbers = document.querySelector(".listingNumbers");

// criando elemento de ul
const ul = document.createElement("ul");

let listNumbers = [];

// executando evento de click ao clicar em sortear
submitSortition.addEventListener("click", (event) => {
  event.preventDefault();

  verifyInputs(intervalInput.value, startInput.value, endInput.value);

  intervalInput.value = "";
  startInput.value = "";
  endInput.value = "";

  console.log(listNumbers);
});

submitNewSortition.addEventListener("click", () => {
  newSortition();
});

// gerando pelo intervalo - SEM possibilidade de repeticao
function getNumbersNoRepeat(interval, start, end) {
  if (interval > end - start + 1) {
    alert("O intervalo excede a quantidade de valores únicos disponíveis.");
    return;
  }

  for (let i = 0; i < interval; i++) {
    let value = getRandomNumber(start, end);
    let attempts = 0;

    while (listNumbers.includes(value)) {
      if (attempts > 100) {
        console.log("Sorteio concluído!!!");
        return;
      }

      value = getRandomNumber(start, end);
      attempts++;
    }

    listNumbers.push(value);
  }

  createList(listNumbers);
}

// gerando pelo intervalo - possibilidade de repeticao
function getNumbersWithRepeat(interval, start, end) {
  for (let i = 0; i < interval; i++) {
    let value = getRandomNumber(start, end);
    listNumbers.push(value);
  }

  createList(listNumbers);
}

function newSortition() {
  sortitionHeader.style.textAlign = "start";

  sortitionHeaderTitle.textContent = "quero sortear:";

  sortitionHeaderP.textContent = `Defina o intervalo e a quantidade de números, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!`;
  sortitionHeaderP.style.fontWeight = "normal";
  sortitionHeaderP.style.textTransform = "initial";

  hide(listingNumbers);
  appear(form);
}

function createList(arr) {
  ul.innerHTML = "";
  listNumbers = [];

  // aplicando ao form a funcao para esconder (display: none)
  hide(form);

  // input submit apos criação da lista para aplicar class .show para animacao
  const newSortition = document.querySelector(".newSortition");

  sortitionHeader.style.textAlign = "center";

  sortitionHeaderTitle.textContent = "Resultado do sorteio";

  sortitionHeaderP.textContent = "1º resultado";
  sortitionHeaderP.style.fontWeight = "800";
  sortitionHeaderP.style.textTransform = "uppercase";

  for (const i of arr) {
    const li = document.createElement("li");
    li.textContent = i;

    ul.append(li);

    li.classList.add("animate");
  }
  listingNumbers.prepend(ul);

  if (newSortition) {
    setTimeout(() => {
      newSortition.classList.add("show");
    }, 200); // pequeno atraso para suavidade extra
  }

  appear(listingNumbers);
}

// verificar inputs
function verifyInputs(interval, start, end) {
  interval = parseInt(interval);
  start = parseInt(start);
  end = parseInt(end);

  // console.log(interval)

  if (isNaN(start) || isNaN(end)) {
    alert(
      "Preencha o número inicial (De) e o número final (Até) para o sorteio."
    );
    return;
  }

  if (isNaN(interval)) {
    alert("Preencha a quantidade de Números para serem sorteados.");
    return;
  }

  if (interval > 20) {
    alert("A quantidade de Números sorteados deve ser menor que 20.");
    return;
  }

  if (start == end) {
    alert("O número inicial (De) NÃO ser igual ao final (Até).");
    return;
  }

  if (start > end) {
    alert("O número inicial (De) NÃO pode ser maior que final (Até).");
    return;
  }

  if (switchInput.checked) {
    getNumbersNoRepeat(interval, start, end);
  } else {
    getNumbersWithRepeat(interval, start, end);
  }
}

function hide(element) {
  element.style.display = "none";
}

function appear(element) {
  element.style.display = "block";
}

// gerando numero aleatório
function getRandomNumber(start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);
  return Math.floor(Math.random() * (end - start + 1) + start);
}

// garantindo numeros inteiros positivos
watchInput(intervalInput);
watchInput(startInput);
watchInput(endInput);

function watchInput(input) {
  input.addEventListener("input", () => {
    const value = input.value;
    input.value = value.replace(/\D+/g, "");
  });
}
