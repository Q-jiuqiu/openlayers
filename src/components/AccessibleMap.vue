<template>
  <div class="MapView">
    <button class="big" @click="resizing('big')">放大</button>
    <button class="small" @click="resizing('small')">缩小</button>
    <!-- <button class="small" @click="myGetFeatures">获取要素集</button> -->
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map"; // 用于创建地图
import OSM from "ol/source/OSM"; // 获取OSM数据
import TileLayer from "ol/layer/Tile"; // 图层用于显示OSM数据
import View from "ol/View"; //View对象代表地图的简单2D视图。这是要更改地图中心，分辨率和旋转的对象
import { fromLonLat } from "ol/proj";
export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          // 图层
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          // projection: "EPSG:3857",
          projection: "EPSG:4326",
          //投影确定中心的坐标系，其单位确定分辨率的单位（每像素的投影单位）。默认投影为球形墨卡托（EPSG：3857）。
          // center: [0, 0],
          // center: [118.120581, 24.476726], //经纬度坐标 厦门
          center: [104.630825, 28.760189], //经纬度坐标 宜宾
          zoom: 10
        })
      });
      console.log(fromLonLat([104.630825, 28.760189])); //将坐标从经度/纬度转换为其他投影
    },
    // 调整大小
    resizing(operation) {
      let view = this.map.getView();
      let zoom = view.getZoom();
      if (operation === "big") {
        view.setZoom(zoom + 1);
      } else if (operation === "small") {
        view.setZoom(zoom - 1);
      }
    }
    // myGetFeatures() {
    //   let source = this.map.get;
    // }
  }
};
</script>

<style lang="scss" scoped>
.MapView {
  .map {
    width: 100%;
    height: 80vh;
    border: 1px solid black;
  }
}
</style>
