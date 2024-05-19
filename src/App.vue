<script>



export default{
  
}
 
</script>

<template>  

 

  <div>
    <router-link to="/one"><button>Страны</button></router-link>
    <router-link to="/two"><button>Телефонные коды</button></router-link>
    <router-link to="/three"><button>Языки</button></router-link>
    <router-link to="/four"><button>Запросы всех данных</button></router-link>

    <router-view></router-view>
  </div>

  
</template>

<style scoped>

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
}
button {
  background: #2d7d40;
  color: #FFFFFF;
  border-radius: 10px;
  border: 2px solid #2d7d40;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}

button:hover {
  transform: scale(1.1);
}
</style>
