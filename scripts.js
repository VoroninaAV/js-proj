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

function createAirPollutionTable(hourly, hourly_units) {
    let table = createNode('table')
    let cols = Object.keys(hourly_units)
    let tr = createNode('tr')
    cols.forEach(x => {
        let th = createNode('th')
        th.innerHTML = `${x} (${hourly_units[x]})`
        append(tr, th)
    })
    append(table, tr)
    for (let i = 0; i < hourly.time.length; i++) {
        let tr = createNode('tr')
        cols.forEach(x => {
            console.log(hourly.time[i])
            let td = createNode('td')
            td.innerHTML = `${hourly[x][i]}`
         
            append(tr, td)
        })
        append(table, tr)
    }
    return table
}

fetch(API_URL_GEO_DATA)
.then((resp)=>resp.json())
.then((data)=>{
    let placeColl=data.response.GeoObjectCollection.featureMember
    if (placeColl.length > 0)
        return placeColl.map((x) => {
            let crd = x.GeoObject.Point.pos.split(' ') 
            if (crd !== 'undefined') {
                let divPlace = createNode('div')
                
                let h1=createNode('h1')
                h1.innerHTML=`${x.GeoObject.name}, ${x.GeoObject.description??"-"}`

                append(divPlace, h1)
                append(div, divPlace)
                // получение инфо о загрязнении
                let url=`${API_OPEN_METEO}&latitude=${crd[1]}&longitude=${crd[0]}`  
                fetch(url)
                .then((resp)=>resp.json())
                .then((data)=>{
                    let table=createAirPollutionTable(data.hourly, data.hourly_units)
                    append(divPlace, table)
                })
            }
        })
})
.catch(function(error) {
    console.log(error);
})
