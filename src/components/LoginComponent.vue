<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-img
              src="@/assets/images.jpeg"
              height="80"
            />
            <v-form ref="form">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              />
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
              />
              <v-btn
                color="primary"
                @click="submitForm"
              >
                Login
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [v => !!v || 'Password is required'],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        Swal.fire("Login Successfully");
        localStorage.setItem('isLogin', 1);
        this.$router.go();
      }
    },
  }
};
</script>
