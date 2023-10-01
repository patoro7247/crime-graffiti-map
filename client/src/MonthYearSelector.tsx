import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';

export default function MonthYearSelector({setGraffitiArr}) {
    const [value, onChange] = useState<Value>(new Date());

    let arr = []
    
    useEffect(() => {
        let month = value.getMonth() + 1
        let year = value.getYear() + 1900
        console.log(month, year)

        fetch(`api/graffiti/${month}&${year}`)
            .then((res) => res.json())
            .then((data) => {
                arr = data.express
                
                setGraffitiArr(arr.splice(0,2000))
            })
    }, [value])

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        console.log('Before: '+value)
        console.log(e)
        onChange(e)
        console.log('After: '+value)
    }
        
    return (
        <div>
            <DatePicker onChange={changeHandler} value={value} 
            maxDetail="year" 
            minDetail="month"
            minDate = {new Date(2019, 0)}
            maxDate = {new Date()}
            />
        </div>
    );
}