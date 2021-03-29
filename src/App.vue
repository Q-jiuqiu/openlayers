<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" />-->

    <!-- <homemap></homemap> -->
    <!-- <accessible-map></accessible-map> -->
    <!-- <advanced-view-positioning></advanced-view-positioning> -->
    <!-- <drawinmap></drawinmap> -->
    <index></index>
  </div>
</template>

<script>
import homemap from "./components/FristMap";
import accessibleMap from "./components/AccessibleMap";
import advancedMapboxVectorTiles from "./components/AdvancedMapboxVectorTiles";
import advancedViewPositioning from "./components/AdvancedViewPositioning";
import drawinmap from "./components/drawInMap";
import index from "./view/indexPage";
export default {
  name: "App",
  components: {
    drawinmap,
    homemap,
    accessibleMap,
    advancedMapboxVectorTiles,
    advancedViewPositioning,
    index
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
