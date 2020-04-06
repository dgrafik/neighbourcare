<template>
  <div>
    <GmapMap
      :center="center"
      class="map__gmap"
      :zoom="15"
      :options="{
        zoomControl: true,
        scaleControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        gestureHandling: 'greedy'
      }"
      style="width:100%;  height: 100%;"
    >
      <GmapMarker
        v-for="(marker, index) in activeUsers"
        :key="index"
        :position="marker.location"
        :clickable="true"
        :icon="{
          url: require('@/assets/map/map-pin.png'),
          scaledSize: { width: 27, height: 48, f: 'px', b: 'px' }
        }"
        @click="centerOnClickedMarker(marker, index)"
      />
      <gmap-circle
        :center="circleCenter"
        :radius="mapRadius"
      />
    </GmapMap>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Map',
  props: {
    radius: {
      type: Number,
      default: 1,
    },
    centerOnMarker: {
      type: Object,
    },
    activeUsers: {
      type: Array,
    },
  },
  watch: {
    centerOnMarker(newVal) {
      if (newVal.location) {
        this.center = newVal.location;
      }
    },
  },
  computed: {
    ...mapState('places', ['searchedPlace', 'markers', 'searchedCenter']),
    mapRadius() {
      return this.radius * 1000;
    },
    center: {
      get() {
        let center = {};
        if (this.searchedPlace.location.lat != null && this.searchedPlace.location.lng != null) {
          center = this.searchedPlace.location;
        } else {
          center = JSON.parse(localStorage.getItem('nh-place-searched-location'));
        }
        return center;
      },
      set(value) {
        this.SET_LOCATION_SEARCHED_PLACE(value);
      },
    },
    circleCenter() {
      let circleCenter = {};
      if (this.searchedCenter.lat != null && this.searchedCenter.lng != null) {
        circleCenter = this.searchedCenter;
      } else {
        circleCenter = JSON.parse(localStorage.getItem('nh-place-searched-location'));
      }
      return circleCenter;
    },
  },
  methods: {
    ...mapActions('places', ['searchPlaces']),
    ...mapMutations('places', ['SET_LOCATION_SEARCHED_PLACE']),
    centerOnClickedMarker(marker, index) {
      this.center = marker.location;
      this.$emit('scrollToClickedCard', index);
    },
  },
};
</script>

<style scoped lang="scss">
    .map {
        &__gmap {
            /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
            border-radius: 10px !important;
        }
    }
</style>
