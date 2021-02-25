<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" />
    <router-view /> -->
    <!-- <homemap></homemap> -->
    <!-- <accessible-map></accessible-map> -->
    <advanced-view-positioning></advanced-view-positioning>
  </div>
</template>

<script>
import homemap from "./components/FristMap";
import accessibleMap from "./components/AccessibleMap";
import advancedMapboxVectorTiles from "./components/AdvancedMapboxVectorTiles";
import advancedViewPositioning from "./components/AdvancedViewPositioning";
export default {
  name: "App",
  components: {
    homemap,
    accessibleMap,
    advancedMapboxVectorTiles,
    advancedViewPositioning
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
