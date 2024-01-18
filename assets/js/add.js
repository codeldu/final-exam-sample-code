let titleInput = document.querySelector(".title");
let aboutInput = document.querySelector(".about");
let priceInput = document.querySelector(".price");
let photoInput = document.querySelector(".photo");
let addBtn = document.querySelector(".addbtn");
let roundedImage = document.querySelector(".rounded-image");
let table = document.querySelector("table");


const deleteEl = (id) => {
  axios.delete('http://localhost:3000/users/'+id)
  window.location.reload()
}

photoInput.addEventListener('input', (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      roundedImage.src = reader.result;
    }
  }
})


fetch("http://localhost:3000/users/")
.then(res => res.json())
.then(data => {
    console.log(data);
    data.forEach(element => {
        table.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td>${element.about}</td>
                <td>
                    <button onclick="deleteEl(${element.id})">Delete</button>
                </td>
            </tr>
        `
    })
})


addBtn.addEventListener("click", function () {
  if (titleInput.value !== "" && aboutInput.value !== "" && priceInput.value !== ""&&photoInput.value !== "") {
    axios.post(`http://localhost:3000/users`, {
      title: titleInput.value,
      about: aboutInput.value,
      price: priceInput.value,
      photo: roundedImage.src,
    })
    .then(res=>window.location='./index.html')
  }
  else{
    alert("Please select input value")
  }
})