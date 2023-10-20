const sidebarUl = document.querySelector('.sidebar_menu');
const mainContent = document.querySelector('.content');
const header = document.querySelector('.header');
const mainContainer = document.querySelector('.container');
const footer = document.querySelector('.footer');
const alert = document.querySelector('.alert');
const infoEl = document.querySelector('.info');
const imageInfo = document.querySelector('.image-info');
const titleInfo = document.querySelector('.title-info');
const descriptionInfo = document.querySelector('.description-info');
const priceInfo = document.querySelector('.price-info');
const ratingInfo = document.querySelector('.rate-info');
const countInfo = document.querySelector('.count-info');
const btnBuy = document.querySelector('.buy-button');
const btnCloseInfo = document.querySelector('.close-info');

const displayProduct = (json) => {
  for (let product of json) {
    const containerDiv = document.createElement('div');
    const titleH2 = document.createElement('h2');
    const image = document.createElement('img');
    const descriptionP = document.createElement('p');
    const priceP = document.createElement('p');
    containerDiv.classList.add('product-card');
    descriptionP.classList.add('description');
    priceP.classList.add('price');
    titleH2.textContent = product.title;
    image.src = product.image;
    descriptionP.textContent = `Product Description and Specifications`;
    priceP.textContent = '$' + product.price;
    containerDiv.appendChild(titleH2);
    containerDiv.appendChild(image);
    containerDiv.appendChild(descriptionP);
    containerDiv.appendChild(priceP);
    mainContent.appendChild(containerDiv);
    containerDiv.addEventListener('click', () => {
      imageInfo.src = product.image;
      titleInfo.textContent = product.title;
      descriptionInfo.textContent = product.description;
      priceInfo.textContent = 'Price: $' + product.price;
      ratingInfo.textContent = 'Ratting product: ' + product.rating.rate;
      countInfo.textContent = 'Count selling product: ' + product.rating.count;
      infoEl.classList.remove('hidden');
      infoEl.classList.add('show-info');
      header.classList.add('deactive');
      document.querySelector('.header-h1').classList.add('hidden');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
};

const defaultProductPrint = () => {
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((json) => {
      displayProduct(json);
    });
};

const printCategories = () => {
  fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json())
    .then((json) => {
      for (let category of json) {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        aElement.textContent = category.toUpperCase();
        liElement.appendChild(aElement);
        sidebarUl.appendChild(liElement);
        aElement.addEventListener('click', () => {
          clearMainContent();
          printProduct(aElement.textContent.toLocaleLowerCase());
        });
      }
    });
};

const closeInfo = () => {
  infoEl.classList.remove('show-info');
  infoEl.classList.add('hidden');
  header.classList.remove('deactive');
  document.querySelector('.header-h1').classList.remove('hidden');
};

const printProduct = (content) => {
  fetch(`https://fakestoreapi.com/products/category/${content}`)
    .then((res) => res.json())
    .then((json) => {
      displayProduct(json);
    });
};

const clearMainContent = () => {
  while (mainContent.firstChild) {
    mainContent.removeChild(mainContent.firstChild);
  }
};

btnBuy.addEventListener('click', () => {
  alert.classList.remove('hidden');
  setTimeout(() => {
    alert.classList.add('hidden');
  }, 1000);
  closeInfo();
});
defaultProductPrint();
printCategories();
btnCloseInfo.addEventListener('click', closeInfo);
