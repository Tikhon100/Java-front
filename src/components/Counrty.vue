<script>

import axios from 'axios'

export default{
  data(){
    return {
      id: "",
      error: "",
      country_name: null,
      country_languages: null,
      country_phoneNumberCodes: null,
      info: null,

      update_name_country_id: "",
      new_name: null,
      update_name_error: "",
      upd_name_country_name: null,
      upd_name_country_languages: null,
      upd_name_country_phoneNumberCodes: null,

      delete_id: "",
      delete_message: "",
      delete_error: "",

      country: {
        name: '',
        phoneNumberCodes: [{ code: '' }],
        languages: [{ name: '' }]
      }
    }
  },
  methods:{
    getCountry() {
      if (!/^\d+$/.test(this.id.trim())) {
        this.error = "Некорректный id";
      return false;
      }
      this.error = "";

      axios.get(`https://javalabs-looq.onrender.com//api/v1/country/${this.id}`)
      .then(res => {
        const country = res.data;
        // Формирование строки с языками
        this.country_languages = country.languages.map(lang => lang.name).join(", ");

        // Формирование строки с телефонными кодами
        this.country_phoneNumberCodes = country.phoneNumberCodes.map(code => code.code).join(", ");

        // Формирование строки с именем страны
        this.country_name = country.name;
      })
      .catch(error => {
        // Обработка ошибки
        this.error = "Ошибка при получении данных";
        this.country_name = "";
        this.country_languages = "";
        this.country_phoneNumberCodes = "";
      });
    },

    updateNameCountry(){
      if (!/^\d+$/.test(this.update_name_country_id.trim())) {
        this.update_name_error = "Некорректный id";
        return false;
      }
      if (this.new_name.trim().length<2){
        if (this.update_name_country_id=="Неккоректный id"){
          this.update_name_error = "Некорректный id и недопустимое имя";
          return false;
        }
        else {
          this.update_name_error = "Недопустимое имя";
          return false;
        }
      }
      this.update_name_error = "";
      axios.patch(`https://javalabs-looq.onrender.com//api/v1/country/updateName/${this.update_name_country_id}?name=${this.new_name}`)  
      .then(res => {
        const country = res.data;
        // Формирование строки с языками
        this.upd_name_country_languages = country.languages.map(lang => lang.name).join(", ");

        // Формирование строки с телефонными кодами
        this.upd_name_country_phoneNumberCodes = country.phoneNumberCodes.map(code => code.code).join(", ");

        // Формирование строки с именем страны
        this.upd_name_country_name = country.name;
      })
      .catch(error => {
        // Обработка ошибки
        this.update_name_error = "Страны с таким id не существует, изменить имя невозможно";
        this.upd_name_country_languages = "";
        this.upd_name_country_phoneNumberCodes = "";
        this.upd_name_country_name = "";
      });

    },

    deleteCountry(){
      if (!/^\d+$/.test(this.delete_id.trim())) {
        this.delete_error = "Некорректный id";
        return false;
      }
      this.delete_error = "";
      axios.delete(`https://javalabs-looq.onrender.com//api/v1/country/delete/${this.delete_id}`)
      .then(res => {
        this.delete_message = "Успешно удалено!";
      })
      .catch(error => {
        // Обработка ошибки
        this.delete_error = "Страны с таким id не существует";
        this.delete_message = "";
      });
    },

    addCode() {
      this.country.phoneNumberCodes.push({ code: '' })
    },
    removeCode(index) {
      this.country.phoneNumberCodes.splice(index, 1)
    },
    addLanguage() {
      this.country.languages.push({ name: '' })
    },
    removeLanguage(index) {
      this.country.languages.splice(index, 1)
    },
    submitCountry() {
      axios.post('https://javalabs-looq.onrender.com//api/v1/country/create', this.country)
        .then(response => {
          this.country.name = ''; // Сбросить название страны
        this.country.phoneNumberCodes = []; // Сбросить массив телефонных кодов
        this.country.languages = []; // Сбросить массив языков
        })
        .catch(error => {
          
        })
    } 
  }
}
</script>

