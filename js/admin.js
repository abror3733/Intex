// --------Add start --------

let elAddButton =document.querySelector(".inner__card-btn")
let elTbody =document.querySelector(".table__tbody")

let elModalWrapper =document.querySelector(".modal-wrapper")
let elModal =document.querySelector(".modal")

let elInnerList =document.querySelector(".inner__list")
elInnerList.addEventListener("click",function(evt){
  renderProducts(products,elTbody,evt.target.id)

})

let products =JSON.parse(window.localStorage.getItem("products")) || []



// --------Modal start --------
elAddButton.addEventListener("click",function(){
  elModalWrapper.classList.add("open-modal")
  elModal.innerHTML =`
     <form class="add-form">
       <label class="form__label-dashed">
         <div class="modal__dashshed">
           <img src="./images/img.png" alt="img" width="350" height="50"/>
         </div>
         <input class="visually-hidden choose-img-input" type="file"/>
       </label>
       <div class="wrapp">
         <div class="form__wrap">
            <label class="form__label">
              <span class="">Enter  product name</span>
              <input class="form__label-input" type ="text" placeholder="Enter  product name"/>
            </label>
            <label class="form__label">
              <span class="">Enter product old price</span>
              <input class="form__label-input" type ="text" placeholder="Enter product old price"/>
            </label>
            <label class="form__label">
              <span class="">Enter product new price</span>
              <input class="form__label-input" type ="text" placeholder="Enter product new price"/>
          </label>
         </div>
         <div class="form__wrap">
           <label class="form__label">
              <span class="">Enter  product quantity</span>
              <input class="form__label-input" type ="text" placeholder="Enter  product quantity"/>
           </label>
           <label class="form__label">
              <span class="">Enter product old price</span>
               <select class="form__label-input">
                 <option value="0">Надувные</option>
                 <option value="1"> Каркасные</option>
               </select>
           </label>
           <label class="form__label">
              <span class="">Enter product new price</span>
                <select class="form__label-input">
                  <option value="0">Not</option>
                  <option value="1">Рекомендуем</option>
                  <option value="2">Cкидка</option>
                  <option value="3">Нет в наличии</option>
            </select>
           </label>
      </div>
      </div>
      <button type="submit" class="form__wrapp-btn">Добавить</button>
     </form>
  `

  let elForm = document.querySelector(".add-form")

  elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    let data = {
      id:products.length,
      img:URL.createObjectURL(evt.target[0].files[0]),
      name:evt.target[1].value,
      oldPrice:evt.target[2].value,
      newPrice:evt.target[3].value,
      quntity:evt.target[4].value,
      status:evt.target[5].value,
      type:evt.target[6].value 
    }
   products.push(data)
   renderProducts(products,elTbody,0)
   elModalWrapper.classList.remove("open-modal")
   window.localStorage.setItem("products", JSON.stringify(products))
  })

})


elModalWrapper.addEventListener("click",function(evt){
  if(evt.target.id == "modal-wrapper" ){
    elModalWrapper.classList.remove("open-modal")
  }
})
// --------Modal end --------

// ----------render start-------
 
function renderProducts(arr,list,id){
  list.innerHTML = ""
  arr.filter(item=>{
    if(item.type==id){
      let elaTr =document.createElement("tr")
      elaTr.innerHTML=`
           <td class="tbody-td td-first">
             <img src="${item.img}" alt="render-img" width="60" height="40"/>
           </td>
           <td class="tbody-td">
             <span class="tbody-span">${item.oldPrice}</span>
             <strong class="tbody-strong">${item.newPrice}</strong>
            </td>
            <td class="tbody-td">
                  ${item.quntity}
            </td>
            <td class="tbody-td ${item.status== "1" ? "text-green":""} ${item.status== "2" ? "text-yellow":""} ${item.status== "3" ? "text-red":""} ">
                 ${item.status == "0" ? "Простой" : ""}
                 ${item.status == "1" ? "Рекомендуем" : ""}
                 ${item.status == "2" ? "Cкидка" : ""}
                 ${item.status == "3" ? "Нет в наличии" : ""}
            </td>
                <td  class="tbody-td td-last">More,Update </td>
      `
      list.appendChild(elaTr)

    }
  })
}
renderProducts(products,elTbody,0)
// ----------render end-------