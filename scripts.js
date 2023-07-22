let place_name='Тюмень' // todo: запросить у пользователя 

const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`
const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?hourly=pm10,pm2_5`

const div = document.getElementById('air-pollution')

function createNode(element) {
    return document.createElement(element)
}

function append(parent, element) {
    return parent.appendChild(element)
}

fetch(API_URL_GEO_DATA)
.then((resp)=>resp.json())
.then((data)=>{
    let placeColl=data.response.GeoObjectCollection.featureMember
    return placeColl.map((x) => {
        let crd=x.GeoObject.Point.pos.split(' ')
        
        let divPlace=createNode('div')
        
        let p=createNode('p')
        p.innerHTML=`${x.GeoObject.name}, ${x.GeoObject.description??"-"}`

        append(divPlace, p)
        append(div, divPlace)

        let url=`${API_OPEN_METEO}&latitude=${crd[1]}&longitude=${crd[0]}` 
        fetch(url)
        .then((resp)=>resp.json())
        .then((data)=>{
            let hourly=data.hourly
            let hourly_units=data.hourly_units
            console.log(hourly)
            console.log(hourly_units)
            let len=hourly.time.length
            let ui=createNode('ui')
            for (let i = 0; i < len; i++) {
                let li = createNode('li')
                let span = createNode('span')
                //время : количество частиц pm10 : количество частиц pm2_5
                span.innerHTML = `${hourly.time[i]} : ${hourly.pm10[i]} ${hourly_units.pm10} : ${hourly.pm2_5[i]} ${hourly_units.pm2_5}`
                append(li, span)
                append(ui, li)
            }
            append(divPlace, ui)
        })
    })
})
.catch(function(error) {
    console.log(error);
})
