const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mytestuser',
    password: 'My6$Password',
    database: 'cgcorrelation',
})

arr = []
nArr = []

crimes = []
connection.query('SELECT lat,lng, weapon, motivation from newcrimes', function(err, results, fields) {
    if (err) throw err
    crimes = results

    crimes.forEach((element) => {
        element['lat'] = element['lat'].replace('\r', '')
    })
    //console.log('Results are: ', results)
    //console.log(nArr.length)

})

app.get('/api/graffiti/:month&:year', (req,res) => {
    

    month = parseInt(req.params.month)
    year = parseInt(req.params.year)
    
    console.log(month)
    console.log(year)

    dateString = year + "-"+month+"-01";

    if ( month < 10) {
        dateString = year + "-0"+month+"-01";
    }

    newMonth = month + 1
    console.log(newMonth)
    limitDateString = year+"-"+newMonth+"-01"
    if (newMonth < 10){
        limitDateString = year+"-0"+newMonth+"-01"
    }


    console.log(dateString)
    console.log(limitDateString)


    connection.query('SELECT lat,lng,date_requested FROM requests WHERE date_requested between ? and ?',[dateString, limitDateString], function(err, results, fields) {
        newArr = []
        if (err) throw err
        newArr = results
        //console.log('Results are: ', results)
        console.log(newArr.length)

        res.send({express: newArr})
    })
    
})

app.get('/api/crimes', (req,res) => {
    res.send({express: crimes})
})

// connection.end()
