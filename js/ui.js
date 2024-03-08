



let elKarkasniyList = document.querySelector(".karkasniy-list")
let elNaduvniyList = document.querySelector(".naduvniy-list")

let elModalWrapper =document.querySelector(".modal-wrapper")
let elModal =document.querySelector(".modal")

let datas = new Date()
let newTime =`${datas.getDate().toString().padStart(2,"0")}.${(datas.getMonth() + 1).toString().padStart(2,"0")}.${datas.getFullYear()} ${datas.getHours().toString().padStart(2,"0")}:${datas.getMinutes().toString().padStart(2,"0")}`
let orderProductList = []
let products =JSON.parse(window.localStorage.getItem("products"))

function renderProduct(arr,list,id){
  if (id === "0") {
    list = elKarkasniyList;
  } else if (id === "1") {
    list = elNaduvniyList;
  } else {
    // Xatolikni aniqlash
    console.error("Noto'g'ri ro'yxat IDsi:", id);
    return;
  } 
  
  
  list.innerHTML=" "
  arr.map(item=>{
    let elItem = document.createElement("li")
    elItem.classList.add("list-item")
    elItem.innerHTML=`
    <div class="top-status ${item.status == 1 ? "w-[140px] h-[30px] p-[4px] bg-[#139D4B] text-white text-[15px] font-bold" : ""} ${item.status == 2 ? "w-[140px] h-[30px] p-[4px] bg-[#FFD600] text-white text-[15px] font-bold" : ""}  ${item.status == 3 ? "w-[140px] h-[30px] p-[4px] bg-[#ED2020] text-white text-[15px] font-bold" : ""}">
    <span>
    ${item.status == 0 ? "" : ""}
    ${item.status == 1 ? "Рекомендуем" : ""}
    ${item.status == 2 ? "Cкидка" : ""}
    ${item.status == 3 ? "Нет в наличии" : ""}
    </span>
    </div>
    
    <h4 class="text-[#009398] text-[24px] mb-[10px] font-semibold">${item.name}</h4>
    <img class="inline-block mb-[20px]" src="${item.img}" width="180" height="100" alt="Img"/>
    <div class="flex items-center justify-center gap-[30px]">
    <div class="flex flex-col">
    <small  class="text-[#848484] line-through">${item.oldPrice}:сум</small>
    <span  class="font-semibold text-[16px]">${item.newPrice}:сум</span>
    </div>
    <button onclick="orderProduct(${item.id})" class=" order-btn bg-[#FFE600] font-semibold  text-[16px] w-[107px] h-[27px] py-[3px] px-[6px] rounded-tr-[10px] rounded-bl-[10px] cursor-pointer">Заказать</button>
    </div>
    `
    list.appendChild(elItem)
  })
}
renderProduct(products,elKarkasniyList,"0")
renderProduct(products,elNaduvniyList,"1")


// -----order start ----- 

function orderProduct(id){
  let data =products.find(item=> item.id == id)
  elModalWrapper.classList.add("open-modal")
   elModal.innerHTML=`
   <img id="ximg" class="absolute left-[947px] top-[29px] cursor-pointer  hover:scale-150 ease-linear duration-200 z-500" id="ximg" src="./images/xxx.svg" alt="icon" width="18" height="18">
   </span>
   <div class="open-inner-modal w-[500px] h-[350px] flex  flex-col pt-[36px] px-[60px] text-center">
   <h4 class="text-[#009398] font-bold text-[35px] mb-[20px]">${data.name}</h4>
   <img class="mb-[60px] mx-auto" src="${data.img}" width="250" height=""200/>
   <span class="text-[20px] font-bold ">${data.newPrice}:сум</span>
   </div>
   <form class="order-form w-[365px] flex flex-col gap-[18px]">
   <input class="outline-none input-order pt-[17px] pl-[20px] pb-[8px] text-[22px] font-bold text-[#A3A3A3] w-[358px] h-[60px]" type="text" placeholder="Ваше имя"/>
   <input class="outline-none input-order pt-[17px] pl-[20px] pb-[8px] text-[22px] font-bold text-[#A3A3A3] w-[358px] h-[60px]" type="tel" placeholder="Ваш номер"/>
   <label class="flex justify-between">
   <input class="outline-none input-order pt-[17px] pl-[20px] pb-[8px] text-[22px] font-bold text-[#A3A3A3] w-[270px]" type="text" placeholder="Ваш адрес"/>
   <img class="karta-img pt-[11px] px-[15px] pb-[15px]" src="./images/karta.svg"   wifth="44" heigth="37" alt="karta"/>
   </label>
   <button class="w-[240px]  mt-[20px] mx-auto text-[24px] pt-[8px] px-[15px] pb-[4px] text-black order-btn-modal font-bold">Заказать</button>
   </form>

   `
  let elOrderForm =document.querySelector(".order-form")
  elOrderForm.addEventListener("submit", function(evt){
    let newTime =`${datas.getDate().toString().padStart(2,"0")}.${(datas.getMonth() + 1).toString().padStart(2,"0")}.${datas.getFullYear()} ${datas.getHours().toString().padStart(2,"0")}:${datas.getMinutes().toString().padStart(2,"0")}`
    evt.preventDefault()
    let orderData={
      orderName:evt.target[0],
      phoneNumber:evt.target[1],
      address:evt.target[2],
      time:newTime,
      id:orderProductList.length ? orderProductList[orderProductList.length-1].id + 1 : 1,
      img:data.img,
      price:data.newPrice
    }
    console.log(orderData);
  })
}
orderProduct(id)




elModalWrapper.addEventListener("click",function(evt){
  if(evt.target.id == "modal-wrapper" || evt.targe.id == "ximg"){
    elModalWrapper.classList.remove("open-modal")
  }
})
// -----order end ----- 

