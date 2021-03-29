<template>
  <div class="view">
    <label>
      选择绘画类型
      <select name="" id="type" v-model="type">
        <option value="Point">Point-点</option>
        <option value="LineString">LineString-线</option>
        <option value="Polygon">Polygon-面</option>
        <option value="Circle">Circle-圆</option>
        <option value="None">None</option>
      </select></label
    >
    <div class="MapBox">
      <div id="map" class="map"></div>
      <div id="popup" class="popup"></div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Overlay from "ol/Overlay";
import Draw from "ol/interaction/Draw";
export default {
  data() {
    return {
      map: null,
      overlayers: null,
      draw: null,
      source: null,
      type: "Point"
    };
  },
  mounted() {
    this.initMap();
    this.initDraw();
  },
  watch: {
    type() {
      this.map.removeInteraction(this.draw);
      if (this.type !== "None") {
        this.initDraw();
      }
    }
  },
  methods: {
    initMap() {
      // console.log(this.$el.lastChild);
      // this.source = new VectorSource({ wrapX: false });在地图水平坐标轴上不重复
      this.source = new VectorSource();
      this.overlayers = new Overlay({
        // element: this.$el.lastChild,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          new VectorLayer({
            source: this.source
          })
        ],
        // Overlays: [this.overlayers],
        view: new View({
          projection: "EPSG:4326",
          center: [0, 0],
          zoom: 4
        })
      });
    },
    initDraw() {
      this.draw = new Draw({
        source: this.source,
        type: this.type
      });
      this.map.addInteraction(this.draw);
    }
  }
};
</script>

<style lang="scss">
.MapBox {
  position: relative;
}
.map,
.popop {
  width: 1000px;
  height: 600px;
}
.popop {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
