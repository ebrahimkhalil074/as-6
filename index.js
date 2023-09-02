document.getElementById('blog-btn').addEventListener('click',()=>{  
location.href = "blog.html"

})

let products=[]
const loadCategory= async( )=>{
  
const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data =await res.json()
const allCategories= data.data
displayCategory(allCategories)
 handelCategories()
}

const displayCategory =(allCategories)=>{

allCategories.forEach(category => {
//  console.log(category);
 const container =document.getElementById('container')
 const div =document.createElement('div')
 div.className = 'border-2 py-1 px-4 outline bg-zinc-300 rounded-lg'
 div.innerHTML=`
 <a onclick="handelCategories('${category.category_id}')" onclick="loading() onclick="sortHandel"('${category.category_id}')"  ">${category.category}</a>
 `
 container.appendChild(div)
 
});

}
const handelCategories = async(id=1000)=>{
  const cardContainer = document.getElementById('card-container')
  cardContainer.textContent=''
    
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json()
    const allData=data.data
     console.log(allData);
     products=data.data
     if(allData.length <=0){
      const opps=document.getElementById("opps-container")
      opps.classList.remove("hidden")
      
      }else{
        const opps=document.getElementById("opps-container")
        opps.classList.add("hidden")
       
      }
time(allData)
      displayData(allData)
    }

    const time =(allData)=>{
console.log(allData);

    }

      function displayData(allData,products) {

        const cardContainer = document.getElementById('card-container')
    cardContainer.textContent=''

        allData.forEach(data=>{
    
          //  console.log(data);
      //  console.log(data.authors[0].verified);
      const div = document.createElement("div");
      // console.log(data.others.views);
      
       let verified='';
       
       if(data.authors[0].verified){
        verified += `<i class="fa-solid fa-circle-check text-green-400"></i>`;
       }

       div.innerHTML = `
       
       <div class="card w-96 bg-base-100 shadow-xl">
       <figure><img class="w-full h-60" src="${data.thumbnail
       }" alt="" />
       </figure>
      
       <div class="card-body">
       <div class=" flex gap-4">
       <div>
       <img class=" w-12 h-12 rounded-full " src="${data.authors[0].profile_picture}"
       </div>
       
       </div>
       <h2 class="card-title  ">${data.title
       }</h2> 
       </div>
       <div class='flex items-center gap-3'>
        <h2>${data.authors[0].profile_name} </h2>
        ${verified}
       </div>
      
       <p>${data.others.views
       }</p>
      
      </div>
      
       `
         cardContainer.appendChild(div) 
         
       })
      
      }
      const sortProducts = ()=>{

        products.forEach(item => {
          item.others.views = parseInt(item.others.views);
      });
        products.sort((a, b) => b.others.views - a.others.views);
        products.forEach(item => {
          item.others.views = item.others.views+'k';
      });
      displayData(products);
      
      
      }
    
      loadCategory()











