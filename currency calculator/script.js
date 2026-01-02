const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


let flags = document.querySelectorAll(".flag");
let selects = document.querySelectorAll(".currOption");
const exchangeText = document.querySelector(".exchange");
const btn = document.querySelector("#submit-btn");
let amount = document.querySelector("#amount");


// this add select into dom
for (let option of selects) {
  for (currCode in countryList) {
    const newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    option.appendChild(newOption)
  }
  option.value = 'USD'
}
selects[1].value = 'INR';

// it change only flag
selects.forEach((select, index) => {
  select.addEventListener("change", () => {
    const currCode = select.value;
    const countryCode = countryList[currCode];

    flags[index].src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  });
});


btn.addEventListener("click", async () => {
  const fromCurrency = selects[0].value.toLowerCase();
  const toCurrency = selects[1].value.toLowerCase();

  const URL = `${BASE_URL}/${fromCurrency}.json`;

  const res = await fetch(URL);
  const data = await res.json();

  const rate = data[fromCurrency][toCurrency];

  exchangeText.innerText = `${amount.value} ${fromCurrency.toUpperCase()} = ${(amount.value * rate).toFixed(2)} ${toCurrency.toUpperCase()}`;
});