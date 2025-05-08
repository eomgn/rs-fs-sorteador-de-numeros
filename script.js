const form = document.querySelector("form");
const intervalInput = document.querySelector("#interval");
const startInput = document.querySelector("#start");
const endInput = document.querySelector("#end");
const switchInput = document.querySelector("#switch");
const submitSortition = document.querySelector("#submitSortition");
const listingNumbers = document.querySelector(".listingNumbers");

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

function createList(arr) {
  hide(form);
  const sortitionHeader = document.querySelector(".sortition-header");
  const sortitionHeaderTitle = document.querySelector(".sortition-header h2");
  const sortitionHeaderP = document.querySelector(".sortition-header p");

  sortitionHeader.style.textAlign = "center";

  sortitionHeaderTitle.textContent = "Resultado do sorteio";

  sortitionHeaderP.textContent = "1º resultado";
  sortitionHeaderP.style.fontWeight = "800";
  sortitionHeaderP.style.textTransform = "uppercase";

  const ul = document.createElement("ul");
  listingNumbers.append(ul);

  for (const i of arr) {
    const li = document.createElement("li");
    li.textContent = i;
    ul.append(li);
  }
}

// verificar inputs
function verifyInputs(interval, start, end) {
  if (start == "" || end == "") {
    alert(
      "Preencha o número inicial (De) e o número final (Até) para o sorteio."
    );
    return;
  }

  if (interval == "") {
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

  if (switchInput.checked) {
    getNumbersNoRepeat(interval, start, end);
  } else {
    getNumbersWithRepeat(interval, start, end);
  }
}

function hide(element) {
  element.style.display = "none";
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
