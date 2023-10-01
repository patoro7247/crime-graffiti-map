import React, { useRef, useState, useEffect } from 'react';
import Movies from './Movies';
import Top from './Top';



import MonthYearSelector from './MonthYearSelector.tsx'
import 'react-date-picker/dist/DatePicker.css';


import './index.css';
import { motion } from "framer-motion"

import mapboxgl, { Marker } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax




function App() {
  
  

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-117.161);
  const [lat, setLat] = useState(32.715);
  const [zoom, setZoom] = useState(11);


  const [graffitiArr, setGraffitiArr] = useState([]);

  const [markerArr, setMarkerArr] = useState([]);



  useEffect(() => {
    if (map.current){
      console.log("App.js, GraffitArr Length is: "+graffitiArr.length)

      //clear array
      clearMarkers();
      
      let mArr = []

      graffitiArr.forEach((element) => {
        let lat = element.lat
        let lng = element.lng
  
        let marker = new Marker({
          scale: 0.5
        })
        .setLngLat([lng,lat])
        .addTo(map.current)

        mArr.push(marker)
      });

      setMarkerArr(mArr)

      //setMarkerArr(markerArr => ({ ...markerArr, mArr}))
      //console.log(markerArr)



      return;
    } 

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    
    let crimes = []
    fetch(`api/crimes`)
            .then((res) => res.json())
            .then((data) => {
                crimes = data.express
                console.log(crimes)

                crimes.forEach((element) => {
                  console.log('test')
                  let lat = element.lat
                  let lng = element.lng
                  let weapon = element.weapon
                  let moti = element.motivation
                  let ptext = 'Weapon: '+weapon+',  Motivation: '+moti
                  const popup = new mapboxgl.Popup({ offset: 25 }).setText(ptext);
          
                  let marker = new Marker({
                    scale: 0.5,
                    color: "red"
                  })
                  .setLngLat([lng,lat])
                  .setPopup(popup)
                  .addTo(map.current)        
              });
            })
      
    


  }, [graffitiArr]);


  function loadMarkers() {
    //clearMarkers().then()
    //clearMarkers()
    //map.removeLayer(marker)
    //make markers for each array
    graffitiArr.forEach((element) => {
        let lat = element.lat
        let lng = element.lng

        let marker = new Marker({
          scale: 0.3
        })
        .setLngLat([lng,lat])
        .addTo(map.current)        
    });

  
  }

  function clearMarkers(){
    console.log('Removing markers...', markerArr.length)
    markerArr.forEach((marker) => {
        marker.remove()
    });
    setMarkerArr([])
  }

  const homeRef = useRef(null);
  const sourcesRef = useRef(null);

  const handleScrollHome = () => {
    homeRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  const handleScrollSources = () => {
    sourcesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <div className="App">
      <div className="NavbarContainer" ref={homeRef}>
        <div className="Links">
        <a href="#" onClick={handleScrollHome}>home</a>
        <h1>Graffiti and Crime Correlation</h1>
        <a href="#" onClick={handleScrollSources}>sources</a>
        </div>
        
      </div>
  
      
      <hr />
      
      <motion.div className="Hero"
        variants={{
          hidden: { opacity: 0, x: 200},
          visible: { opacity: 1, x: 50},
        }}
        initial="hidden"
        animate="visible"
        transition={{duration: 3.5, delay: .5}} 
      >
        <p> San Diego keeps a public record of their graffiti removal requests and hate crimes</p>
        <p> This map aims to show the occurences of graffiti removal requests in comparison with<br></br>hate crimes in the San Diego area in order to visually show their correlation</p>
        <p> Hate crime occurrences are be in red. Graffiti removal requests will be in blue. </p>
        <p> Select a month to show the removal requests in comparison to hate crimes</p>
      </motion.div>

      <div className ="selector-container" >
        <MonthYearSelector setGraffitiArr={setGraffitiArr}/>
      </div>

      <div>
        <div ref={mapContainer} className="map-container" />
      </div>

      <div className="sources-container" ref={sourcesRef}>
        <h1>Sources</h1>
        <p>Graffiti Removal Requests Dataset: https://data.sandiego.gov/datasets/gid-graffiti/</p>
        <p>Hate Crimes Dataset: https://data.sandiego.gov/datasets/police-hate-crimes/</p>
      </div>

    </div>
  );
}

export default App;
