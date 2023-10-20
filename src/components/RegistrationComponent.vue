<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
      >
        <v-img
          src="@/assets/download.jpeg"
          height="90px"
        />
        <v-form ref="form">
          <v-text-field
            v-model="formValues.firstname"
            :rules="nameRules"
            label="Name"
            required
          />

          <v-text-field
            v-model="formValues.email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-text-field
            v-model="formValues.password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          />

          <v-text-field
            v-model="formValues.confirmpassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          />

          <v-btn
            primary
            @click="submitForm()"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import userMixin from "../mixins/userMixin.js";
import axios from 'axios'
export default {
  name:'App',
    mixins:[userMixin],
  data: () => ({
   
  }),
  methods: {
    submitForm() {
      console.log(this.name, this.email, this.password);
      if (this.$refs.form.validate()) {
        const data={
          name:this.formValues.firstname,
          password:this.formValues.password,
          email:this.formValues.email,
          action :'addUser'
        }
        console.log(data);
        axios.post('index.php',data).then(({data})=>{
          Swal.fire("Success",data.message,"success");
        })
        .catch(({response,message})=>{
          Swal.fire("Error",response && response.data?response.data.message:message,"error");
        });

      }
    },
  },}
</script>