<template>  

  <router-view></router-view>

  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
  <div style="margin-top: 30px; border-radius: 30px; padding: 20px; background: #FFCf80; text-align: left; color: #333333; display: inline-block; max-width: 400px; flex: 1;">
    <h2>Создать страну</h2>
    <form @submit.prevent="submitCountry">
      <div>
        <label for="name">Название страны: </label>
        <input type="text" id="name" v-model="country.name" required style="font-size: 16px; padding: 8px;">
      </div>
      <div>
        <label>Телефонные коды:</label>
        <div v-for="(code, index) in country.phoneNumberCodes" :key="index" style="margin-bottom: 8px;">
          <input type="text" v-model="code.code" required style="font-size: 16px; padding: 8px; width: 200px;">
          <button type="button" @click="removeCode(index)" style="background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer; transition: transform 0.3s ease;" @mouseover="style.transform = 'scale(1.1)'" @mouseleave="style.transform = 'scale(1)'">Удалить</button>
        </div>
        <button type="button" @click="addCode" style="background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px;">Добавить код</button>
      </div>
      <div>
        <label>Языки:</label>
        <div v-for="(language, index) in country.languages" :key="index" style="margin-bottom: 8px;">
          <input type="text" v-model="language.name" required style="font-size: 16px; padding: 8px; width: 200px;">
          <button type="button" @click="removeLanguage(index)" style="background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer; transition: transform 0.3s ease;" @mouseover="style.transform = 'scale(1.1)'" @mouseleave="style.transform = 'scale(1)'">Удалить</button>
        </div>
        <button type="button" @click="addLanguage" style="background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer; transition: transform 0.3s ease;" @mouseover="style.transform = 'scale(1.1)'" @mouseleave="style.transform = 'scale(1)'">Добавить язык</button><br>
      </div>
      <div>
      <button type="submit" style=" margin-top: 15px;  background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer; transition: transform 0.3s ease;" @mouseover="style.transform = 'scale(1.1)'" @mouseleave="style.transform = 'scale(1)'">Создать страну</button>
      </div>    
    </form>
  </div>

  <div class="wrapper" style="margin-left: 20px; max-width: 600px; flex: 1;">
    <h1>Получить страну по ее id</h1>
    <p>Узнать телефонные коды страны</p>
    <input type="text" @input="this.id = $event.target.value" placeholder="Введите id страны">
    <button @click="getCountry" v-show="id!=''">Получить телефонный код</button>
    <p class="error">{{ error }}</p>
    <div class="country-info">
      <p class="label" v-if="error == ''">Имя страны:</p>
      <p class="value">{{ country_name }}</p>
    </div>
    <div class="country-info">
      <p class="label" v-if="error ==''">Телефонные коды:</p>
      <p class="value">{{ country_phoneNumberCodes }}</p>
    </div>
    <div class="country-info">
      <p class="label" v-if="error == ''">Языки:</p>
      <p class="value">{{ country_languages }}</p>
    </div>
  </div>
</div>

<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px;">
  <div class="wrapper" style="max-width: 400px; flex: 1;">
    <h1>Удалить страну по ее id</h1>
    <input type="text" @input="this.delete_id = $event.target.value" placeholder="Введите id страны">
    <button @click="deleteCountry" v-show="delete_id!=''">Удалить страну</button>
    <p class="error">{{ delete_error }}</p>
    <p style="margin-top: 20px;">{{ delete_message }}</p>
  </div>

  <div class="wrapper" style="margin-left: 20px; max-width: 600px; flex: 1;">
    <h1>Изменить имя страны по ее id</h1>
    <input type="text" @input="this.update_name_country_id = $event.target.value" placeholder="Введите id страны">
    <input type="text" style="margin-left: 20px" @input="this.new_name = $event.target.value" v-show="update_name_country_id!=''" placeholder="Введите новое имя страны">
    <button @click="updateNameCountry" v-show="(new_name!=null && update_name_country_id!='')">Обновить имя страны</button>
    <p class="error">{{ update_name_error }}</p>
    <div class="country-info">
      <p class="label" v-if="update_name_error == ''">Имя страны:</p>
      <p class="value">{{ upd_name_country_name }}</p>
    </div>
    <div class="country-info">
      <p class="label" v-if="update_name_error ==''">Телефонные коды:</p>
      <p class="value">{{ upd_name_country_phoneNumberCodes }}</p>
    </div>
    <div class="country-info">
      <p class="label" v-if="update_name_error == ''">Языки:</p>
      <p class="value">{{ upd_name_country_languages }}</p>
    </div>
  </div>
</div>

</template>

<style scoped>


.country-info {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}


.error {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}

.wrapper{
  margin-top: 30px;
  width: 1500px;
  height: 300px;
  border-radius: 30px;
  padding: 20px;
  background: #FFCf80;
  text-align: left  ;
  color:#333333
}
.wrapper h1
{
  margin-top: 15px;
}

.wrapper input{
  margin-top: 30px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #110813;
  color: #FcFcFc;
  font-size: 14px;
  padding: 5px 8px;
  color: #333333
}

.wrapper input:focus {
  border-bottom: 2px solid #2d7d40; 
}

.wrapper button{
  background: #2d7d40;
  color: #FFFFFF;
  border-radius: 10px;
  border: 2px solid #2d7d40;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}

.wrapper button:hover {
  transform: scale(1.1) translateY(-3px);
}

</style>
