const path = require("path")
const express = require("express")
const request = require("request")
const app = express()
const bodyParser = require("body-parser")

app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
const moment = require('moment')

const date = moment().format('LLLL')

app.get('/', (req, res) => {
    const city = "Tehran"
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`
    request(url, function (errpr, response, body) {
        weather_json = JSON.parse(body)

        var weather = {
            city: city,
            temperature: Math.floor((5 / 9) * (weather_json.main.temp - 32)),
            description: weather_json.weather[0].description,
            icon: weather_json.weather[0].icon,
            date: date

        }
        var weather_data = { weather: weather }
        res.render("weather", weather_data)
    })

})


app.post('/contact', (req, res) => {
    const city = req.body.weather
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`
    request(url, function (errpr, response, body) {
        weather_json = JSON.parse(body)

        var weather = {
            city: city,
            temperature: Math.floor((5 / 9) * (weather_json.main.temp - 32)),
            description: weather_json.weather[0].description,
            icon: weather_json.weather[0].icon,
            date: date
        }
        var weather_data = { weather: weather }
        res.render("weather", weather_data)
    })

})




app.listen(8000) 
