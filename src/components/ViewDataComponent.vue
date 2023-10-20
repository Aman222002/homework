<template>
  <div>Here {{ $route.params.id }} {{ user }}</div>
</template>
  <script>
  export default {
    name: "ViewData",
    data: () => ({
      user: {},
    }),
    mounted() {
      this.getUser(this.$route.params.id ?? 0);
    },
    methods: {
      getUser(id) {
        this.$axios
          .get("users/" + id)
          .then(({ data }) => {
            this.user = data;
            console.log("user", data);
          })
          .catch((e) => {
            console.log("Error", e);
          });
      },
    },
  };
  </script>
  