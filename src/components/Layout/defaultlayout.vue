<template>
  <v-main>
    <div class="app-container">
      <NavbarComponent />
      <div class="main-content">
        <router-view />
      </div>
      <div class="FooterComponent">
        <FooterComponent />
      </div>
    </div>
  </v-main>
</template>
  
  <script>
  import NavbarComponent from "../NavbarComponent.vue";
  import FooterComponent from "../FooterComponent.vue";
  
  export default {
    name: "App",
    components: {
      NavbarComponent,
      FooterComponent,
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    margin-top: 20px; 
  }
  
  
  .FooterComponent {
    margin-top: auto;
  }
  </style>
  