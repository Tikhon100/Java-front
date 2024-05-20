<template>
    <div class="container">
      <div class="wrapper">
        <h2>Получить все страны</h2>
        <button @click="fetchCountries">Получить данные</button>
        <div class="data-container" v-if="countries">
          <pre>{{ JSON.stringify(countries, null, 2) }}</pre>
        </div>
      </div>
  
      <div class="wrapper">
        <h2>Получить все языки</h2>
        <button @click="fetchLanguages">Получить данные</button>
        <div class="data-container" v-if="languages">
          <pre>{{ JSON.stringify(languages, null, 2) }}</pre>
        </div>
      </div>
  
      <div class="wrapper">
        <h2>Получить все телефонные коды</h2>
        <button @click="fetchPhoneCodes">Получить данные</button>
        <div class="data-container" v-if="phoneCodes">
          <pre>{{ JSON.stringify(phoneCodes, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        countries: null,
        languages: null,
        phoneCodes: null,
      };
    },
    methods: {
      async fetchCountries() {
        try {
          const response = await fetch('https://javalabs-looq.onrender.com/api/v1/country/all');
          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }
          this.countries = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async fetchLanguages() {
        try {
          const response = await fetch('http://localhost:8080/api/v1/language/all');
          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }
          this.languages = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
      async fetchPhoneCodes() {
        try {
          const response = await fetch('http://localhost:8080/api/v1/phoneNumberCode/all');
          if (!response.ok) {
            throw new Error('Ошибка при получении данных');
          }
          this.phoneCodes = await response.json();
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .wrapper {
    max-width: 700px;
    margin-top: 20px;
    min-width: 400px;
    min-height: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 30px;
    background: #ffcf80;
    text-align: left;
    color: #333333;
    align-items: center;
  }
  
  .wrapper button {
    background: #2d7d40;
    color: #ffffff;
    border-radius: 10px;
    border: 2px solid #2d7d40;
    padding: 10px 15px;

    margin-top: 10px;
    cursor: pointer;
    transition: transform 500ms ease;
  }
  
  .data-container {
    max-height: 400px;
    overflow-y: auto;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  </style>