// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdown = document.querySelectorAll('.fromm select ');

// // for (let selcet of dropdown){
// //     for(currCode in countryList){
// //         let newoption = document.createElement('option');
// //         newoption.innerText = currCode;
// //         newoption.value = currCode;
// //         selcet.appendChild(newoption);
// //     }
// // // }

// // for (let select of dropdown){
// //     console.log(select);
// // }

// console.log(dropdown);


const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

fetch(BASE_URL)
  .then(response => response.json())
  .then(data => {
    const countryList = data;
    const dropdown = document.querySelectorAll('.form select');

    // Populate the dropdown list
    dropdown.forEach(select => {
      Object.keys(countryList).forEach(currCode => {
        const newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.appendChild(newOption);
      });
    });
  })
  .catch(error => console.error('Error fetching data:', error));