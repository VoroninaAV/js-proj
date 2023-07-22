let place_name='Тюмень' // todo: запросить у пользователя 

const API_KEY_YANDEX = '4c1c0bd1-f605-4dfd-afa4-d0770a7442a8'
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


function getAvgDataForChart(hourly){
    const getAverage = (numbers) => {
        const sum = numbers.reduce((acc, number) => acc + number, 0);
        const length = numbers.length;
        return sum / length;
    };

    let pm10=[]
    let pm2_5=[]
    let time=[]
   
    const n=24
    for(let i=0;i<hourly.time.length;i+=n){
        pm10.push(getAverage(hourly.pm10.slice(i, i+n-1)))
        pm2_5.push(getAverage(hourly.pm2_5.slice(i, i+n-1)))
        time.push(hourly.time[i].substring(0, 10))
    }

    return  { time: time, pm2_5:pm2_5, pm10:pm10 }
}

function createAirPollutionChartJS(data) {
    const ctx = createNode('canvas')
    ctx.width=150
    ctx.height=100
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.time,
            datasets: [{
                label: 'pm2_5',
                data: data.pm2_5, 
                borderWidth: 1
            },
            {
                label: 'pm10',
                data: data.pm10, 
                borderWidth: 1
            }]
        }
    })
    return ctx
}

fetch(API_URL_GEO_DATA)
.then((resp)=>resp.json())
.then((data)=>{
    let placeColl=data.response.GeoObjectCollection.featureMember
    if (placeColl.length > 0)
        return placeColl.map((x) => {
            let crd = x.GeoObject.Point.pos.split(' ') 
            console.log(crd)
            if (crd !== 'undefined') {
               let divPlace = createNode('div')
                 append(div, divPlace)

                let h1=createNode('h1')
                h1.innerHTML=`${x.GeoObject.name}, ${x.GeoObject.description??"-"}`
                append(divPlace, h1)
                
                let p=createNode('p')
                p.innerHTML=`${crd[0]}, ${crd[1]}`
                append(divPlace, p)
               
                // получение инфо о загрязнении
                let url=`${API_OPEN_METEO}&latitude=${crd[1]}&longitude=${crd[0]}`  
                fetch(url)
                .then((resp)=>resp.json())
                .then((data)=>{
                    const daily = getAvgDataForChart(data.hourly)
                    append(divPlace, createAirPollutionTable(daily, data.hourly_units))
                    append(divPlace, createAirPollutionChartJS(daily))
                })
            }
        })
})
.catch(function(error) {
    console.log(error);
})
