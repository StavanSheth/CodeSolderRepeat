import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import Heatmap from "ol/layer/Heatmap";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

export default function MonumentCrowdMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const heatmapRef = useRef<Heatmap | null>(null);

  const [monument, setMonument] = useState("taj_mahal");
  const [time, setTime] = useState("morning");
  const [season, setSeason] = useState("winter");
  const [specialDay, setSpecialDay] = useState("regular");

  const monumentData: any = {
    taj_mahal: {
      center: [78.0421, 27.1751],
      zoom: 16,
      basePoints: [
        { coords: [78.0421, 27.1751], weight: 1 },
        { coords: [78.0425, 27.1755], weight: 0.7 },
        { coords: [78.0418, 27.1748], weight: 0.6 },
        { coords: [78.0424, 27.1747], weight: 0.5 },
        { coords: [78.0422, 27.1753], weight: 0.8 },
      ],
      peakHours: {
        early_morning: 0.6,
        morning: 1,
        noon: 0.8,
        afternoon: 0.7,
        evening: 0.9,
      },
      seasonalPatterns: {
        summer: { factor: 0.7 },
        monsoon: { factor: 0.4 },
        winter: { factor: 1 },
      },
    },
    red_fort: {
      center: [77.241, 28.6562],
      zoom: 16,
      basePoints: [
        { coords: [77.241, 28.6562], weight: 1 },
        { coords: [77.2415, 28.6565], weight: 0.8 },
        { coords: [77.2408, 28.6559], weight: 0.6 },
      ],
      peakHours: {
        early_morning: 0.3,
        morning: 0.8,
        noon: 1,
        afternoon: 0.9,
        evening: 0.7,
      },
      seasonalPatterns: {
        summer: { factor: 0.6 },
        monsoon: { factor: 0.5 },
        winter: { factor: 0.9 },
      },
    },
  };

  function calculateDensity(baseWeight: number) {
    const info = monumentData[monument];
    let density = baseWeight * info.peakHours[time];
    density *= info.seasonalPatterns[season].factor;

    const multipliers: any = {
      weekend: 1.5,
      diwali: 2,
      christmas: 1.8,
      new_year: 2.5,
      independence: 2.2,
      regular: 1,
    };

    density *= multipliers[specialDay] || 1;
    density *= 0.8 + Math.random() * 0.4;
    return Math.min(density, 10);
  }

  function generateFeatures() {
    const base = monumentData[monument];
    const features: Feature<Point>[] = [];

    base.basePoints.forEach((p: any) => {
      const count = Math.floor(10 * p.weight) + 3;
      for (let i = 0; i < count; i++) {
        const spread = 0.0006;
        const coords = [
          p.coords[0] + (Math.random() - 0.5) * spread,
          p.coords[1] + (Math.random() - 0.5) * spread,
        ];

        features.push(
          new Feature({
            geometry: new Point(fromLonLat(coords)),
            weight: calculateDensity(p.weight),
          })
        );
      }
    });

    return features;
  }

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const heatmapLayer = new Heatmap({
      source: new VectorSource(),
      blur: 15,
      radius: 12,
    });

    heatmapRef.current = heatmapLayer;

    mapRef.current = new Map({
      target: containerRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        heatmapLayer,
      ],
      view: new View({
        center: fromLonLat(monumentData.taj_mahal.center),
        zoom: 16,
      }),
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !heatmapRef.current) return;

    const features = generateFeatures();
    heatmapRef.current.getSource()?.clear();
    heatmapRef.current.getSource()?.addFeatures(features);

    mapRef.current.getView().animate({
      center: fromLonLat(monumentData[monument].center),
      zoom: monumentData[monument].zoom,
      duration: 700,
    });
  }, [monument, time, season, specialDay]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 16, background: "#fff", display: "flex", gap: 12, flexWrap: "wrap" }}>
        <select onChange={(e) => setMonument(e.target.value)} value={monument}>
          <option value="taj_mahal">Taj Mahal</option>
          <option value="red_fort">Red Fort</option>
        </select>

        <select onChange={(e) => setTime(e.target.value)} value={time}>
          <option value="early_morning">Early Morning</option>
          <option value="morning">Morning</option>
          <option value="noon">Noon</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>

        <select onChange={(e) => setSeason(e.target.value)} value={season}>
          <option value="summer">Summer</option>
          <option value="monsoon">Monsoon</option>
          <option value="winter">Winter</option>
        </select>

        <select onChange={(e) => setSpecialDay(e.target.value)} value={specialDay}>
          <option value="regular">Regular Day</option>
          <option value="weekend">Weekend</option>
          <option value="diwali">Diwali</option>
          <option value="christmas">Christmas</option>
          <option value="new_year">New Year</option>
          <option value="independence">Independence Day</option>
        </select>
      </div>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    </div>
  );
}
