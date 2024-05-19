<script>

import axios from 'axios'

export default{
  data(){
    return {
        get_id: "",
        get_error: "",
        get_code: "",
        get_country: "",

        delete_id: "",
        delete_error: "",
        delete_message: "",

        update_code_id: "",
        update_code_error: "",
        update_code_new_value: "",
        update_code_message: "",

        create_code_country_id: "",
        create_code_error: "",
        create_code_value: "",
        create_code_message:""
    }
  },
  methods:{
    getPhoneNumberCodeById(){
    if (!/^\d+$/.test(this.get_id.trim())) {
        this.get_error = "Некорректный id";
        return false;
    }
    this.get_error = "";
    
    axios.get(`http://localhost:8080/api/v1/phoneNumberCode/${this.get_id}`)
    .then(res => {
        const response = res.data;
        this.get_code = response.code;
        this.get_country = response.country.name;
    })
    .catch(error => {
        this.get_error = "Такого id не существует";
        this.get_code = "";
        this.get_country = "";
    });
    },

    deletePhoneNumberodeById(){
        if (!/^\d+$/.test(this.delete_id.trim())) {
            this.delete_error = "Некорректный id";
            return false;
        }
        this.delete_error = "";
    
        axios.delete(`http://localhost:8080/api/v1/phoneNumberCode/delete/${this.get_id}`)
        .then(res => {
            this.delete_message = "Успешно удалено";
        })
        .catch(error => {
            this.delete_message = "";
            this.delete_error = "Неверный id, удаление невозможно";
        });
    },  
    updatePhoneNumberCode(){
        if (!/^\d+$/.test(this.update_code_id.trim())) {
            this.update_code_error = "Некорректный id";
            return false;
        }
        this.update_code_error = "";

        axios.put(`http://localhost:8080/api/v1/phoneNumberCode/update/${this.update_code_id}?code=${this.update_code_new_value}`)
        .then(res => {
            this.update_code_message = "Успешно ";
        })
        .catch(error => {
            this.update_code_message = "";
            this.update_code_error = "Неверный id, обновление невозможно";
        });
    },
    createPhoneNumberCode(){
        if (!/^\d+$/.test(this.create_code_country_id.trim())) {
            this.create_code_error = "Некорректный id";
            return false;
        }
        this.create_code_error = "";

        axios.post(`http://localhost:8080/api/v1/phoneNumberCode/create/${this.create_code_country_id}?code=${this.create_code_value}`)
        .then(res => {
            this.create_code_message = "Успешно ";
        })
        .catch(error => {
            this.create_code_message = "";
            this.create_code_error = "Неверный id, создание невозможно";
        });
    }
  }
}

</script>

<template>  

  <router-view></router-view>
  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
  <div class="wrapper" style="max-width: 600px; flex: 1; margin-right: 20px;">
    <h1>Получить телефонный код по его id</h1>
    <input type="text" @input="this.get_id = $event.target.value" placeholder="Введите id кода">
    <button @click="getPhoneNumberCodeById" v-show="get_id!=''">Получить телефонный код</button>
    <p class="error">{{ get_error }}</p>
    <div class="country-info">
      <p class="label" v-if="get_code != ''">Телефонный код:</p>
      <p class="value">{{ get_code }}</p>
    </div>
    <div class="country-info">
      <p class="label" v-if="get_country !=''">Страна:</p>
      <p class="value">{{ get_country }}</p>
    </div>
  </div>

  <div class="wrapper" style="max-width: 600px; flex: 1;">
    <h1>Удалить телефонный код по его id</h1>
    <input type="text" @input="this.delete_id = $event.target.value" placeholder="Введите id кода">
    <button @click="deletePhoneNumberodeById" v-show="delete_id!=''">Удалить телефонный код</button>
    <p class="error">{{ delete_error }}</p>
    <div class="country-info">
      <p class="label" v-if="delete_message != ''">{{delete_message}}</p>
    </div>
  </div>
</div>

<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px;">
  <div class="wrapper" style="max-width: 600px; flex: 1; margin-right: 20px;">
    <h1>Изменить телефонный код</h1>
    <input type="text" @input="this.update_code_id = $event.target.value" placeholder="Введите id кода">
    <input type="text" style="margin-left: 20px" @input="this.update_code_new_value = $event.target.value" v-show="update_code_id!=''" placeholder="Введите новый код">
    <button @click="updatePhoneNumberCode" v-show="(update_code_id!='' && update_code_new_value!='')">Обновить телефонный код</button>
    <p class="error">{{ update_code_error }}</p>
    <div class="country-info">
      <p class="label" v-if="update_code_message != ''">{{update_code_message}}</p>
    </div>
  </div>

  <div class="wrapper" style="max-width: 600px; flex: 1;">
    <h1>Создать телефонный код</h1>
    <input type="text" @input="this.create_code_country_id = $event.target.value" placeholder="Введите id страны">
    <input type="text" style="margin-left: 20px" @input="this.create_code_value = $event.target.value" v-show="create_code_country_id!=''" placeholder="Введите код">
    <button @click="createPhoneNumberCode" v-show="(create_code_country_id!='' && create_code_value!='')">Создать телефонный код</button>
    <p class="error">{{ create_code_error }}</p>
    <div class="country-info">
      <p class="label" v-if="create_code_message != ''">{{create_code_message}}</p>
    </div>
  </div>
</div>

</template>

<style scoped>
.label {
  font-weight: bold;
}

.wrapper{
  margin-top: 30px;
  width: 600px;
  height: 200px;
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
  width: 150px;
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
.error {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}
</style>
