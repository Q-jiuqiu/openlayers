<template>
  <div class="Box">
    <div id="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export default {
  data() {
    return {
      map: null,
      view: null
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#map {
  width: 600px;
  height: 600px;
}
</style>
