


let elAddBtn = document.querySelector(".add-btn")
let eltBody =document.querySelector(".tbody")

let elModalWrapper =document.querySelector(".modal-wrapper")
let elModal =document.querySelector(".modal")

let elNavList =document.querySelector(".nav-list")
let elItem1 =document.querySelector(".item-1")
let elItem2 =document.querySelector(".item-2")

let elSearchInput =document.querySelector(".search-input")

elNavList.addEventListener("click",function(evt){
  if(evt.target.id){
    if( evt.target.id==0 ){
      elItem1.classList.add("item-active")
      elItem2.classList.remove("item-active")
    }
    else{
      elItem2.classList.add("item-active")
      elItem1.classList.remove("item-active")
    }
   
    renderProducts(products,eltBody,evt.target.id )
  }

  // if(evt.target.id==0){
  //   evt.target.className ="text-[#009398]   border-b-[3px] border-[#009398]"
  // }
  // else {
  //   evt.target.className ="text-[#009398]   border-b-[3px] border-[#009398]"
  // }
 
})

// ------Add modal start------

let products =JSON.parse(window.localStorage.getItem("products")) || []


elAddBtn.addEventListener("click",function(){
  elModalWrapper.classList.add("open-modal")
  elModal.innerHTML=`
     <form class="add-form">
        <label>
           <div class="w-[80%] h-[200px] rounded-[10px] bg-white border-[2px] border-dotted border-black p-[40px] m-auto cursor-pointer  flex items-center justify-center">
             <img class="render-img" src="./images/img.png" alt="img" width="250" height="45"/>
             <input class="visually-hidden get-img " type ="file"/>
           </div>
        </label>
         <div class="p-3 mt-3 flex justify-between">
           <div class="w-[48%] flex flex-col gap-[5px]">
              <label class="flex flex-col">
                 <span>Enter product name</span>
                 <input class=" outline-none  border-b-[1px] border-black p-2"  type="text" placeholder="Enter product name"/>
              </label>
              <label class="flex flex-col">
                 <span>Enter product old price</span>
                 <input class=" outline-none  border-b-[1px] border-black p-2"  type="text" placeholder="Enter product old price"/>
              </label>
              <label class="flex flex-col">
                 <span>Enter product new price</span>
                 <input class="  outline-none border-b-[1px] border-black p-2" itype="text" placeholder="Enter product new price"/>
              </label>
           </div>
           <div class="w-[48%]  flex flex-col gap-[5px]">
               <label class="flex flex-col">
                   <span>Enter product quantity</span>
                   <input class=" border-b-[1px] border-black outline-none  p-2"  type="text" placeholder="Enter product quantity "/>
               </label>
               <label class="flex flex-col">
                   <span >Choose type</span>
                   <select class="p-2 pt-[13px] border-b-[1px] border-black outline-none">
                       <option value="0">Каркасные</option>
                       <option value="1">Надувные</option>
                   </select>
               </label>
               <label class="flex flex-col">
                   <span>Choose status</span>
                   <select class="p-2  pt-[13px] border-b-[1px] border-black outline-none">
                         <option value="0">Not</option>
                         <option value="1">Рекомендуем</option>
                         <option value="2">Cкидка</option>
                         <option value="3">Нет в наличии</option>
                   </select>
               </label>
           </div>
         </div>
        <span>
        <img class="absolute left-[640px] top-[20px] cursor-pointer  hover:scale-150 ease-linear duration-200 z-500" id="ximg" src="./images/xxx.svg" alt="icon" width="15" height="15">
        </span>
        <button class="mt-[10px] w-[200px] py-[8px] px-[15px] font-bold text-[22px] text-white bg-[#009398] rounded-[25px] mx-[220px] hover:opacity-50 ease-linear duration-200 ">Добавить</button>
     </form>
  `

   let elForm=document.querySelector(".add-form")
   let elInputChange =document.querySelector(".get-img ")
   let elRenderImg =document.querySelector(".render-img ")

  

   elInputChange.addEventListener("change",function(evt){
      elRenderImg.src =URL.createObjectURL(evt.target.files[0])
   })
    

   elForm.addEventListener("submit",function(evt){
    evt.preventDefault()
    let data = {
      id:products.length,
      img:URL.createObjectURL(evt.target[0].files[0]),
      name:evt.target[1].value,
      oldPrice:evt.target[2].value,
      newPrice:evt.target[3].value,
      quantity:evt.target[4].value,
      type:evt.target[5].value,
      status:evt.target[6].value
    }
    products.push(data)
    renderProducts(products,eltBody,evt.target[5].value)
    elModalWrapper.classList.remove("open-modal")
    window.localStorage.setItem("products", JSON.stringify(products))
   })

})

