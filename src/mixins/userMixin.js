
export default {
  data: () => ({
    formValues: {
      firstname: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
  }),
  computed: {
    nameRules() {
      return [
        () => !!this.formValues.firstname || 'Name is required',
        () => this.formValues.firstname.length <= 10 || 'Name must be less than 10 characters',
      ];
    },
    emailRules() {
      return [
        () => !!this.formValues.email || 'E-mail is required',
        () => /.+@.+/.test(this.formValues.email) || 'E-mail must be valid',
      ];
    },
    passwordRules() {
      return [
        () => !!this.formValues.password || 'Password is required',
        () => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(this.formValues.password) || 'Minimum 6 characters, One capital letter, Special character, Number',
      ];
    },
    confirmPasswordRules() {
      return [
        () => !!this.formValues.confirmpassword || 'Confirm password is required',
        () => this.formValues.confirmpassword === this.formValues.password || 'The password confirmation does not match',
      ];
    },
  },
 
};
