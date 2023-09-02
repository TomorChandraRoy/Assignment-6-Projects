const youtubeFile = async () => {
    const youtubeFach = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const youtubeJeson = await youtubeFach.json();
    const youtubeData = youtubeJeson.data;
  
    youtubeData.forEach((data) => {
        const tubeSingleContaine = document.getElementById('title-container')

        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
       
          <button onclick="youtubeButton(${data.category_id })"  class="btn hover:bg-red-500">${data.category}<button>
           
        `;
        tubeSingleContaine.appendChild(newDiv)
    });

};

let globalSort = [];

const youtubeButton = async (categoryId) => {
    const youtubeAllCategory = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const youtubeAllFile = await youtubeAllCategory.json();
    const fileData = youtubeAllFile.data

    globalSort = fileData;

    const image = document.getElementById('image')
    if(fileData.length ===0 ){
      image.classList.remove('hidden')
    }
    else{
      image.classList.add('hidden')
    }

    const youtubeContainer = document.getElementById('youtube-container');

    youtubeContainer.innerHTML = "";
    
         fileData.forEach((youtubePost) => {
          
          function toHoursAndMinutes(totalSeconds) {
            if(totalSeconds){
              const totalMinutes = Math.floor(totalSeconds  / 60);
          
              const hours = Math.floor(totalMinutes  / 60);
              const minutes = totalMinutes % 60;
              
              return `<div>${hours}hrs ${minutes}min ago</div>`;
            }

            else {
              return ""
            }

          };

          const containDiv = document.createElement('div')
         containDiv.innerHTML =`
         <div class="card card-compact bg-base-100">
            <img class="w-[312px] h-[200px] rounded-lg" src="${youtubePost?.thumbnail}" alt="youtube thumbnail" /> 
            <div class="   text-white  ml-auto  mr-3  ">
            <div class="px-[6px]  text-right rounded-lg bg-black -my-7 ">
               ${toHoursAndMinutes(youtubePost.others.posted_date) 
               }
            </div>
            </div>
            <div class="card-body mt-5">
              <div class=flex>
                <div>
                  <div class="avatar">
                  <div class="w-14 rounded-full mt-[14px] ">
                   <img src="${youtubePost?.authors[0].profile_picture}"/>
                  </div>
                </div>
                </div>
                <div class="ml-6 mt-[12px]">
                 <h4 class="font-bold text-base ">${youtubePost?.title}</h4>
                  <div class="flex font-normal text-lg ">
                   <div>
                     <p class="">${youtubePost?.authors[0].profile_name}</p>
                    </div>
                    <div>
                     <p class=" ml-2 w-[23px] lg:ml-4 mt-1">${ youtubePost.authors[0].verified ? `<img src=image/verified.png />` :"" }</p>
                    </div>
                  </div>
                  <p>
                   <h3>${youtubePost?.others.views} <span> views</span> </h3>
                  </p>
                </div>
             </div>

          </div>
        `;
        youtubeContainer.appendChild(containDiv)
    });

};

const showDetails =()=>{

  function toHoursAndMinutes(totalSeconds) {
    if(totalSeconds){
      const totalMinutes = Math.floor(totalSeconds  / 60);
  
      const hours = Math.floor(totalMinutes  / 60);
      const minutes = totalMinutes % 60;
      
      return `<div>${hours}hrs ${minutes}min ago</div>`;
    }

    else {
      return ""
    }
  }
  const youtubeContainer = document.getElementById('youtube-container');
  youtubeContainer.innerHTML = "";

  globalSort.sort((a,b) => parseFloat(b.others.views) - parseFloat(a.others.views))
  globalSort.forEach((youtubePost) => {
    const containDiv = document.createElement('div')
    containDiv.innerHTML =`
    <div class="card card-compact bg-base-100">
       <img class="w-[312px] h-[200px] rounded-lg" src="${youtubePost?.thumbnail}" alt="youtube thumbnail" /> 
       <div class="   text-white  ml-auto  mr-3  ">
       <div class="px-[6px]  text-right rounded-lg bg-black -my-7 ">
          ${toHoursAndMinutes(youtubePost.others.posted_date) 
          }
       </div>
       </div>
       <div class="card-body mt-5">
         <div class=flex>
           <div>
             <div class="avatar">
             <div class="w-14 rounded-full">
              <img src="${youtubePost?.authors[0].profile_picture}"/>
             </div>
           </div>
           </div>
           <div class="ml-6">
            <h4 class="font-bold text-base">${youtubePost?.title}</h4>
             <div class="flex font-normal text-lg mt-3">
              <div>
                <p>${youtubePost?.authors[0].profile_name}</p>
               </div>
               <div>
                <p class="ml-4">${ youtubePost.authors[0].verified ? `<img src=image/verified.png />` :"" }</p>
               </div>
             </div>
             <p>
              <h3>${youtubePost?.others.views} <span> views</span> </h3>
             </p>
           </div>
        </div>

     </div>
   `;
   youtubeContainer.appendChild(containDiv)
  });
};

youtubeFile();
youtubeButton(1000);