<script>

import axios from 'axios'

export default{
  data(){
    return {
      languageId: '',
      languageData: null,
      error: '',
      isValidInput: false,
      countryNames: [],

      deleteLanguageId: '',
      isValidDeleteInput: false,
      deleteResponse: '',

      changeLanguageId: '',
      changeLanguageName: '',
      isValidChangeIdInput: false,
      isValidChangeNameInput: false,
      isValidChangeInputs: false,
      changeResponse: '',

      newLanguageName: '',
      newLanguageCountryIds: [''],
      isValidCountryIdInputs: [false],
      isValidCreateInputs: false,
      createResponse: '',
    }
  },
  methods:{
    validateInput() {
      const regex = /^\d+$/;
      this.isValidInput = regex.test(this.languageId);
      this.error = '';
    },
    async fetchLanguageData() {
      try {
        const response = await fetch(`https://javalabs-looq.onrender.com/api/v1/language/${this.languageId}`);
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        this.languageData = await response.json();
        this.countryNames = this.languageData.countries.map(country => country.name);
      } catch (error) {
        this.error = error.message;
        this.languageData = null;
        this.countryNames = [];
      }
    },

    validateDeleteInput() {
      const regex = /^\d+$/;
      this.isValidDeleteInput = regex.test(this.deleteLanguageId);
    },
    async deleteLanguage() {
      try {
        const response = await axios.delete(`https://javalabs-looq.onrender.com/api/v1/language/delete/${this.deleteLanguageId}`);
        this.deleteResponse = 'Язык успешно удален';
      } catch (error) {
        this.deleteResponse = 'Ошибка при удалении языка';
      }
    },

    validateChangeIdInput() {
      const regex = /^\d+$/;
      this.isValidChangeIdInput = regex.test(this.changeLanguageId);
      this.validateChangeInputs();
    },
    validateChangeNameInput() {
      this.isValidChangeNameInput = this.changeLanguageName.trim() !== '';
      this.validateChangeInputs();
    },
    validateChangeInputs() {
      this.isValidChangeInputs = this.isValidChangeIdInput && this.isValidChangeNameInput;
    },
    async changeLanguageName() {
  try {
    const response = await axios.patch(`https://javalabs-looq.onrender.com/api/v1/language/${this.changeLanguageId}`, {
      name: this.changeLanguageName
    });
    this.changeResponse = "Имя языка успешно изменено";
    this.delete_error = "";
  } catch (error) {
    this.changeResponse = "";
    this.delete_error = "Ошибка при удалении языка";
  }
},

    validateCountryIdInput(index) {
      const regex = /^\d+$/;
      this.isValidCountryIdInputs[index] = regex.test(this.newLanguageCountryIds[index]);
      this.validateCreateInputs();
    },
    addCountryIdInput() {
      this.newLanguageCountryIds.push('');
      this.isValidCountryIdInputs.push(false);
    },
    validateCreateInputs() {
      this.isValidCreateInputs =
        this.newLanguageName.trim() !== '' &&
        this.newLanguageCountryIds.every((id, index) => this.isValidCountryIdInputs[index] || id.trim() === '');
    },
    async createLanguage() {
      try {
        const countryIds = this.newLanguageCountryIds.filter((id) => id.trim() !== '').join(',');
        const response = await axios.post(`https://javalabs-looq.onrender.com/api/v1/language/create/?name=${this.newLanguageName}&countryIds=${countryIds}`);
        this.createResponse = 'Язык успешно создан';
        this.newLanguageName = '';
        this.newLanguageCountryIds = [''];
        this.isValidCountryIdInputs = [false];
      } catch (error) {
        this.createResponse = 'Ошибка при создании языка';
      }
    },
    removeCountryId(index) {
    // Удаляем элемент из массива по индексу
    this.newLanguageCountryIds.splice(index, 1);
    },
  }
}

</script>

<template>
    <router-view></router-view>
  
     

    <div style="display: flex; justify-content: space-between;">
  <div style="flex: 1; margin-right: 20px;">
    <div class="wrapper">
      <h1>Создать новый язык</h1>
      <form @submit.prevent="createLanguage">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="margin-top: 30px; border-radius: 30px; padding: 20px; background: #FFCf80; text-align: left; color: #333333; display: inline-block; max-width: 400px; flex: 1;">
            <div>
              <label for="name">Название языка: </label>
              <input type="text" id="name" v-model.trim="newLanguageName" required style="font-size: 16px; padding: 8px;">
            </div>
            <div>
              <label>Страны:</label>
              <div v-for="(countryId, index) in newLanguageCountryIds" :key="index" style="margin-bottom: 8px;">
                <input type="text" v-model.trim="newLanguageCountryIds[index]" required style="font-size: 16px; padding: 8px; width: 200px;" @input="validateCountryIdInput(index)">
                <button type="button" @click="removeCountryId(index)" style="background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer;">Удалить</button>
              </div>
              <button type="button" @click="addCountryIdInput" style="background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer;">Добавить страну</button>
            </div>
            <div>
              <button type="submit" style="margin-top: 15px; background: #2d7d40; color: #FFFFFF; border-radius: 10px; border: 2px solid #2d7d40; padding: 10px 15px; margin-left: 20px; cursor: pointer;" :disabled="!isValidCreateInputs">Создать язык</button>
              <p class="response" v-if="createResponse">{{ createResponse }}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div style="flex: 1; margin-left: 20px;">
    <div class="wrapper">
      <h1>Удалить язык по ID</h1>
      <div class="input-container">
        <input type="text" v-model.trim="deleteLanguageId" placeholder="Введите ID языка" @input="validateDeleteInput" />
        <button @click="deleteLanguage" :disabled="!isValidDeleteInput">Удалить язык</button>
      </div>
      <p  v-if="deleteResponse!=''">{{ deleteResponse }}</p>
      <p class="error" v-if="deleteError">{{ deleteError }}</p>
    </div>

    <div class="wrapper">
          <h1>Получить данные языка по id</h1>
          <div class="input-container">
            <input type="text" v-model.trim="languageId" placeholder="Введите id языка" @input="validateInput" />
            <button @click="fetchLanguageData" v-show="isValidInput">Получить данные</button>
          </div>
          <p class="error" v-if="error">{{ error }}</p>
          <div v-if="languageData">
            <p><b>Название языка:</b> {{ languageData.name }}</p>
            <p><b>Страны:</b> {{ countryNames.join(', ') }}</p>
          </div>
        </div>


  </div>
</div>

  </template>
  
  <style scoped>
  .label {
    font-weight: bold;
  }
  .wrapper {
    max-width: 700px;
    min-width: 400px;
    min-height: 200px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    background: #FFCf80;
    text-align: left;
    color: #333333;
  }
  
  .wrapper h1 {
    margin-top: 15px;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    margin-top: 30px;
  }
  
  .input-container input {
    width: 150px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #110813;
    color: #FcFcFc;
    font-size: 14px;
    padding: 5px 8px;
    color: #333333;
  }
  
  .input-container input:focus {
    border-bottom: 2px solid #2d7d40; 
  }
  
  .input-container button {
  background: #2d7d40;
  color: #FFFFFF;
  border-radius: 10px;
  border: 2px solid #2d7d40;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
  height: 30px;
  font-size: 14px;
  text-align: center;
  display: flex; /* Add this property */
  align-items: center; /* Add this property */
}
  
  .input-container button:hover {
    transform: scale(1.1) translateY(-3px);
  }
  
  .error {
    margin-top: 20px;
    color: red;
    font-weight: bold;
  }
  </style>
