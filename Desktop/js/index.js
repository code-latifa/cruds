let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("click");
let choose ="create";
let temp;




function gettotal(){
    if(price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='rgb(29, 92, 4)';
        
    }
    else{
        total.innerHTML=' ';
        total.style.background='rgb(192, 55, 13)';
    }

}
let data=[];
if(localStorage.product!=null){
      data=JSON.parse(localStorage.product);
}
else{
    data=[];
}
submit.onclick=function(){
             let newproduct={
                title:title.value,
                price:price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                category:category.value,


             }
            if(title.value!='' && price.value!=' ' && category.value!=''&& newproduct.count<50){
                if(choose==="create"){
                    if(newproduct.count>1){
                        for(let i=0;i<newproduct.count;i++){
                            data.push(newproduct);
                         }
                    }
             
                    else{
                         data.push(newproduct);
                         
                    }
                }
                
                else{
                     data[temp]=newproduct;
                     choose="create";
                     submit.innerHTML="Create";
                     count.style.display='block';
                }
                cleardata();

             }
             localStorage.setItem('product',JSON.stringify(data));
             readData();
}

 function cleardata(){
      title.value='';
      price.value='';
      taxes.value='';
      ads.value='';
      discount.value='';
      total.innerHTML='';
      count.value='';
      category.value='';
 }

 function readData(){
    gettotal();
    let table=''
       for(let i=0;i<data.length;i++){
            table+=
            `<tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="deletedata(${i})">delete</button></td>
            </tr>
        `
            
            
       }
       document.getElementById('tbody').innerHTML=table;
       let btnD=document.getElementById("deleteall");
       if(data.length>0){
           btnD.innerHTML=`<button onclick="DeleteAll()"> delete all</button>`;
       } 
       else{
          btnD.innerHTML='';
       }

 }
 readData();
 function deletedata(i){
    data.splice(i,1);
    localStorage.product=JSON.stringify(data);
    readData();

 }
function DeleteAll(){
    localStorage.clear();
    data.splice(0);
    readData();
    
}
function update(i){
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
    category.value=data[i].category;
    gettotal();
    count.style.display="none";
    submit.innerHTML='update';
    choose="update";
    temp=i;
    scroll({
        top:0,
        behavior:"smooth",

    })


}
let search=document.getElementById("search");
let searchemoode='title';
function getsearch(id){
    if(id=="search-by-title"){
        searchemoode='title';
        search.placeholder=" search-by-title";
    }
    else if(id=="search-by-category"){
        searchemoode='category';
        search.placeholder="search-by-category";
    }
search.focus();
}
function searchdata(value) {
    let table = '';
    value = value.toLowerCase();

    // Parcourir les données
    for (let i = 0; i < data.length; i++) {
        let match = false;

        if (searchemoode === 'title' && data[i].title.toLowerCase().includes(value)) {
            match = true;
        } else if (searchemoode === 'category' && data[i].category.toLowerCase().includes(value)) {
            match = true;
        }

        if (match) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="deletedata(${i})">delete</button></td>
                </tr>
            `;
        }
    }

    // Afficher un message si aucune donnée ne correspond
    if (table === '') {
        table = `<tr><td colspan="10">Aucune donnée trouvée</td></tr>`;
    }

    // Injecter le tableau dans le HTML
    document.getElementById('tbody').innerHTML = table;
}
