let cards = document.querySelector(".cards");
let sortBtn = document.querySelector(".sort");
let searchInput = document.querySelector(".search");
let basketDot = document.querySelector('#basketDot')
let copyArr = [];
let filteredArr = [];

async function toggleFav(id, fav){
  await axios.patch("http://localhost:3000/users/"+id, {isFavorite : !fav}); 
  window.location.reload();
}

async function toBasket (id, count){
  if(!count){
    await axios.patch("http://localhost:3000/users/"+id, {inBasket : 1})
  }else{
    await axios.patch("http://localhost:3000/users/"+id, {inBasket : count + 1})
  }
  window.location.reload();
}

async function getAllCards() {
  let res = await axios("http://localhost:3000/users");
  let data = await res.data;
  
  cards.innerHTML = "";
  copyArr = data;
  filteredArr = filteredArr.length ? filteredArr : data;
  filteredArr.forEach((el) => {
    if(el.inBasket){
      basketDot.style.display="inline"
    }
    // console.log(el.isFavorite);
    // if (el?.isFavorite) {
      cards.innerHTML += `
      <div class="col col-md-4 col-12 mt-4">
      <div class="card">
        
        ${el.isFavorite ? 
          `<div class="fav" onClick="toggleFav(${el.id}, ${el.isFavorite})">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(153, 8, 42)" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>
          </div>` 
          :  
        ` <div class="fav" onClick="toggleFav(${el.id}, ${el.isFavorite})">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(153, 8, 42)" class="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
         </svg>
         </div>
         `}

        
        <img width="60px" src="${el.photo}" alt="" />
        <div class="card-body">
          <h5>${el.title}</h5>
          <p>
            ${el.about}
          </p>
          <span>${el.price}$</span>
          
          <div>
          <a class="btn btn-primary m-3" href="./details.html?id=${el.id}" >LEARN MORE</a>
            <a onclick="toBasket(${el.id}, ${el.inBasket})" class="btn btn-dark" >Add Basket</a>
          </div>
        </div>
      </div>
    </div>
    `;
    // } else {
//       cards.innerHTML += `
//         <div class="col col-md-4 col-12 mt-4">
//         <div class="card">
//           <div class="fav">
//           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(153, 8, 42)" class="bi bi-heart" viewBox="0 0 16 16">
//   <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
// </svg>
//           </div>
//           <img width="60px" src="${el.photo}" alt="" />
//           <div class="card-body">
//             <h5>${el.title}</h5>
//             <p>
//               ${el.about}
//             </p>
//             <span>${el.price}$</span>
//             <a class="btn btn-primary m-3" href="./details.html?id=${el.id}" >LEARN MORE</a>
//             <div>
//               <a onclick=deleteBtn(${el.id}) class="btn btn-danger" >DELETE</a>
//               <a onclick="addFav(${el.id})" class="btn btn-dark" >Add Basket</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       `;
//     }
  });
}

getAllCards();

searchInput.addEventListener("input", function (e) {
  filteredArr = copyArr;
  filteredArr = filteredArr.filter((el) =>
    el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  getAllCards();
});

sortBtn.addEventListener("change", function (e) {
  if (e.target.value === "za") {
    filteredArr.sort((a, b) => a.price - b.price);
  } else if (e.target.value === "az") {
    filteredArr.sort((a, b) => b.price - a.price);
  } else {
    filteredArr = [];
  }
  getAllCards();
});

function deleteBtn(id) {
  axios
    .delete(`http://localhost:3000/users/${id}`)
    .then((res) => window.location.reload());
}

// async function addFav(cardId) {
//   let res = await axios(`http://localhost:3000/users/${cardId}`);
//   let obj = await res.data;
//   axios.post(`http://localhost:3000/basket`, obj);
// }
