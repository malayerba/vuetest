import Vue from "vue";
import Vuetify from "vuetify";
import PciBanner from "./Banner.vue";
import PciAuthPhoto from "./AuthPhoto.vue";

// index.js or main.js
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

const components = {
  PciBanner,
  PciAuthPhoto
};

Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});

export default components;
