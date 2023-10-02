const API = 'https://api.api-ninjas.com/v1/randomimage?category=city'
const API_KEY='9X7n73EN9aVanLkIBvVOjw==OAJdGhxq889qM2bo'

const container=document.getElementById("image-container")

const n=9
for (let i=0;i<n;i++) {
    fetch(API, {
            headers: {'X-Api-Key': API_KEY, 'Accept': 'image/jpg'},
            contentType: 'image/jpg'
        })
    .then((response) => response.blob())
    .then((blob) => prepareRandomImage(blob))
}

function prepareRandomImage(blob) {
    const fr = new FileReader()
    fr.onloadend = function() {
        const dataUrl = fr.result
        const div = document.createElement('div')
        div.className="gallery__img-wrapper"
        const img = document.createElement('img')
        img.src = dataUrl 
        img.className='gallery__img'       
        container.appendChild(div)
        div.appendChild(img)
    }
    fr.readAsDataURL(blob)
}