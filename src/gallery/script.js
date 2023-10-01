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
    .then((blob) => prepareRandomImage(blob, i))
}

function prepareRandomImage(blob, i) {
    const fr = new FileReader()
    fr.onloadend = function() {
        const dataUrl = fr.result
        const img = document.createElement('img')
        img.src = dataUrl
        img.className=`img-${i+1}`
        container.appendChild(img)
    }
    fr.readAsDataURL(blob)
}