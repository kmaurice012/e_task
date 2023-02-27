<template>
  <div>
    <div class="main_form mx-auto">
      <div class="form">
        <v-form autocomplete="on">
          <v-card class="mx-auto pa-4 form_card" width="450">
            <v-avatar size="100" style="margin-left: 150px" rounded="4">
              <v-img
                src="https://img.icons8.com/ios-filled/512/squidward-tentacles.png"
                alt="John"
              ></v-img>
            </v-avatar>
            <div style="text-align: center">
              <h1>Hello Again!</h1>
              <P>Welcome to the best task manager</P>
            </div>
            <v-spacer></v-spacer>
            <div style="margin: 32px">
              <v-text-field
                v-model="input.name"
                variant="outlined"
                label="User Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="input.password"
                variant="outlined"
                type="password"
                label="Password "
                required
              ></v-text-field>
              <!-- <v-card-actions> -->
              <v-btn
                color="primary"
                @click="login()"
                size="large"
                style="width: 380px"
              >
                Login
              </v-btn>
              <!-- <div style="padding-top: 10px">
                  Not registered yet?
                  <a href="" color="primary">Create an Account</a>
                </div> -->
            </div>
          </v-card>
        </v-form>
      </div>
      <div class="courasel">
        <v-carousel hide-delimiters show-arrows="hover">
          <v-carousel-item
            src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37375.jpg?w=1380&t=st=1673597238~exp=1673597838~hmac=3a8ea2025a3792c3f086fb806c787543e9b89c3a9bec6f071e0449aacf2a4d5a"
            cover
          ></v-carousel-item>

          <v-carousel-item
            src="https://img.freepik.com/free-vector/business-leadership-motivation-enterprise-management-setting-goals-achieving-success-ambitious-boss-top-manager-controlling-employees-performance_335657-2349.jpg?w=826&t=st=1673597049~exp=1673597649~hmac=9806ee327053aba9350cf126b590f5bbf5ba80e2cc96b381d1fd947d25fbda3f"
            cover
          ></v-carousel-item>

          <v-carousel-item
            src="https://img.freepik.com/free-vector/organization-abstract-concept_335657-3015.jpg?w=826&t=st=1673597117~exp=1673597717~hmac=a398d0b5e8c3a0ea1c5ed4c9a6ae483b8ea782e438582ef933b248b498d87626"
            cover
          ></v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <div class="text-center ma-2">
      <!-- <v-btn @click="snackbar = true"> Open Snackbar </v-btn> -->
      <v-snackbar v-model="alert" :color="alertType" variant="tonal">
        {{ alertData }}

        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
// import AuthApi from "../services/auth_api";
// import AdminApi from "../services/projects_api";
export default {
  components: {},

  data() {
    return {
      input: {
        name: "",
        password: "",
      },
      alert: false,
      alertData: `Hello, I'm a snackbar`,
      alertType: "",
    };
  },
  methods: {
    forgotPassword() {
      AdminApi.forgotPassword(this.email, this.company_code)
        .then((response) => {
          this.alertData = response.data.message;
          this.alertType = "success";
          this.alert = true;
          this.dialog = false;
          this.selectedItems = [];
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        })
        .catch((error) => {
          this.alertData = error.response.data
            ? error.response.data.message
            : "An error occured while trying to login";
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          this.alertType = "error";
          this.alert = true;
        });
    },

    // login() {
    //   let auth = new AuthApi();
    //   auth
    //     .login(this.input)
    //     .then((response) => {
    //       if (response.data.status) {
    //         localStorage.setItem("auth_token", response.data.token);
    //         localStorage.setItem("user_id", response.data.user.id);
    //         this.alert = true;
    //         this.alertData = response.data.message;
    //         this.$router.push(`/dashboard`);
    //         setTimeout(() => {
    //           this.alert = false;
    //         }, 5000);
    //       }
    //     })
    //     .catch((error) => {
    //       this.alert = true;
    //       this.alertData = error.response.data
    //         ? error.response.data.message
    //         : "An error occured while trying to login";
    //       setTimeout(() => {
    //         this.alert = false;
    //       }, 5000);
    //     });
    // },
    checkLogin() {
      if (localStorage.getItem("auth_token") != null) {
        this.$router.push(`/dashboard`);
      }
    },
    //validation
    checkForm(e) {
      e.preventDefault();
    },
  },
};
</script>
<style scoped>
.main_form {
  width: 900px;
  height: 500px;
  margin-top: 200px;
  display: flex;
  border-radius: 5px;
  border-style: solid;
  border-width: 0.1px;
}
.form {
  width: 450px;
}
.courasel {
  width: 450px;
}
.form_card {
  height: 498px;
}
.v-text-field {
  width: 350px;
}
</style>
