import React, { useState, useEffect, useRef } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
import mapStyles from "./mapStyles";
import { mapApiKey } from "../../../../../../config.json";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";
import { GetDatabyPalceID, GetDatabyAddress } from "../../../shared/map";

function Map(props) {
  const [selectedPark, setSelectedPark] = useState(null);

  let [center, setCenter] = useState({
    lat: props.data.lat,
    lng: props.data.lng,
    radius: props.data.radius
  });

  let circleRef = useRef();
  // let markerRef = useRef();
  let googlemap = useRef();
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //       setCenter({
  //         lat: props.data.lat,
  //         lng: props.data.lng,
  //         radius: props.data.radius,
  //       });
  //   }, 100);
  // });

  function changeCenter() {
    setCenter({
      lat: props.data.lat,
      lng: props.data.lng,
      radius: props.data.radius
    });
  }

  return (
    <GoogleMap
      defaultZoom={15}
      center={{
        lat: parseFloat(center.lat),
        lng: parseFloat(center.lng)
      }}
      defaultOptions={{ styles: mapStyles }}
      onClick={e => console.log(e)}
      ref={googlemap}
    >
      <Circle
        editable
        // draggable
        center={{
          lat: parseFloat(center.lat),
          lng: parseFloat(center.lng)
        }}
        radius={center.radius}
        options={{
          strokeColor: "#6869FA",
          fillColor: "#B2B2FF"
        }}
        // onCenterChanged={() => {
        //   // center.lat = circleRef.getCenter().lat();
        //   // center.lng = circleRef.getCenter().lng();
        //   // setCenter(center);

        //   props.changeIt(circleRef.current.getCenter().lat(),'lat');
        //   props.changeIt(circleRef.current.getCenter().lng(),'lng');
        //   props.changeIt(circleRef.current.getRadius(),'radius');
        //   // markerRef.current.position = {
        //   //   lat: circleRef.current.getCenter().lat(),
        //   //   lng: circleRef.current.getCenter().lng()
        //   // };
        // }}
        onRadiusChanged={() => {
          // center.lat = circleRef.getCenter().lat();
          // center.lng = circleRef.getCenter().lng();
          // setCenter(center);
          props.changeIt(circleRef.current.getCenter().lat(), "lat");
          props.changeIt(circleRef.current.getCenter().lng(), "lng");
          props.changeIt(circleRef.current.getRadius(), "radius");

          // markerRef.current.position = {
          //   lat: circleRef.current.getCenter().lat(),
          //   lng: circleRef.current.getCenter().lng()
          // };
        }}
        ref={circleRef}
      ></Circle>
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function GoogleMapForCrm(props) {
  const GmapRef = useRef();

  let handleChangeCenter = () => {
    console.log(GmapRef.current);
    };
  let [mapData, setMapData] = useState({
    address: "",
    name: "",
    lat: 52.3093,
    lng: -1.93944,
    radius: 100
  });

  function changemap(data, name) {
    setMapData({
      ...mapData,
      [name]: data
    });
    console.log(mapData);
    props.updateadd(mapData);
  }
  return (
    <div className="container" style={{ width: "100%", height: "100%" }}>
      <GooglePlacesAutocomplete
        autocompletionRequest={{
          componentRestrictions: {
            country: ["uk", "pk", "us"]
          }
        }}
        debounce={1000}
        inputStyle={{
          height: "calc(1em + 1rem + 1px)",
          width: "100%",
          padding: "0.375rem 0.75rem",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "1.5",
          color: "#495057",
          backgroundColor: "#fff",
          backgroundClip: "padding-box",
          border: "1px solid #ced4da",
          borderRadius: "0rem"
        }}
        onSelect={async e => {
          await GetDatabyAddress(e.description).then(res => {
            mapData.address = e.description;
            mapData.name = e.structured_formatting.main_text;
            mapData.country = e.terms[e.terms.length - 1].value;
            mapData.city = e.terms[e.terms.length - 2].value;
            mapData.lat = res.data[0].lat;
            mapData.lng = res.data[0].lon;
            // console.log(mapData);
          });
          props.updateadd(mapData);
          handleChangeCenter();
        }}
      />
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${mapApiKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        data={mapData}
        changeIt={changemap}
        ref={GmapRef}
      />
    </div>
  );
}
