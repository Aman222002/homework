<template>
  <div class="home">
    <div>
      <v-row
        :align="'end'"
        no-gutters
      >
        <v-col
          size="12"
          class="mr-auto"
          :align-self="'end'"
        >
          <v-btn
            class="mr-4"
            color="primary"
            @click="addUser()"
          >
            Add User
          </v-btn>
        </v-col>
      </v-row>

      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Email
              </th>

              <th class="text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(user, index) in users"
              :key="index"
            >
              <td>{{ user.firstname }}</td>
              <td>{{ user.email }}</td>

              <td>
                <v-btn
                  size="small"
                  class="mr-3"
                  color="green"
                  @click="viewUser(user)"
                >
                  view
                </v-btn>
                <v-btn
                  size="small"
                  class="mr-3"
                  color="primary"
                  @click="editUser(user)"
                >
                  edit
                </v-btn><v-btn
                  size="small"
                  class="mr-3"
                  color="error"
                  @click="deleteUser(index)" 
                >
                  delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <!--- User modal -->
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{ modalTitle }}
          </v-card-title>

          <v-card-text>
            <v-form
              ref="userForm"
              @submit.prevent="handleSubmit()"
            >
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

              <v-btn
                class="mr-4"
                type="submit"
                color="primary"
              >
                submit
              </v-btn>
              <v-btn
                class="mr-3"
                color="error"
                @click="clear"
              >
                clear
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- <v-card-actions>
              <v-spacer></v-spacer>
  
              <v-btn color="green darken-1" text @click="saveUser()">
                {{ isEdit ? "Update" : "Save" }}
              </v-btn>
  
              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>
            </v-card-actions> -->
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import userMixin from "@/mixins/userMixin";
// @ is an alias to /src
const formData = {
  _id: null,
  firstname: "",
  email: "",
};
export default {
  name: "HomeView",
  components: {},
  mixins: [userMixin],
  data() {
    return {
      users: [],
      isEdit: false,
      dialog: false
    };
  },
  computed: {
    modalTitle: function () {
      return (this.isEdit ? "Update" : "Add") + " User";
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    addUser() {
      this.dialog = true;
      this.formValues = {
        name: formData.firstname,
        email: formData.email
      }
    },
    editUser(user) {
      this.isEdit = true;
      this.formValues = JSON.parse(JSON.stringify(user));
      this.dialog = true;
    },
    deleteUser(rowNo) {
      this.$axios
        .delete(`users/${this.users[rowNo]._id}`)
        .then(() => {
          this.users.splice(rowNo, 1);
        })
        .catch((e) => {
          console.log("Error", e);
        });
        Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Deleted Successfully',
     showConfirmButton: false,
     timer: 1500
})
    },
    saveUser() { },
    clear() {
      this.$refs.formValues.reset();

    },
    handleSubmit() {
      const isValid = this.$refs.userForm.validate();
      if (isValid) {
        const url = this.isEdit ? "users/" + this.formValues._id : "users";
        let action = "put";
        if (!this.isEdit) {
          action = "post";
        }
        delete this.formValues._id;
        this.$axios[action](url, this.formValues)
          .then(({ data }) => {
            if (!this.isEdit) {
              this.users.push(data);
            } else {
              this.getUsers();
            }
            this.clear();
            this.dialog = false;
            this.isEdit = false;
          })
          .catch((e) => {
            console.log("Error", e);
            this.isEdit = false;
            this.dialog = false;
          });
      }
      Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Submitted Successfully',
     showConfirmButton: false,
     timer: 1500
})
    },

    getUsers() {
      this.$axios
        .get ("/users")
        .then(({ data }) => {
          this.users = data;
        })
        .catch((e) => {
          console.log("Error", e);
        });
    },
    async viewUser(user) {
      const path = `/user/${user._id}`;
      console.log("user", user, path);
      //this.$router.push({ path: `/user`, params: { id: user._id } });
      await this.$router.push({ path: path });
    },
  },
};
</script>
