// menu js

  
    
// Gallary Js
const close = document.querySelector("#close");
const fullImg = document.querySelector('.fullImg');
const openImg = document.querySelector("#openImg");
const images = document.querySelectorAll("#imgcontainer img")
// console.log(images)

close.addEventListener("click",()=>{
    fullImg.style.display = "none";
})
function openImage(pic){
    fullImg.style.display = "flex";
    openImg.src = pic;
}

images.forEach(function (img) {
img.addEventListener("click", function () {
    openImage(img.src);
});
});