elModalWrapper.addEventListener("click",function(evt){
  if(evt.target.id == "modal-wrapper" || evt.target.id == "ximg"){
    elModalWrapper.classList.remove("open-modal")
  }
})

function renderProducts(arr,list,id){
  list.innerHTML=``
  arr.filter(item=>{
    if(item.type == id){
      let elTr = document.createElement("tr")
  
      elTr.innerHTML=`
      <td class="text-center p-2 bg-slate-200 rounded-l-[20px]">
      <img class="mx-auto" src="${item.img}" alt="render-img" width="60" height="30"/>
      </td>
      <td class="text-center p-2 bg-slate-200">
        <span>${item.name}</span>
      </td>
      <td class="text-center p-2 bg-slate-200">
         <span class="text-[15px] line-thrugh">${item.oldPrice}</span>
         <strong class="text-[18px] line-throw">${item.newPrice}</strong>
      </td>
      <td class="text-center p-2 bg-slate-200">
          <span>${item.quantity}</span>
      </td>
      <td class="text-center p-2 bg-slate-200 ${item.status == "1" ? "text-green-500" :""} ${item.status == "2" ? "text-yellow-500" :""} ${item.status == "3" ? "text-red-500" :""}">
           ${item.status == "0" ? "Простой" : ""}
           ${item.status == "1" ? "Рекомендуем" : ""}
           ${item.status == "2" ? "Cкидка" : ""}
           ${item.status == "3" ? "Нет в наличии" : ""}
      </td>
      <td class="text-center p-2 bg-slate-200 rounded-r-[20px]">
        <button onclick="updateProduct(${item.id})" class="p-1 bg-green-500 text-white border-none rounded-md hover:opacity-50 ease-linear duration-200">Update</button>
        <button onclick="deleteProduct(${item.id})" class="p-1 bg-red-500 text-white border-none rounded-md hover:opacity-50 ease-linear duration-200">Delete</button>
      </td>
      `
      list.appendChild(elTr)
    }
  })
}
renderProducts(products,eltBody,0)
// ------Add modal end------
// --------Update start -------

