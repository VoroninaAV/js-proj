# Домашнее задание к занятию 4

1. В созданом ранее репозитории нужно создать файлы index.html и scripts.js 
2. В index.html сделать стандартную разметку текста, используя комбинацию клавиш в VS Code - > ! и затем нажать Tab. После чего у вас должен появиться стандартный шаблон для html страницы.
3. Подключить scripts.js в файле index.html в конце файла, как это делается найдите в поиске.
4. Далее создать тег 
```
 <div id="air-pollution"></div>
```
1. В файле scripts.js 
```
const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`
```
Используя url API: 
для получение координат (fetch) города API_URL_GEO_DATA - в переменную place_name передать название любого города.
получить координаты широты и долготы в ответе, которые расположены в объекте data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos

Разделить их на отдельные параметры, используя метод работы с созданием массива из строки (точнее посмотрите документацию по методам работы с массивом, который подойдет)

И только при наличии данных координат сделать fetch  запрос по url API_URL_GEO_DATA, в запрос которого нужно передать полученые ранее координаты широты и долготы.
// “широта, долгота” — Lat, Lng

Результат полученной информации о загрязнении (время : количество частиц pm10 : количество частиц pm2_5) вывести в браузере на странице, используя подход создания тегов (createNode) из лекционного материала. 

Домашнее задание - Занятие 4_испр.md