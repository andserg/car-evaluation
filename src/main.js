import Vue from 'vue';
import './style.scss';

import extras from './util/extras.js'

new Vue({
  el: '#app',
  components: {
    'car-filter': {
      template: `<div id="movie-list"><h2>Selection results:</h2><check-filter></check-filter></div>`,
      components: {
        'check-filter': {
          template: `<div>Filter</div>`
        }
      }
    },
    'car-list': {
      template: `<div id="movie-list">
                    <div v-for="brand in brands" class="movie">{{ brand.title }}</div>
                  </div>`,
        data: function() {
          return {
            brands: [
              {title: 'Audi'},
              {title: 'BMW'},
              {title: 'Lexus'}
            ]
          };
      }
    }
  }
});
