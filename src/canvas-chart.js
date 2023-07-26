function renderChart(canvas, data) {
    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray)
    }

    const series=[data.pm10, data.pm2_5]
    const labels=data.time
    const colors=['rgba(64,128,255,0.5)', 'rgba(128,255,64,0.5)']

    const nPoints = Math.max(series[0].length, series[1].length) // количество точек
    const hBarMax = Math.ceil(Math.max(getMaxOfArray(series[0]), getMaxOfArray(series[1]))) // значения по у, в мировых координатах
    const d=Math.min(canvas.width, canvas.height)*0.05 //расстояние до рамки
    const hText = 18 // высота подписей

    const h=canvas.height-2*d-hText // рабочая высота
    const w=(canvas.width-2*d)/nPoints // ширина блока
    const xGap=w*0.2 // растояние между блоками
    const sGap=xGap*0.2 // растояние между сериями
    const n = series.length // количество серий
    const wBar=(w-xGap-sGap*(n-1))/n // ширина прямоугольника
    
    const ctx = canvas.getContext('2d')

    // оси и канва
    ctx.strokeStyle = 'rgb(224, 224, 224)'
    ctx.lineWidth = 1; // Ширина линии
    const nHorLine=5
    const stick=5 // деление в px
    for(let i = 0; i <=nHorLine; i++) { 
        ctx.beginPath(); 
        ctx.moveTo(d-stick, d+h-i*h/nHorLine)
        ctx.lineTo(w*nPoints+d, d+h-i*h/nHorLine)
        ctx.stroke()
    }
    // вертикальная 
    for(let i=0; i<nPoints; i++) { 
        ctx.beginPath(); 
        ctx.moveTo(d+i*w, d+h+stick)
        ctx.lineTo(d+i*w, d)
        ctx.stroke()
    }

    // цикл для отрисовки bar-графиков 
    for (let k=0; k<n; k++) {
        ctx.fillStyle = colors[k]; 
        for(var i=0; i<nPoints; i++) { 
            const hBar = series[k][i]*h/hBarMax 
            ctx.fillRect(d+i*w+xGap/2+k*(wBar+sGap), d+h-hBar, wBar, hBar)
        }
    }

    // метки
    ctx.font = `${hText}px Times New Roman`; 
    ctx.fillStyle='black'
    for (let i=0; i<nPoints; i++){
        const wText=ctx.measureText(labels[i]).width
        ctx.fillText(labels[i], d+i*w+(w-wText)/2, h+d+hText)
    }
}
