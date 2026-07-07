const images = [
    {
        image: "images/nature1.jpg",
        category: "Nature"
    },
    {
        image: "images/nature2.jpg",
        category: "Nature"
    },
    {
        image: "images/city1.jpg",
        category: "City"
    },
    {
        image: "images/city2.jpg",
        category: "City"
    },
    {
        image: "images/animal1.jpg",
        category: "Animals"
    },
    {
        image: "images/animal2.jpg",
        category: "Animals"
    },
    {
        image: "images/travel1.jpg",
        category: "Travel"
    },
    {
        image: "images/travel2.jpg",
        category: "Travel"
    }
];
const gallery = document.getElementById("gallery");
const imageCount = document.getElementById("imageCount");
function displayImages(imageArray) {

    gallery.innerHTML = "";
    imageCount.innerHTML = `Showing ${imageArray.length} Images`;
    
    if(imageArray.length === 0){

    gallery.innerHTML = `
        <h2 class="no-image">
            😔 No Images Found
        </h2>
    `;

    imageCount.innerHTML = "Showing 0 Images";

    return;

}
    imageArray.forEach((item) => {

        const card = document.createElement("div");
card.className = "card";

const img = document.createElement("img");
img.src = item.image;
img.alt = item.category;

// Open Lightbox
img.addEventListener("click", () => {
    openLightbox(item.image);
});

card.appendChild(img);
gallery.appendChild(card);
    
    });

}

displayImages(images);
const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add active class only to the clicked button
        button.classList.add("active");

        const category = button.dataset.category;

        if(category === "All"){
            displayImages(images);
        }
        else{
            const filteredImages = images.filter(item => item.category === category);
            displayImages(filteredImages);
        }

    });

});
const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", () => {

    const searchText = searchInput.value.toLowerCase();

    const searchedImages = images.filter(item =>
        item.category.toLowerCase().includes(searchText)
    );

    displayImages(searchedImages);

});
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const downloadBtn = document.getElementById("downloadBtn");
let currentIndex = 0;


closeBtn.addEventListener("click", ()=>{

    lightbox.style.display = "none";

});
lightboxImage.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent closing
});
lightboxImage.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // stop menu

    // RIGHT CLICK → NEXT
    nextBtn.click();
});
lightboxImage.addEventListener("mousedown", (e) => {

    // left click only
    if(e.button === 0){
        prevBtn.click();
    }
});
lightboxImage.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // stop menu
    nextBtn.click();
});
lightbox.addEventListener("click", (e) => {

    if(e.target === lightbox){
        lightbox.style.display = "none";
    }
});
document.addEventListener("keydown", (e) => {

    if(lightbox.style.display !== "flex") return;

    if(e.key === "ArrowRight"){
        showImage(currentIndex + 1);
    }

    if(e.key === "ArrowLeft"){
        showImage(currentIndex - 1);
    }

    if(e.key === "Escape"){
        lightbox.style.display = "none";
    }
});
function showImage(index){

    if(index < 0){
        index = images.length - 1;
    }

    if(index >= images.length){
        index = 0;
    }

    currentIndex = index;

    lightboxImage.src = images[currentIndex].image;

    downloadBtn.href = images[currentIndex].image;
}
nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
});
function openLightbox(imgSrc){

    lightbox.style.display = "flex";

    lightboxImage.src = imgSrc;

    lightboxImage.style.display = "block";
    lightboxImage.style.opacity = "1";
    lightboxImage.style.visibility = "visible";

    console.log(lightboxImage.src);
}


const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeToggle.innerHTML = "☀️";
    } else {
        themeToggle.innerHTML = "🌙";
    }
});