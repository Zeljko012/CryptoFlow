function mobileMenu() {
    let checkbox = document.getElementById('burger');
    let menu = document.querySelector('.navigation');
    menu.classList.toggle('active');
    checkbox.checked = !checkbox.checked;
  }
  

let rightBtn = document.querySelector('#right-btn');
let leftBtn = document.querySelector('#left-btn');
let pictures = document.querySelectorAll('.slider-images img')

let imgNum = 0;

const moveRight =  () => {
  displayNone ();
  imgNum++;

  if(imgNum === pictures.length) {
    imgNum = 0;
  }

  pictures[imgNum].style.display = 'block';
}

const moveLeft =  () => {
  displayNone ();
  imgNum--;

  if(imgNum === -1) {
    imgNum = pictures.length - 1;
  }
  pictures[imgNum].style.display = 'block';
}

// rightBtn.addEventListener('click', moveRight);

// leftBtn.addEventListener('click', moveLeft);

// const displayNone = () => {
//   pictures.forEach((img) => {
//     img.style.display = 'none';
//   })
// }

// $('input').on('change', function() {
//   $('body').toggleClass('blue');
// });



document.addEventListener('DOMContentLoaded', function() {
  const url = 'https://coinranking1.p.rapidapi.com/exchange/-zdvbieRdZ';
const options = {
  method: 'GET',
  timePeriod: '3m',
  headers: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    'X-RapidAPI-Key': '48ee0b47edmsh323d19c5abe7887p13fd74jsnec692c97f537',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

async function getCryptoData() {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Greška prilikom dobavljanja podataka o kriptovalutama:', error);
  }
}

async function updateCryptoValues() {
  const cryptoData = await getCryptoData();
  if (cryptoData) {
    const btcUUID = 'Qwsogvtv82FCd';
    const btcResponse = await fetch(`https://coinranking.com/coin/${btcUUID}`);
    
    const btcData = await btcResponse.json();

    const btcPriceElement = document.getElementById('btc-price');
    const btcChangeElement = document.getElementById('btc-change');

    // Ažuriranje vrednosti HTML elemenata
    btcPriceElement.textContent = btcData.price;
    btcChangeElement.textContent = btcData.change;

    // Ažuriranje za Ethereum
    const ethPriceElement = document.getElementById('eth-price');
    const ethChangeElement = document.getElementById('eth-change');
    ethPriceElement.textContent = '$' + cryptoData.data.coins[1].price;
    ethChangeElement.textContent = cryptoData.data.coins[1].change + '%';

    // Ažuriranje za Tether USD
    const usdtPriceElement = document.getElementById('usdt-price');
    const usdtChangeElement = document.getElementById('usdt-change');
    usdtPriceElement.textContent = '$' + cryptoData.data.coins[2].price;
    usdtChangeElement.textContent = cryptoData.data.coins[2].change + '%';

    // Ažuriranje za BNB
    const bnbPriceElement = document.getElementById('bnb-price');
    const bnbChangeElement = document.getElementById('bnb-change');
    bnbPriceElement.textContent = '$' + cryptoData.data.coins[3].price;
    bnbChangeElement.textContent = cryptoData.data.coins[3].change + '%';

    // Ažuriranje za USDC
    const usdcPriceElement = document.getElementById('usdc-price');
    const usdcChangeElement = document.getElementById('usdc-change');
    usdcPriceElement.textContent = '$' + cryptoData.data.coins[4].price;
    usdcChangeElement.textContent = cryptoData.data.coins[4].change + '%';
  }
}

setTimeout(updateCryptoValues, 3 * 60 * 1000);

// Pozivanje funkcije za ažuriranje vrednosti
updateCryptoValues();

});




