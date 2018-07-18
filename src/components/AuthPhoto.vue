<template>
  <v-app>
    <v-content>
      <v-container grid-list-md>
        <h1 class='title'>Gestionar mi foto de la UMU</h1>
        <h2 >Anular, autorizar, denegar mi foto de la UMU</h2>
        <v-alert type="error" v-model="error" dismissible> Se ha producido un error</v-alert>
        <v-layout row wrap >
          <v-flex lg12 xs10 md12 >
            Si desea controlar el uso de su fotografía por parte del resto del colectivo 
            universitario para fines no docentes tanto en SUMA como en otras aplicaciones 
            universitarias, debe autorizar su uso o denegarlo.
          </v-flex>
          <v-flex lg12 xs10 md12>
            La autorización o denegación de la visibilidad puede establecerla en cualquier momento. 
            No es necesario que tenga una foto válida previa.
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex lg2 xs4>
            <img :src="photoUrl"  class="image"/>
          </v-flex>
          <v-flex>
              <v-layout row wrap>
                <v-flex xs12 lg12 md12  >
                  <v-icon v-if='valid' large>check</v-icon> {{messagePhoto}}
                </v-flex>
                <v-flex xs12 lg12 md12>
                  <v-switch  v-model='authorized' v-on:change='authorizationChanged' label="Permitir la visualización de la foto">
                    <slot name="label">Visualización autorizada</slot>
                  </v-switch>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row>
             <v-flex>
              +Info: para cambiar su fotografía acuda a uno de los fotomatones disponibles. 
              Puede consultar la ubicación de los mismos en <a href='http://www.um.es/atica/fotomaton' target='_black'>fotomatones</a>
            </v-flex>
          </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      authorized: false,
      status: true,
      valid: false,
      error: null,
      showAlert: false
    }
  },
  props: {
    url: { 
      default: process.env.VUE_APP_SERVER_URI
      },
    user: '',
    token: { 
      default: '24267108'
    }
  },
  computed: {
    messagePhoto: function() {
      let msg = "";
      switch (this.status){
        case 'V':
          msg = 'Su foto está validada'
          break;
        case 'Z':
          msg = 'Su foto está validada'
          break;
        case 'A':
          msg = `Su foto está anulada`
        break;
        case 'P':
          msg = "Su foto está pendiente de validación"
          break;
      }
      return msg;
    },
    photoUrl: function() { 
      return `${this.url}picture/${this.token}` 
    }
  }, 
  mounted: function() {
    axios.get(`${this.url}${this.token}`)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        return data
        })
      .then(data => {
        this.status = data.status;
        this.authorized = data.authorized;
      });
  },
  methods: {
    authorizationChanged: function(evt) {
      console.log(`${evt}: ${this.authorized}`);
      
      axios.post(`${this.url}${this.token}`, {'authorized': this.authorized})
        .then(response => console.log(response.status))
        .catch(function (error) {
          this.authorized = false;
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log ('Error', error.message);
          }
        
      });
    }
  }
};
</script>
<style scoped>
  .image {
    height: 150px;
  }
</style>
