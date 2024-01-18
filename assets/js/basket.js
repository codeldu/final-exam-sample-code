// let BASE_URL = `http://localhost:3000/basket`;
let cards = document.querySelector(".cards");
let sortBtn = document.querySelector(".sort");
let emptyAlert = document.querySelector('.empty')
let sorted = "asc";
let filteredArr = [];

let addCount = async (id, count) => {
  await axios.patch("http://localhost:3000/users/"+id, {inBasket : count + 1})
  window.location.reload()
}

let removeCount = async (id,count) => {
  if( count  == 1 ){
    await axios.patch("http://localhost:3000/users/"+id, {inBasket : null})
  }else{
    await axios.patch("http://localhost:3000/users/"+id, {inBasket : count - 1})
    window.location.reload();
  }

}

async function getAllCards() {
  let res = await axios("http://localhost:3000/users/");
  let data = await res.data;
  
  filteredArr = filteredArr.length ? filteredArr : data;
  filteredArr.forEach((el) => {
    if (el.inBasket) {
      emptyAlert.style.display = 'none'
      cards.innerHTML += `
        <div class="col col-md-4 col-12 mt-4">
        <div class="card">
          <img width="60px" src="${el.photo}" alt="" />
          <div class="card-body">
            <h5>${el.title}</h5>
            <p>
              ${el.about}
            </p>
            <span>${el.price * el.inBasket}$</span>
            <div>
              <a onclick="removeCount(${el.id}, ${el.inBasket})" class="btn btn-danger" >-</a>
              <span> ${el.inBasket}</span>
              <a onclick="addCount(${el.id},${el.inBasket})" class="btn btn-danger" href="">+</a>
            </div>
          </div>
        </div>
      </div>
        `;
    }
  });
}
getAllCards();




