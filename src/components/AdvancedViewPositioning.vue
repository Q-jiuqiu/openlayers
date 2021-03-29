<template>
  <div class="MapView">
    <h6>
      此示例演示了如何调整地图视图，以便将几何图形或坐标定位在特定的像素位置。
    </h6>
    <button @click="zoomtoswitzerland">放大到瑞士</button> (最合适).<br />
    <button @click="zoomtolausanne">放大到洛桑</button> (以最小分辨率),<br />
    <button @click="centerlausanne">洛桑中心</button>
    <div class="mapcontainer">
      <div id="map" class="map"></div>
      <!-- 地图在视口内部应用了上，右，下和左填充 -->
      <div class="padding-top"></div>
      <div class="padding-left"></div>
      <div class="padding-right"></div>
      <div class="padding-bottom"></div>
      <!-- 地图在视口内部应用了上，右，下和左填充 -->
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
              id: "CHE",
              properties: { name: "Switzerland" },
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [9.594226, 47.525058],
                    [9.632932, 47.347601],
                    [9.47997, 47.10281],
                    [9.932448, 46.920728],
                    [10.442701, 46.893546],
                    [10.363378, 46.483571],
                    [9.922837, 46.314899],
                    [9.182882, 46.440215],
                    [8.966306, 46.036932],
                    [8.489952, 46.005151],
                    [8.31663, 46.163642],
                    [7.755992, 45.82449],
                    [7.273851, 45.776948],
                    [6.843593, 45.991147],
                    [6.5001, 46.429673],
                    [6.022609, 46.27299],
                    [6.037389, 46.725779],
                    [6.768714, 47.287708],
                    [6.736571, 47.541801],
                    [7.192202, 47.449766],
                    [7.466759, 47.620582],
                    [8.317301, 47.61358],
                    [8.522612, 47.830828],
                    [9.594226, 47.525058]
                  ]
                ]
              }
            },
            {
              type: "Feature",
              id: "LSNE",
              properties: { name: "Lausanne" },
              geometry: { type: "Point", coordinates: [6.6339863, 46.5193823] }
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
      // padding:设置到地图容器边距
      this.view.fit(polygon, { padding: [170, 50, 30, 150] });
    },
    zoomtolausanne() {
      let feature = this.source.getFeatures()[1];
      let point = feature.getGeometry();
      console.log("zoomtolausanne-size", this.map.getSize());
      // minResolution：图层的最小分辨率，小于这个分辨率的瓦片不会被加载
      this.view.fit(point, { padding: [170, 50, 30, 150], minResolution: 50 });
    },
    centerlausanne() {
      let featurePoint = this.source.getFeatures()[1];
      let point = featurePoint.getGeometry();
      let featurePolygon = this.source.getFeatures()[0];
      let polygon = featurePolygon.getGeometry();
      console.log(
        "centerlausanne-size",
        this.map.getSize(),
        point.getCoordinates()
      );
      let size = this.map.getSize();
      this.view.fit(polygon, { padding: [170, 50, 30, 150] });
      // centerOn()用于将坐标（Lausanne）定位在特定像素位置（黑框的中心）。
      // point.getCoordinates()返回点的坐标
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
