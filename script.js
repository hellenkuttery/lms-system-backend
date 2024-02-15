
apikey="21da56693756959a0ff0f1d1a981077d"

const browserLanguage = navigator.language
console.log(navigator)
console.log("Tarayıcı dil ayarı: " + browserLanguage);

const url=`https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=${apikey}&lang=${browserLanguage}`

const getData=async()=>{
    console.log(url)
    const res=await fetch(url)
    const data=await res.json()
    console.log(data)
}
getData()

