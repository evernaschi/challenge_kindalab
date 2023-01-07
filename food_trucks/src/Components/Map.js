import React, {useEffect, useState} from 'react'
import { Circle, GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Card, CardContent, Container, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { config } from './Constants';

const URL = config.url;

const containerStyle = {
  width: 'auto',
  minHeight: '90vh',
  maxHeight: '100vh',
};

const center = {
  // San Francisco
  lat: 37.773972,
  lng: -122.431297
};

function MapComponent() {
    const [trucks, setTrucks] = useState([])
    const [activeMarker, setActiveMarker] = useState(null);
    const [actualLat, setActualLat] = useState("")
    const [actualLng, setActualLng] = useState("")
    const [radiusError, setRadiusError] = useState(false)
    const [actualRadius, setActualRadius] = useState(500)
    const [showAllTrucks, setShowAllTrucks] = useState(true)

    const handleActiveMarker = (marker) => {
      // Toggle info on selected marker
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };
  
    const handleTrucks = async () => {
      // Call local API for trucks information
      if (!((actualLat && actualLng && actualRadius) || showAllTrucks)){
        // If actual position is not set and showAllTrucks is false, show no trucks
        return
      }
      const paramsObj = showAllTrucks ? null : {lat: actualLat, lng: actualLng, rad: actualRadius.toString()};
      const searchParams = new URLSearchParams(paramsObj);
      let response = await fetch(URL + searchParams, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
      if (response.ok){
        let newTrucks = await response.json();
        setTrucks(newTrucks)
      }
    };

    useEffect(()=>{
      // Search for trucks on position or radius change
      handleTrucks()
    }, [actualLat, actualLng, actualRadius, showAllTrucks])

    const handleMapClick = (event) => {
      if (!event.hasOwnProperty('latLng')){return}
      setActualLat(event.latLng.lat().toString())
      setActualLng(event.latLng.lng().toString())
      setShowAllTrucks(false)
    }

    const handleRadius = (event) => {
      // Update Radius value or show error message
      const value = event.target.value
      if ( value > 100 ){
        setActualRadius(value)
        setRadiusError(false)
      } else {
        setRadiusError(true)
      }
    }

    return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="space-between"
      minHeight="100vh"
    >
    <Box minWidth="80vw" minHeight="100vh">
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        {(actualLat && actualLng) 
        ? <Marker
            key={"actualpos"}
            position = {{
              lat: Number(actualLat),
              lng: Number(actualLng),
            }}
          /> 
        : null}
        { (actualLat && actualLng && actualRadius)
          ? <Circle
            center={{
              lat:Number(actualLat),
              lng:Number(actualLng)
            }}
            radius={Number(actualRadius)}
          />
          : null
        }
        {trucks 
        ? trucks.map((truck)=>{
          const id = truck.objectid;
          return (
            <Marker
              key={id}
              position = {{
                lat: Number(truck.latitude),
                lng: Number(truck.longitude),
              }}
              onClick={() => handleActiveMarker(id)}
              icon={'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
              >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <Box maxWidth="200px" maxHeight="100px">
                    <Typography variant="h6" color="black" noWrap>
                      {truck.facilitytype}
                    </Typography>
                    <Typography variant="body2" color="black">
                      {truck.fooditems}
                    </Typography>
                  </Box>
                </InfoWindow>
              ) : null}
            </Marker>
          )
        })
        : null}
        <></>
      </GoogleMap>
    </LoadScript>
    </Box>
        <Container>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          spacing={2}
        >
          <TextField
            id="latitude"
            label="Latitude"
            InputProps={{
              readOnly: true,
            }}
            focused
            value={actualLat}
            sx={{marginTop:"20px"}}
          />
          <TextField
            id="longitude"
            type="number"
            label="Longitude"
            InputProps={{
              readOnly: true,
            }}
            focused
            value={actualLng}
            sx={{marginTop:"20px"}}
          />
          <TextField
            id="outlined-radius"
            type="number"
            label="Radius"
            defaultValue="1500"
            helperText={radiusError? "Must be greater than 100" : "In meters"}
            sx={{marginTop:"20px"}}
            error={radiusError}
            onBlur={handleRadius}
          />
        <Button
          variant="contained"
          onClick={()=>{
            setTrucks([])
            setShowAllTrucks(false)
            setActualLat("")
            setActualLng("")
          }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={()=>setShowAllTrucks(true)}
        >
          Show All
        </Button>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">
              Instructions
            </Typography>
            <Typography variant="body2">
              Click on the map to see the nearby food trucks.
              <br />
              Click on a Food Truck to see details (Type: truck or push cart and a description of food items sold).
              <br />
              Optionally, you can set a custom radius.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
      </Container>
    </Stack>
  )
}

export default React.memo(MapComponent)