function updateProduct(id){
  let data = products.find(item=> item.id==id)
  elModalWrapper.classList.add("open-modal")
  elModal.innerHTML=`
     <form class="update-form">
        <label>
           <div class="w-[80%] h-[200px] rounded-[10px] bg-white border-[2px] border-dotted border-black p-3 m-auto cursor-pointer  flex items-center justify-center">
             <img class="update-render-img" src=${data.img} alt="img" width="350" height="45"/>
             <input  class="visually-hidden update-get-img " type ="file"/>
           </div>
        </label>
         <div class="p-3 mt-3 flex justify-between">
           <div class="w-[48%] flex flex-col gap-[5px]">
              <label class="flex flex-col">
                 <span>Enter product name</span>
                 <input value="${data.name}" class=" outline-none  border-b-[1px] border-black p-2"  type="text" placeholder="Enter product name"/>
              </label>
              <label class="flex flex-col">
                 <span>Enter product old price</span>
                 <input value="${data.oldPrice}" class=" outline-none  border-b-[1px] border-black p-2"  type="text" placeholder="Enter product old price"/>
              </label>
              <label class="flex flex-col">
                 <span>Enter product new price</span>
                 <input value="${data.newPrice}" class="  outline-none border-b-[1px] border-black p-2" itype="text" placeholder="Enter product new price"/>
              </label>
           </div>
           <div class="w-[48%]  flex flex-col gap-[5px]">
               <label class="flex flex-col">
                   <span>Enter product quantity</span>
                   <input value="${data.quantity}" class=" border-b-[1px] border-black outline-none  p-2"  type="text" placeholder="Enter product quantity "/>
               </label>
               <label class="flex flex-col">
                   <span >Choose type</span>
                   <select class="p-2 pt-[13px] border-b-[1px] border-black outline-none update-type-select">
                       <option value="0">Каркасные</option>
                       <option value="1">Надувные</option>
                   </select>
               </label>
               <label class="flex flex-col">
                   <span>Choose status</span>
                   <select class="p-2  pt-[13px] border-b-[1px] border-black outline-none update-status-select">
                         <option value="0">Not</option>
                         <option value="1">Рекомендуем</option>
                         <option value="2">Cкидка</option>
                         <option value="3">Нет в наличии</option>
                   </select>
               </label>
           </div>
         </div>
        <span>
        <img class="absolute left-[640px] top-[20px] cursor-pointer  hover:scale-150 ease-linear duration-200 z-500" id="ximg" src="./images/xxx.svg" alt="icon" width="15" height="15">
        </span>
        <button  class="mt-[10px] w-[200px] py-[8px] px-[15px] font-bold text-[22px] text-white bg-[#009398] rounded-[25px] mx-[220px] hover:opacity-50 ease-linear duration-200 ">Добавить</button>
     </form>
  `
  let elUpdateForm =document.querySelector(".update-form")
  let elTypeSelect = document.querySelector(".update-type-select")
  let elStatusSelect = document.querySelector(".update-status-select")
  let elUpdateImgInput = document.querySelector(".update-get-img")
  let elUpdateImg =document.querySelector(".update-render-img")


  elTypeSelect.value=data.type
  elStatusSelect.value=data.status

  elUpdateImgInput.addEventListener("change",function(evt){
    elUpdateImg.src=URL.createObjectURL(evt.target.files[0])
  })

  elUpdateForm.addEventListener("submit",function(evt){
    evt.preventDefault()
    data.img=elUpdateImg.src
    data.name=evt.target[1].value
    data.oldPrice=evt.target[2].value
    data.newPrice=evt.target[3].value
    data.quantity=evt.target[4].value
    data.type=evt.target[5].value
    data.status=evt.target[6].value
    
    elModalWrapper.classList.remove("open-modal")
    renderProducts(products,eltBody,evt.target[5].value)
    window.localStorage.setItem("products", JSON.stringify(products))
  })

}


// --------Update end -------
// --------Delete start -------

function deleteProduct(id){
  let findObj =products.find(item=>item.id==id)
  let finedIndex =products.findIndex(item=>item.id==id)
  let confirmDelete =confirm()
  if(confirmDelete==true){
    products.splice(finedIndex,1)
    renderProducts(products,eltBody,findObj.type)
    window.localStorage.setItem("products", JSON.stringify(products))
  }
  else{
    renderProducts(products,eltBody,findObj.type)
  }
}

// --------Delete end -------

// --------Search start -------
let elSearchList =document.querySelector(".search-list")
elSearchInput.addEventListener("keyup",function(evt){
 let data =products.filter(item=>item.name.toLowerCase().includes(evt.target.value.toLowerCase()))
 elSearchList.innerHTML=``
 data.map(item=>{
  let elListItem =document.createElement("li")
  elListItem.classList.add("list-item")
  elListItem.dataset.id=item.id
  elListItem.textContent=`${item.name} - ${item.newPrice}`
  elSearchList.appendChild(elListItem)
 
  elListItem.addEventListener("cilck", function(evt){
  let clickedid = evt.target.dataset.id
  let dataClick =products.find(item=>item.id==clickedid)
  elSearchInput.value = `${dataClick.name}`

  let elSearchFilter =products.filter(item=>item.id == clickedid)
 renderProducts(elSearchFilter,eltBody,dataClick.type)
  })

 })
    

     if(evt.target.value){
      elSearchList.classList.add("open-list")
     }
     else{
          elSearchList.classList.remove("open-list")
     }


})


// --------Search end -------

elSearchInput.addEventListener("blur",function(evt){
  elSearchList.classList.remove("open-list")
})