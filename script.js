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

// array que vai receber os números sorteados
let listNumbers = [];

// monitora ação de click no input submit e executa a função passada
submitSortition.addEventListener("click", (event) => {
  event.preventDefault();

  verifyInputs(intervalInput.value, startInput.value, endInput.value);

  intervalInput.value = "";
  startInput.value = "";
  endInput.value = "";
});

// monitora ação de click no input submit e executa a função passada
submitNewSortition.addEventListener("click", () => newSortition());

// gerar números aleatórios sem repetição dentro do intervalo definido
function getNumbersNoRepeat(interval, start, end) {
  // verifica se o número de sorteios ultrapassa a quantidade de valores únicos possíveis
  if (interval > end - start + 1) {
    alert("O intervalo excede a quantidade de valores únicos disponíveis.");
    return;
  }

  // gera números aleatórios únicos até atingir a quantidade desejada no parametro interval
  for (let i = 0; i < interval; i++) {
    let value = getRandomNumber(start, end);
    let attempts = 0;

    // caso o número gerado já existir na lista, gera um novo número (até 100 tentativas)
    while (listNumbers.includes(value)) {
      if (attempts > 100) {
        console.log("Sorteio concluído!!!");
        return;
      }

      // gera um NOVO número caso já existe no array
      value = getRandomNumber(start, end);

      // incrementa em attempts em cada iteração
      attempts++;
    }

    // adiciona o número à lista final
    listNumbers.push(value);
  }

  // chama a função para exibir os resultados na tela
  createList(listNumbers);
}

// gerar números aleatórios com possibilidade de repetição
function getNumbersWithRepeat(interval, start, end) {
  // gera números aleatórios únicos até atingir a quantidade desejada no parametro interval
  for (let i = 0; i < interval; i++) {
    let value = getRandomNumber(start, end);
    listNumbers.push(value);
  }

  // chama a função para exibir os resultados na tela
  createList(listNumbers);
}

// função chamada ao clicar em "Sortear novamente", que redefine os textos e exibe novamente o formulário
function newSortition() {
  // ajustar o alinhamento e redefinir o título e descrição do cabeçalho
  sortitionHeader.style.textAlign = "start";
  sortitionHeaderTitle.textContent = "quero sortear:";
  sortitionHeaderP.textContent = `Defina o intervalo e a quantidade de números, clique em "Sortear" e veja os resultados na tela. É rápido e fácil!`;
  sortitionHeaderP.style.fontWeight = "normal";
  sortitionHeaderP.style.textTransform = "initial";

  // oculta a área com a lista de números e exibe o formulário novamente
  hide(listingNumbers);
  appear(form);
}

// função responsável por criar a lista (ul) de números sorteados e exibir no HTML
function createList(arr) {
  ul.innerHTML = ""; //limpa a lista atual
  listNumbers = []; // reinicia o array de números

  // aplicando a funcao para ocultar o form (display: none)
  hide(form);

  // input submit apos criação da lista para aplicar class .show para animacao
  const newSortition = document.querySelector(".newSortition"); // Botão de novo sorteio

  // atualizar o cabeçalho para indicar que o resultado foi gerado
  sortitionHeader.style.textAlign = "center";
  sortitionHeaderTitle.textContent = "Resultado do sorteio";
  sortitionHeaderP.textContent = "1º resultado";
  sortitionHeaderP.style.fontWeight = "800";
  sortitionHeaderP.style.textTransform = "uppercase";

  // para cada número no array, cria um <li>, e adiciona à lista e aplica animação
  for (const i of arr) {
    const li = document.createElement("li");
    li.textContent = i;

    ul.append(li);

    li.classList.add("animate");
  }

  // adicionando a lista (ul) ao HTML
  listingNumbers.prepend(ul);

  // aplicando a animação no botão de novo sorteio
  if (newSortition) {
    setTimeout(() => {
      newSortition.classList.add("show");
    }, 200);
  }

  // exibe a área que comtem a lista com os resultados no HTML
  appear(listingNumbers);
}

// função responsável por validar os campos do formulário antes de executar o sorteio
function verifyInputs(interval, start, end) {
  // convertendo os valores recebidos em números inteiros
  interval = parseInt(interval);
  start = parseInt(start);
  end = parseInt(end);

  // console.log(interval)

  // valida se os valores de start e end são válidos, ou seja, se são números
  if (isNaN(start) || isNaN(end)) {
    alert(
      "Preencha o número inicial (De) e o número final (Até) para o sorteio."
    );
    return;
  }
  // valida se o interval é válido, ou seja, se é número
  if (isNaN(interval)) {
    alert("Preencha a quantidade de Números para serem sorteados.");
    return;
  }

  // impede mais de 20 números sendo sorteados
  if (interval > 20) {
    alert("A quantidade de Números sorteados deve ser menor que 20.");
    return;
  }

  // impede que o valor inicial seja igual ao final
  if (start == end) {
    alert("O número inicial (De) NÃO ser igual ao final (Até).");
    return;
  }

  // impede que o valor inicial seja maior que o final
  if (start > end) {
    alert("O número inicial (De) NÃO pode ser maior que final (Até).");
    return;
  }

  // executa o sorteio conforme a opção do switch: com ou sem repetição
  if (switchInput.checked) {
    // sem repetição
    getNumbersNoRepeat(interval, start, end);
  } else {
    // com repetição
    getNumbersWithRepeat(interval, start, end);
  }
}

// função auxiliar que oculta um elemento HTML (display: none)
function hide(element) {
  element.style.display = "none";
}

// função auxiliar que exibe um elemento HTML (display: block)
function appear(element) {
  element.style.display = "block";
}

// função que retorna um número inteiro aleatório
function getRandomNumber(start, end) {
  start = Math.ceil(start); // Arredonda start para cima
  end = Math.floor(end); // Arredonda end para baixo
  return Math.floor(Math.random() * (end - start + 1) + start);
}

// garante que os inputs do formulário aceitem apenas números inteiros positivos
watchInput(intervalInput);
watchInput(startInput);
watchInput(endInput);

// função que monitora a entrada de dados em um input e remove qualquer caractere não numérico
function watchInput(input) {
  input.addEventListener("input", () => {
    const value = input.value;
    input.value = value.replace(/\D+/g, ""); // Remove tudo que não for número
  });
}
