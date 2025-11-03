import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';

const MapBox = ({showDetail}) => {

 
  const mapContainerRef = useRef();
  const mapRef = useRef();
   const markerRef = useRef(null);
 
  

    useEffect(() => {
      const coords =
    Array.isArray(showDetail?.geometry?.coordinates) &&
    showDetail.geometry.coordinates.length === 2
      ? showDetail.geometry.coordinates
      : [77.209, 28.6139];

    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FuamVldjExMSIsImEiOiJjbWhkZmdnaG4wMmJ4MmxzZGcxMGRwOHF4In0.hr9_OdeKO6mdzt75SFnn3w";

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: coords, // default Delhi
        zoom: 7,
      });
    }

    // Remove previous marker if exists
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Add new marker
    markerRef.current = new mapboxgl.Marker({ color: "purple" })
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup({offset: 25, className: 'my-class'}).setHTML(`<h3>${showDetail?.description}</h3><p>Best for Visit</p>`))
      
      .addTo(mapRef.current);

    // Center map on new coordinates
    mapRef.current.setCenter(coords);

  }, [showDetail?.geometry?.coordinates]); 

  

  return (
    <div
      style={{ width:'100%',height:'400px',borderRadius:'10px', overflow: 'hidden',}}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapBox;