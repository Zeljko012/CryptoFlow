function mobileMenu() {
  let checkbox = document.getElementById('burger');
  let menu = document.querySelector('.navigation');

  // Zatvori meni ako se klikne na sekciju unutar menija
  menu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('active');
      checkbox.checked = false;
    }
  });

  // Otvori meni postepeno (uz pomoć CSS tranzicije)
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

const displayNone = () => {
  pictures.forEach((img) => {
    img.style.display = 'none';
  })
}

// $('input').on('change', function() {
//   $('body').toggleClass('blue');
// });

const navigationLinks = document.querySelectorAll('.navigation a');

navigationLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    targetSection.scrollIntoView({behavior: 'smooth'});
  });
});



document.addEventListener('DOMContentLoaded', async function() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

  async function getCryptoData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Greška prilikom dobavljanja podataka o kriptovalutama:', error);
    }
  }

  function formatNumber(number) {
    return number.toLocaleString('en-US');
  }
  
  function updateCryptoValues() {
    getCryptoData()
      .then(cryptoData => {
        const btcData = cryptoData.find(coin => coin.id === 'bitcoin');
        const ethData = cryptoData.find(coin => coin.id === 'ethereum');
        const usdtData = cryptoData.find(coin => coin.id === 'tether');
        const bnbData = cryptoData.find(coin => coin.id === 'binancecoin');
        const usdcData = cryptoData.find(coin => coin.id === 'usd-coin');
  
        const btcPriceElement = document.getElementById('btc-price');
        const btcChangeElement = document.getElementById('btc-change');
        btcPriceElement.textContent = '$' + formatNumber(btcData.current_price);
        btcChangeElement.textContent = formatNumber(btcData.price_change_percentage_24h) + '%';
        btcChangeElement.classList.add(btcData.price_change_percentage_24h >= 0 ? 'positive' : 'negative');
  
        const ethPriceElement = document.getElementById('eth-price');
        const ethChangeElement = document.getElementById('eth-change');
        ethPriceElement.textContent = '$' + formatNumber(ethData.current_price);
        ethChangeElement.textContent = formatNumber(ethData.price_change_percentage_24h) + '%';
        ethChangeElement.classList.add(ethData.price_change_percentage_24h >= 0 ? 'positive' : 'negative');
  
        const usdtPriceElement = document.getElementById('usdt-price');
        const usdtChangeElement = document.getElementById('usdt-change');
        usdtPriceElement.textContent = '$' + formatNumber(usdtData.current_price);
        usdtChangeElement.textContent = formatNumber(usdtData.price_change_percentage_24h) + '%';
        usdtChangeElement.classList.add(usdtData.price_change_percentage_24h >= 0 ? 'positive' : 'negative');
  
        const bnbPriceElement = document.getElementById('bnb-price');
        const bnbChangeElement = document.getElementById('bnb-change');
        bnbPriceElement.textContent = '$' + formatNumber(bnbData.current_price);
        bnbChangeElement.textContent = formatNumber(bnbData.price_change_percentage_24h) + '%';
        bnbChangeElement.classList.add(bnbData.price_change_percentage_24h >= 0 ? 'positive' : 'negative');
  
        const usdcPriceElement = document.getElementById('usdc-price');
        const usdcChangeElement = document.getElementById('usdc-change');
        usdcPriceElement.textContent = '$' + formatNumber(usdcData.current_price);
        usdcChangeElement.textContent = formatNumber(usdcData.price_change_percentage_24h) + '%';
        usdcChangeElement.classList.add(usdcData.price_change_percentage_24h >= 0 ? 'positive' : 'negative');
      })
      .catch(error => {
        console.log('Greška prilikom dobavljanja podataka o kriptovalutama:', error);
      });
  }
  
  setTimeout(updateCryptoValues, 3 * 60 * 1000);
  updateCryptoValues();
  

});




