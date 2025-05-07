const quantityInput = document.querySelector("#quantity");
const startInput = document.querySelector("#start");
const endInput = document.querySelector("#end");
const submitSortition = document.querySelector("#submitSortition");

// executando evento de click ao clicar em sortear
submitSortition.addEventListener("click", (event) => {
  event.preventDefault();

  let value = verifyNumbers(startInput.value, endInput.value);

  console.log(value);
});

// verificar inputs
function verifyNumbers(start, end) {
  if (start > end) {
    alert("erro");
  } else {
    return getRandomNumber(start, end);
  }
}

// gerando numero aleatório
function getRandomNumber(start, end) {
  let number = Math.random() * (end - start) + 1;
  let result = Math.round(number);

  return result;
}

// garantindo numeros inteiros positivos
watchInput(quantityInput);
watchInput(startInput);
watchInput(endInput);

function watchInput(input) {
  input.addEventListener("input", () => {
    const value = input.value;
    input.value = value.replace(/\D+/g, "");
  });
}
