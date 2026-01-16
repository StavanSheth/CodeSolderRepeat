import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AhmedabadWardsMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [wardRouteMode, setWardRouteMode] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    if (mapInstance.current) return;

    const API_KEY = import.meta.env.VITE_TOMTOM_KEY;

    let selectedStartPoint = null;
    let selectedEndPoint = null;
    let routeLayer = null;
    let vehicleMarker = null;
    let animationInterval = null;

    let currentWardRouteMode = false;
    let selectedWard = null;
    let wardLayer = null;
    let wardPointsData = {};
    let wardOffices = {};
    let rtsLocations = [];
    let allMarkers = [];

    const map = L.map(mapRef.current).setView([23.0225, 72.5714], 11);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    function clearRoute() {
      if (routeLayer) {
        map.removeLayer(routeLayer);
        routeLayer = null;
      }
      if (vehicleMarker) {
        map.removeLayer(vehicleMarker);
        vehicleMarker = null;
      }
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
      selectedStartPoint = null;
      selectedEndPoint = null;
    }

    function fetchRoute(start, end) {
      const url = `https://api.tomtom.com/routing/1/calculateRoute/${start[0]},${start[1]}:${end[0]},${end[1]}/json?key=${API_KEY}&traffic=true`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].legs[0].points;
            const routePath = route.map(point => [point.latitude, point.longitude]);

            routeLayer = L.polyline(routePath, {
              color: 'blue',
              weight: 5,
              opacity: 0.7
            }).addTo(map);

            const vehicleIcon = L.icon({
              iconUrl: 'https://img.icons8.com/fluency/48/truck.png',
              iconSize: [40, 40],
            });

            vehicleMarker = L.marker(routePath[0], {
              icon: vehicleIcon
            }).addTo(map);

            map.fitBounds(routePath);

            let currentPoint = 0;
            animationInterval = setInterval(() => {
              if (currentPoint < routePath.length - 1) {
                currentPoint++;
                vehicleMarker.setLatLng(routePath[currentPoint]);
              } else {
                clearInterval(animationInterval);
                animationInterval = null;
              }
            }, 100);
          }
        })
        .catch(err => {
          console.error('Error fetching route:', err);
          clearRoute();
        });
    }

    function onPointClick(point, ward) {
      if (currentWardRouteMode) return;

      if (!selectedStartPoint) {
        selectedStartPoint = point;
        alert(`Start point selected in ward: ${ward.properties.Name}\nClick another point to set destination.`);
      } else if (!selectedEndPoint) {
        selectedEndPoint = point;
        alert(`Destination selected in ward: ${ward.properties.Name}\nFetching route...`);
        fetchRoute(selectedStartPoint, selectedEndPoint);
      } else {
        clearRoute();
        selectedStartPoint = point;
        alert(`Route cleared. Start point selected in ward: ${ward.properties.Name}\nClick another point to set destination.`);
      }
    }

    function createWardRoute(wardName) {
      const wardData = wardPointsData[wardName];
      if (!wardData || wardData.length < 1) {
        alert('Not enough points in this ward for a route.');
        return;
      }

      const wardOffice = wardOffices[wardName];
      if (!wardOffice) {
        alert('Ward office not found for ' + wardName);
        return;
      }

      const TRUCK_CAPACITY = 1000;
      let currentLoad = 0;
      const routePoints = [wardOffice];
      const visitedBins = [];

      const sortedBins = [...wardData].sort((a, b) => b.fillLevel - a.fillLevel);

      for (const bin of sortedBins) {
        if (currentLoad + bin.fillLevel <= TRUCK_CAPACITY) {
          routePoints.push(bin.location);
          visitedBins.push(bin);
          currentLoad += bin.fillLevel;
        }
        if (currentLoad >= TRUCK_CAPACITY * 0.95) break;
      }

      const lastPoint = routePoints[routePoints.length - 1];
      let nearestRTS = rtsLocations[0];
      let minDistance = Infinity;

      for (const rts of rtsLocations) {
        const dist = Math.sqrt(
          Math.pow(rts.location[0] - lastPoint[0], 2) +
          Math.pow(rts.location[1] - lastPoint[1], 2)
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearestRTS = rts;
        }
      }

      routePoints.push(nearestRTS.location);

      setRouteInfo({
        wardName,
        bins: visitedBins.length,
        load: currentLoad,
        rts: nearestRTS.name
      });

      const waypoints = routePoints.map(p => `${p[0]},${p[1]}`).join(':');
      const url = `https://api.tomtom.com/routing/1/calculateRoute/${waypoints}/json?key=${API_KEY}&traffic=true`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].legs.flatMap(leg => leg.points);
            const routePath = route.map(point => [point.latitude, point.longitude]);

            routeLayer = L.polyline(routePath, {
              color: 'blue',
              weight: 5,
              opacity: 0.7
            }).addTo(map);

            const vehicleIcon = L.icon({
              iconUrl: 'https://img.icons8.com/fluency/48/truck.png',
              iconSize: [40, 40],
            });

            vehicleMarker = L.marker(routePath[0], {
              icon: vehicleIcon
            }).addTo(map);

            map.fitBounds(routePath);

            let currentPoint = 0;
            animationInterval = setInterval(() => {
              if (currentPoint < routePath.length - 1) {
                currentPoint++;
                vehicleMarker.setLatLng(routePath[currentPoint]);
              } else {
                clearInterval(animationInterval);
                animationInterval = null;
              }
            }, 50);
          }
        })
        .catch(err => {
          console.error('Error fetching route:', err);
        });
    }

    function onWardClick(ward) {
      if (!currentWardRouteMode) return;

      selectedWard = ward;
      const wardName = ward.properties.Name;

      wardLayer.eachLayer(layer => {
        if (layer.feature.properties.Name === wardName) {
          layer.setStyle({
            color: '#7B1FA2',
            weight: 4,
            fillColor: '#E1BEE7',
            fillOpacity: 0.3,
            dashArray: ''
          });
        } else {
          wardLayer.resetStyle(layer);
        }
      });

      clearRoute();
      createWardRoute(wardName);
    }

    // Load ward offices
    fetch('/Ward_office.geojson')
      .then(res => res.json())
      .then(data => {
        const wardToOfficeMapping = {
          '36 DANILIMDA': 'New Muster Office Danilimda',
          '39 GOMTIPUR': 'New Muster Office Danilimda',
          '20 DARIYAPUR': 'New Muster Office Danilimda',
          '12 NARODA': 'Naroda Road , SubZonal Office',
          '47 VATVA': 'Naroda Road , SubZonal Office',
          '14 ASARWA': 'Naroda Road , SubZonal Office',
          '24 NIKOL': 'Nikol New Office',
          '40 ODHAV': 'Nikol New Office',
          '48 RAMOL HATHIJAN': 'Ramol-Subzone Muster Office',
          '16 SHAHPUR': 'Shahibaug Ward Office',
          '16 SHAHIBAG': 'Shahibaug Ward Office',
          '46 LAMBHA': 'Shahibaug Ward Office',
          '23 THAKKARBAPANAGAR': 'Thakkarbapa Nagar Ward Office',
          '37 MANINAGAR': 'Thakkarbapa Nagar Ward Office',
          '42 INDRAPURI': 'Thakkarbapa Nagar Ward Office',
          '28 KHADIA': 'Khadia Sub Zonal Office',
          '18 NAVRANGPURA': 'Navrangpura',
          '30 PALDI': 'Navrangpura',
          '10 S.P.STADIUM': 'Navrangpura',
          '13 SAIJPUR BOGHA': 'Saijpur',
          '31 VASNA': 'Vasna',
          '19 JODHPUR': 'Vasna',
          '34 MAKTAMPURA': 'Vasna',
          '43 BHAIPURA HATKESHWAR': 'Bhaipura ',
          '08 THALTEJ': 'Thaltej',
          '32 VEJALPUR': 'Thaltej',
          '33 SARKHEJ': 'Thaltej',
          '44 KHOKHRA': 'Khohra Sub Zone Office',
          '35 BAHERAMPURA': 'Khohra Sub Zone Office',
          '07 GHATLODIA': 'Ghtalodiya',
          '05 RANIP': 'Ranip',
          '03 CHANDKHEDA': 'Chandkheda',
          '01 GOTA': 'Gota Ward Office',
          '02 CHANDLODIA': 'CHANDLODIA',
          '19 BODAKDEV': 'Bodakdev Ward Office',
          '45 ISANPUR': 'Isanpur',
          '06 NEW WADAJ': 'New Wadaj',
          '04 SABARMATI': 'Sabarmati',
          '11 SARDARNAGAR': 'Sardarnagar',
          '39 AMRAIWADI': 'Maninagar Master office',
          '09 NARANPURA': 'NARANPURA',
          '27 SARASPUR-RAKHIYAL': 'Saraspur Ward Office',
          '41 VASTRAL': 'Vastral Ward Office',
          '22 INDIA COLONY': 'Bapunagar Ward Office',
          '26 BAPUNAGAR': 'Bapunagar Ward Office',
          '25 VIRATNAGAR': 'Viratnagar Ward Office'
        };

        const tempOffices = {};
        data.features.forEach(feature => {
          const officeName = feature.properties.Name;
          const coords = feature.geometry.coordinates;
          if (coords && coords.length >= 2) {
            tempOffices[officeName] = [coords[1], coords[0]];
          }
        });

        for (const [wardName, officeName] of Object.entries(wardToOfficeMapping)) {
          if (tempOffices[officeName]) {
            wardOffices[wardName] = tempOffices[officeName];
          }
        }

        console.log('Loaded ward offices:', Object.keys(wardOffices).length);
      })
      .catch(err => console.error('Error loading ward offices:', err));

    // Load RTS locations
    fetch('/rts.geojson')
      .then(res => res.json())
      .then(data => {
        data.features.forEach(feature => {
          const name = feature.properties.name;
          const coords = feature.geometry.coordinates;
          rtsLocations.push({
            name: name,
            location: [coords[1], coords[0]]
          });

          const rtsIcon = L.icon({
            iconUrl: 'https://img.icons8.com/fluency/48/factory.png',
            iconSize: [50, 50],
          });
          L.marker([coords[1], coords[0]], { icon: rtsIcon })
            .addTo(map)
            .bindPopup(`<b>RTS:</b> ${name}`);
        });
        console.log('Loaded RTS locations:', rtsLocations.length);
      })
      .catch(err => console.error('Error loading RTS:', err));

    // Load wards.geojson
    fetch('/Wards.geojson')
      .then(res => res.json())
      .then(wards => {
        const allPoints = [];

        wards.features.forEach(feature => {
          let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;

          feature.geometry.coordinates.forEach(ring => {
            ring.forEach(coord => {
              minLng = Math.min(minLng, coord[0]);
              maxLng = Math.max(maxLng, coord[0]);
              minLat = Math.min(minLat, coord[1]);
              maxLat = Math.max(maxLat, coord[1]);
            });
          });

          const numPoints = 5 + Math.floor(Math.random() * 4);

          for (let i = 0; i < numPoints; i++) {
            const lat = minLat + Math.random() * (maxLat - minLat);
            const lng = minLng + Math.random() * (maxLng - minLng);
            const point = [lat, lng];
            allPoints.push({
              point: point,
              ward: feature
            });

            const wardName = feature.properties.Name;
            if (!wardPointsData[wardName]) {
              wardPointsData[wardName] = [];
            }
          }
        });

        wardLayer = L.geoJSON(wards, {
          style: {
            color: '#2196F3',
            weight: 2.5,
            opacity: 0.8,
            fillColor: '#E3F2FD',
            fillOpacity: 0.1,
            dashArray: '5, 5'
          },
          onEachFeature: (feature, layer) => {
            layer.on('click', () => onWardClick(feature));
            layer.on('mouseover', function (e) {
              this.setStyle({
                weight: 3.5,
                color: '#1976D2',
                fillOpacity: 0.2
              });
            });
            layer.on('mouseout', function (e) {
              if (!currentWardRouteMode || (selectedWard && selectedWard.properties.Name !== feature.properties.Name)) {
                wardLayer.resetStyle(e.target);
              }
            });
            layer.bindPopup(`<b>Ward:</b> ${feature.properties.Name}<br><small>Click in Ward Route Mode to plan route</small>`);
          }
        }).addTo(map);

        const fillCategories = [
          { name: 'dark-red', level: 500, color: '#8B0000' },
          { name: 'red', level: 100, color: '#FF0000' },
          { name: 'yellow', level: 50, color: '#FFFF00' },
          { name: 'green', level: 0, color: '#00FF00' }
        ];

        allPoints.forEach(({ point, ward }) => {
          const category = fillCategories[Math.floor(Math.random() * fillCategories.length)];
          const fillLevel = category.level;
          const color = category.color;

          const markerSize = 30;
          const icon = L.divIcon({
            className: 'gradient-marker',
            html: `<div style="
              width: ${markerSize}px;
              height: ${markerSize}px;
              background: radial-gradient(circle, ${color} 0%, ${color}cc 30%, ${color}66 60%, transparent 100%);
              border-radius: 50%;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
            "></div>`,
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize / 2]
          });

          const marker = L.marker(point, { icon: icon }).addTo(map);

          allMarkers.push({ marker: marker, color: color, point: point });

          const wardName = ward.properties.Name;
          wardPointsData[wardName].push({
            location: point,
            fillLevel: fillLevel,
            color: color,
            category: category.name
          });

          marker.bindPopup(
            `<b>Ward:</b> ${ward.properties.Name}<br>` +
            `<b>Location:</b> ${point[0].toFixed(4)}, ${point[1].toFixed(4)}<br>` +
            `<b>Fill Level:</b> ${fillLevel}%<br>` +
            `<b>Category:</b> ${category.name}<br>` +
            `<small>Select ward in Ward Route Mode</small>`
          );

          marker.on('click', () => onPointClick(point, ward));
        });

        function updateMarkerSizes() {
          const zoom = map.getZoom();
          const scaleFactor = Math.pow(1.2, zoom - 11);
          const markerSize = Math.max(15, 15 * scaleFactor);

          allMarkers.forEach(({ marker, color }) => {
            const icon = L.divIcon({
              className: 'gradient-marker',
              html: `<div style="
                width: ${markerSize}px;
                height: ${markerSize}px;
                background: radial-gradient(circle, ${color} 0%, ${color}cc 30%, ${color}66 60%, transparent 100%);
                border-radius: 50%;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
              "></div>`,
              iconSize: [markerSize, markerSize],
              iconAnchor: [markerSize / 2, markerSize / 2]
            });
            marker.setIcon(icon);
          });
        }

        map.on('zoomend', updateMarkerSizes);

        if (allPoints.length > 0) {
          const bounds = L.latLngBounds(allPoints.map(p => p.point));
          map.fitBounds(bounds);
        }

        console.log(`Generated ${allPoints.length} points across ${wards.features.length} wards`);
      })
      .catch(err => console.error("Error loading wards.geojson:", err));

    // Expose mode toggle function
    window.toggleWardRouteMode = () => {
      currentWardRouteMode = !currentWardRouteMode;
      setWardRouteMode(currentWardRouteMode);

      if (currentWardRouteMode) {
        if (wardLayer) {
          wardLayer.setStyle({
            color: '#2196F3',
            weight: 3,
            opacity: 1,
            fillColor: '#BBDEFB',
            fillOpacity: 0.2,
            dashArray: ''
          });
        }
      } else {
        selectedWard = null;
        clearRoute();
        setRouteInfo(null);

        if (wardLayer) {
          wardLayer.setStyle({
            color: '#2196F3',
            weight: 2.5,
            opacity: 0.8,
            fillColor: '#E3F2FD',
            fillOpacity: 0.1,
            dashArray: '5, 5'
          });
        }
      }
    };

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: "100%", width: "100%" }}>
      {/* Control Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <button
          onClick={() => window.toggleWardRouteMode?.()}
          style={{
            background: wardRouteMode ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
            color: wardRouteMode ? 'white' : '#1a1a1a',
            padding: '14px 24px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {wardRouteMode ? 'Ward Route Mode: ON' : 'Plan Ward Route'}
        </button>
      </div>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'white',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000
      }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>Bin Fill Levels</h4>
        {[
          { color: '#8B0000', label: '500 units (Dark Red)' },
          { color: '#FF0000', label: '100 units (Red)' },
          { color: '#FFFF00', label: '50 units (Yellow)' },
          { color: '#00FF00', label: '0 units (Green)' }
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '12px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: item.color }}></div>
            <span style={{ color: '#666' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Info Card */}
      {routeInfo && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'white',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          maxWidth: '350px',
          zIndex: 1000,
          animation: 'slideUp 0.3s ease-out'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#1a1a1a' }}>
            Route: {routeInfo.wardName}
          </h3>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ color: '#666', fontSize: '13px' }}>Start Point</span>
              <span style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '13px' }}>Ward Office</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ color: '#666', fontSize: '13px' }}>Bins to Collect</span>
              <span style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '13px' }}>{routeInfo.bins} bins</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ color: '#666', fontSize: '13px' }}>Total Load</span>
              <span style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '13px' }}>{routeInfo.load} / 1000 units</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ color: '#666', fontSize: '13px' }}>End Point</span>
              <span style={{ color: '#1a1a1a', fontWeight: 600, fontSize: '13px' }}>{routeInfo.rts}</span>
            </div>
          </div>
        </div>
      )}

      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
