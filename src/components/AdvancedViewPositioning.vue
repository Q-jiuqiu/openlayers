<template>
  <div class="MapView">
    <button @click="zoomtoswitzerland">放大到宜宾</button> (最合适).<br />
    <button @click="zoomtolausanne">放大到洛桑</button> (以最小分辨率),<br />
    <button @click="centerlausanne">珙县中心</button>
    <div class="mapcontainer">
      <div id="map" class="map"></div>
      <div class="padding-top"></div>
      <div class="padding-left"></div>
      <div class="padding-right"></div>
      <div class="padding-bottom"></div>
      <div class="center"></div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
// import areaGeo from "./data/geojson/switzerland.js";
export default {
  data() {
    return {
      map: null,
      source: null,
      vectorLayer: null,
      view: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // /** @type {VectorSource<import("../src/ol/geom/SimpleGeometry.js").default>} */
      this.source = new VectorSource({
        // url: "data/geojson/switzerland.geojson",
        // format: new GeoJSON()
        features: new GeoJSON().readFeatures({
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [104.62692260742188, 28.80978350470993],
                    [104.4140625, 28.58693349906797],
                    [104.5513916015625, 28.33702142319534],
                    [104.57061767578125, 28.283823966106382],
                    [104.86312866210938, 28.37327715450343],
                    [105.05813598632812, 28.494040075666316],
                    [105.01693725585938, 28.63997865130685],
                    [104.7491455078125, 28.548338387631425],
                    [104.82879638671875, 28.776085346816238],
                    [104.66400146484375, 28.680949728554964],
                    [104.62692260742188, 28.80978350470993]
                  ]
                ]
              }
            },
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [104.69558715820312, 28.455410938077357]
              }
            }
          ]
        })
      });
      let style = new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.6)"
        }),
        stroke: new Stroke({
          color: "#319FD3",
          width: 1
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.6)"
          }),
          stroke: new Stroke({
            color: "#319FD3",
            width: 1
          })
        })
      });
      this.vectorLayer = new VectorLayer({
        source: this.source,
        style: style
      });
      this.view = new View({
        // projection: "EPSG:3857",
        projection: "EPSG:4326",
        center: [0, 0],
        zoom: 1
      });
      this.map = new Map({
        layers: [
          // 源
          new TileLayer({
            source: new OSM()
          }),
          this.vectorLayer
        ],
        target: "map",
        view: this.view
      });
    },
    zoomtoswitzerland() {
      let feature = this.source.getFeatures()[0];
      let polygon = feature.getGeometry();
      console.log("zoomtoswitzerland-size", this.map.getSize());
      // fit()根据给定的地图大小和边界，适合给定的几何形状或范围。
      this.view.fit(polygon, {
        padding: [170, 50, 30, 150],
        backgroundColor: "red"
      });
    },
    zoomtolausanne() {
      let feature = this.source.getFeatures()[1];
      let point = feature.getGeometry();
      console.log("zoomtolausanne-size", this.map.getSize());
      this.view.fit(point, { padding: [170, 50, 30, 150], minResolution: 50 });
    },
    centerlausanne() {
      let feature = this.source.getFeatures()[1];
      let point = feature.getGeometry();
      console.log("centerlausanne-size", this.map.getSize());
      let size = this.map.getSize();
      this.view.centerOn(point.getCoordinates(), size, [570, 500]);
    }
  }
};
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 400px;
}
.mapcontainer {
  position: relative;
  margin-bottom: 20px;
}
.map {
  width: 1000px;
  height: 600px;
}
.map .ol-zoom {
  top: 178px;
  left: 158px;
}
.map .ol-rotate {
  top: 178px;
  right: 58px;
}
.map .ol-attribution,
.map .ol-attribution.ol-uncollapsible {
  bottom: 30px;
  right: 50px;
}
.padding-top {
  position: absolute;
  top: 0;
  left: 0px;
  width: 1000px;
  height: 170px;
  background: rgba(255, 255, 255, 0.5);
}
.padding-left {
  position: absolute;
  top: 170px;
  left: 0;
  width: 150px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}
.padding-right {
  position: absolute;
  top: 170px;
  left: 950px;
  width: 50px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}
.padding-bottom {
  position: absolute;
  top: 570px;
  left: 0px;
  width: 1000px;
  height: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.center {
  position: absolute;
  border: solid 1px black;
  top: 490px;
  left: 560px;
  width: 20px;
  height: 20px;
}
</style>
