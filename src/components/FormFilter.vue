<template>
  <div class="filter">
    <div class="container header">
        <img src="/public/logo.png">
        <h1>Car Evaluation</h1>
    </div>
    <div class="container">
      <div class="column-result">
        <p v-bind:class="showResult(1)">Тип транспорта: {{ category }}</p>
        <p v-bind:class="showResult(2)">Тип кузова: {{ bodystyle }}</p>
        <p v-bind:class="showResult(3)">Марка: {{ mark }}</p>
        <p v-bind:class="showResult(4)">Модель: {{ model }}</p>
        <p v-bind:class="showResult(5)">Год выпуска: {{ year }}</p>
        <p v-bind:class="showResult(6)">Коробка передач: {{ gearbox }}</p>
        <p v-bind:class="showResult(7)">Тип топлива: {{ type }}</p>
        <p v-bind:class="showResult(8)">Тип привода: {{ typeAuto }}</p>
        <p v-bind:class="showResult(9)">Опции: {{  }}</p>
        <p v-bind:class="showResult(10)">Объем двигателя: {{ engineСapacity }}</p>
        <p v-bind:class="showResult(11)">Пробег: {{ mileage }}</p>
      </div>

      <div class="column-picker">
        <select v-bind:class="showInputs(1)" @change="pickCategory">
          <option value="">Категория</option>
          <option v-for="category in categories" v-bind:value="category.id">
            {{category.name}}
          </option>
        </select>
        <select v-bind:class="showInputs(2)" @change="pickBodyStyle">
          <option value="">Тип кузова</option>
          <option v-for="bodystyle in bodystyles" v-bind:value="bodystyle.id">
            {{bodystyle.name}}
          </option>
        </select>

        <select v-bind:class="showInputs(3)" @change="pickMarks">
          <option value="">Марка</option>
          <option v-for="mark in marks" v-bind:value="mark.id">
            {{mark.name}}
          </option>
        </select>

        <select v-bind:class="showInputs(4)" @change="pickModels">
          <option value="">Модель</option>
          <option v-for="model in models" v-bind:value="model.id">
            {{model.name}}
          </option>
        </select>

        <input v-model="year" type="number" v-bind:class="showInputs(5)" placeholder="Год выпуска" />

        <select v-bind:class="showInputs(6)" @change="pickGearBox">
          <option value="">Коробка передач</option>
          <option v-for="gearbox in gearboxes" v-bind:value="gearbox.id">
            {{gearbox.name}}
          </option>
        </select>

        <select v-bind:class="showInputs(7)" @change="pickType">
          <option value="">Тип топлива</option>
          <option v-for="type in types" v-bind:value="type.id">
            {{type.name}}
          </option>
        </select>

        <select v-bind:class="showInputs(8)" @change="pickTypeAuto">
          <option value="">Тип привода</option>
          <option v-for="typeAuto in typesAuto" v-bind:value="typeAuto.id">
            {{typeAuto.name}}
          </option>
        </select>

        <!--Options-->
        <div v-bind:class="showInputs(9)">
            <div class="sizeOptions">
              <p v-for="option in options">
              <input type="checkbox" v-bind:name="option.name" v-bind:value="option.id" @change="pickOptions">
                {{option.name}}
              </p>
            </div>
        </div>

        <input v-model="engineСapacity" type="number" v-bind:class="showInputs(10)" placeholder="Объем двигателя" />

        <input v-model="mileage" type="number" v-bind:class="showInputs(11)" placeholder="Пробег" />

        <span class="button" @click="nextInputFunction">Next</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Test project',

      counterInputs: 1,
      arrayIndexForShow: [1],
      maxSize: 11,

      category: '',
      categoryId: '',
      categories: [],

      bodystyle: '',
      bodystyleId: '',
      bodystyles: [],

      mark: '',
      markId: '',
      marks: [],

      model: '',
      modelId: '',
      models: [],

      year: '',

      gearbox: '',
      gearboxId: '',
      gearboxes: [],

      type: '',
      typeId: '',
      types: [],

      typeAuto: '',
      typeAutoId: '',
      typesAuto: [],

      option: '',
      optionId: '',
      options: [{id: 1, name: 'test'}, {id:2, name: 'test2'}],
      optionsChecked: [],

      engineСapacity: '',

      mileage: '',


      error: null
    }
  },
  created: function(){
    this.init();
  },
  methods: {

    init: function(){
      this.loadData('http://localhost:8000/api/v1/auto/categories/')
        .then((response) => {
          this.categories = response;
        });
    },

    getData: function(path, string) {
      this.loadData(path)
        .then((response) => {
          console.log('response', response);
          if(string === 'marks') {
            this.marks = response;
          }
          if(string === 'models') {
            this.models = response;
          }
          if(string === 'bodystyles') {
            this.bodystyles = response;
          }
          if(string === 'gearboxes') {
            this.gearboxes = response;
          }
          if(string === 'types') {
            this.types = response;
          }
          if(string === 'typesAuto') {
            this.typesAuto = response;
          }
          if(string === 'options') {
            this.options = response;
          }
        });
    },


    loadData: function(fullUrl) {
      return new Promise((resolve, reject) => {
        fetch(fullUrl)
      .then((response) => {
        return response.json().then((json) => {
          response.ok ? resolve(json) : reject(json);
        })
    })
      })
    },


    showInputs: function (index) {
      let returnValue = 'notVisible'
      if (this.counterInputs === index) {
        returnValue = ''
      }
      return returnValue
    },
    nextInputFunction: function () {
      if (this.maxSize !== this.counterInputs) {
        this.counterInputs++
        this.arrayIndexForShow.push(this.counterInputs)
        return this.counterInputs
      } else {
        return ''
      }
    },
    showResult: function (index) {
      let returnValue = 'notVisible'
      for (let arrayItem in this.arrayIndexForShow) {
        if (this.arrayIndexForShow[arrayItem] === index) {
          returnValue = ''
        }
      }
      return returnValue
    },

    pickCategory: function (item ) {
      this.categoryId = item.target.value;
      for(let category in this.categories) {
        if(this.categories[category].id === parseInt(this.categoryId)) {
          this.category = this.categories[category].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/bodystyles/`, 'bodystyles');
    },

    pickBodyStyle: function (item) {
      this.bodystyleId = item.target.value;
      for(let bodystyle in this.bodystyles) {
        if(this.bodystyles[bodystyle].id === parseInt(this.bodystyleId)) {
          this.bodystyle = this.bodystyles[bodystyle].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/marks/`, 'marks');
    },

    pickMarks: function (item) {
      this.markId = item.target.value;
      for(let mark in this.marks) {
        if(this.marks[mark].id === parseInt(this.markId)) {
          this.mark = this.marks[mark].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/models/?mark_id=${this.markId}`, 'models');
    },

    pickModels: function (item) {
      this.modelId = item.target.value;
      for(let model in this.models) {
        if(this.models[model].id === parseInt(this.modelId)) {
          this.model = this.models[model].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/gearboxes/`, 'gearboxes');
    },

    pickGearBox: function (item) {

      this.gearboxId = item.target.value;
      for(let gearbox in this.gearboxes) {
        if(this.gearboxes[gearbox].id === parseInt(this.gearboxId)) {
          this.gearbox = this.gearboxes[gearbox].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/types/`, 'types');
    },

     pickType: function (item) {
      this.typeId = item.target.value;
      for(let type in this.types) {
        if(this.types[type].id === parseInt(this.typeId)) {
          this.type = this.types[type].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/driver-types/`, 'typesAuto');
    },

    pickTypeAuto: function (item) {
      this.typeAutoId = item.target.value;
      for(let typeAuto in this.typesAuto) {
        if(this.typesAuto[typeAuto].id === parseInt(this.typeAutoId)) {
          this.typeAuto = this.typesAuto[typeAuto].name;
        }
      }
      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/option/`, 'options');
      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/gearboxes/`, 'gearboxes');
    },

//    Options

    pickEngineСapacity: function (item) {
      this.engineСapacityId = item.target.value;
      for(let engineСapacity in this.engineСapacites) {
        if(this.engineСapacites[engineСapacity].id === parseInt(this.engineСapacityId)) {
          this.engineСapacity = this.engineСapacites[engineСapacity].name;
        }
      }
//      this.getData(``, '');
    },


//    TODO:  доделать удаление/добавление option

    filtredOptions: function (item) {

    },

    pickOptions: function (item) {
      console.log('length: ', this.optionsChecked.length);
      console.log('value: ', item.target.value);
      for(let option in this.options) {
        if(this.options[option].id === parseInt(item.target.value, 10)) {
//          if(this.optionsChecked[option].id !== parseInt(item.target.value, 10)) {
            this.optionsChecked.push(this.options[option]);
//          } else {
//            this.optionsChecked.splice(option, 1);
//          }
        }
      }
      console.log(this.optionsChecked);

//      this.optionId = item.target.value;
//      for(let option in this.options) {
//        if(this.options[option].id === parseInt(this.optionId)) {
//          this.option = this.options[option].name;
//        }
//      }
//      this.getData(`http://localhost:8000/api/v1/auto/categories/${this.categoryId}/models/?mark_id=${this.markId}`, 'models');
    },

  }
}
</script>
