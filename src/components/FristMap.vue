<template>
  <div class="vm">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default {
  name: "HomeMap",
  data() {
    return {
      map: null,
      urls: [
        "https://{a-c}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-jan/{z}/{x}/{y}.png",
        "https://{a-c}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jan/{z}/{x}/{y}.png",
        "https://{a-c}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-jul/{z}/{x}/{y}.png",
        "https://{a-c}.tiles.mapbox.com/v3/mapbox.blue-marble-topo-bathy-jul/{z}/{x}/{y}.png"
      ]
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 地图实例
      new Map({
        target: "map", // 对应页面里 id 为 map 的元素
        // 在地图容器中加载的图层
        layers: [
          // 加载瓦片图层数据
          new TileLayer({
            source: new OSM() // 图层数据源
          })
        ],
        //地图视图设置
        view: new View({
          // 地图视图
          // projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
          // center: [0, 0], //坐标
          center: [118.120581, 24.476726], //坐标 厦门
          // minZoom: 10, // 地图缩放最小级别
          zoom: 4 //地图缩放级别
        })
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
