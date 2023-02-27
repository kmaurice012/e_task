<template>
  <div :theme="theme">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <h3>Company Name</h3>
            </v-list-item-title>
            <v-list-item-subtitle> subtext </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-content style="display: flex; gap: 30px">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-model:opened="open">
        <v-list-group value="Users">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-arrow-down-drop-circle-outline"
              title="Work Overview"
            ></v-list-item>
          </template>
          <v-list-item v-for="i in admins" :key="i.title" :to="i.route">
            <v-list-item-content style="display: flex; gap: 30px">
              <v-list-item-icon>
                <v-icon>{{ i.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ i.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-dialog v-model="dialog_main" width="500px">
        <template v-slot:activator="{ props }">
          <v-btn class="text-none" v-bind="props" @click="resetInput()" stacked>
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>

        <v-card class="pa-5">
          <v-card-title>
            <span>Create Task</span>
          </v-card-title>
          <v-text-field
            label="Name"
            variant="outlined"
            v-model="editedItem.name"
          ></v-text-field>
          <v-textarea
            label="Description"
            variant="outlined"
            v-model="editedItem.description"
          ></v-textarea>
          <v-select
            label="Project"
            variant="outlined"
            v-model="editedItem.project_id"
            :items="projects"
            item-title="name"
            item-value="id"
          ></v-select>
          <v-select
            label="Owner"
            variant="outlined"
            v-model="editedItem.user_id"
            :items="users"
            item-title="name"
            item-value="id"
          ></v-select>
          <v-select
            label="Status"
            variant="outlined"
            v-model="editedItem.status"
            :items="statuses"
          ></v-select>
          <v-text-field
            label="Start Date"
            variant="outlined"
            v-model="editedItem.start_date"
          ></v-text-field>
          <v-text-field
            label="End Date"
            variant="outlined"
            v-model="editedItem.end_date"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              color="success"
              @click="save"
              variant="outlined"
              class="mr-4"
            >
              Save Project
            </v-btn>
            <v-btn
              color="danger"
              variant="outlined"
              @click="dialog_main = false"
              class="mr-4"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn class="text-none" stacked>
        <v-badge content="2" color="error">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-btn class="text-none" stacked>
        <v-icon>mdi-account-multiple-outline</v-icon>
      </v-btn>
      <v-btn @click="logout" class="text-none" stacked>
        <v-icon icon="mdi-logout"></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
    <v-card class="main_card">
      <RouterView />
    </v-card>
    </v-main>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  data: () => ({
    drawer: null,
    tasks: [],
    projects: [],
    users: [],
    alert: false,
    alertType: "",
    alertData: "",
    statuses: [
      "Open",
      "In Progress",
      "Done To be tested",
      "Closed",
      "Testing",
      "On Hold",
    ],
    dialog: false,
    dialogDelete: false,
    dialogTitle: "",
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      project_id: "",
      user_id: "",
      description: "",
      status: "",
      start_date: "",
      end_date: "",
    },
    open: ["Users"],
    dialog_main: false,
    admins: [
      {
        title: "Tasks",
        icon: "mdi-checkbox-marked-circle-plus-outline",
        route: "/task",
      },
      {
        title: "Milestone",
        icon: "mdi-sign-direction-plus",
        route: "/milestone",
      },
      // { title: "Timesheet", icon: "mdi-cog-outline", route: "/timesheet" },
    ],
    cruds: [
      ["Create", "mdi-plus-outline"],
      ["Read", "mdi-file-outline"],
      ["Update", "mdi-update"],
      ["Delete", "mdi-delete"],
    ],
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
      { title: "Feed", icon: "mdi-book-multiple-outline", route: "/feed" },
      // { title: "Calendar", icon: "mdi-account-box", route: "/calendar" },
      { title: "Projects", icon: "mdi-briefcase-outline", route: "/projects" },
      {
        title: "User Management",
        icon: "mdi-briefcase-account-outline",
        route: "/users",
      },
    ],
  }),
  methods: {
    onClick() {
      const theme = ref("light");

      theme.value = theme.value === "light" ? "dark" : "light";
    },
    logout() {
      localStorage.removeItem("auth_token");
      this.$router.push(`/`);
    },
  },
};
</script>
<style scoped>
.main_card {
  background-color: rgb(230, 230, 239);
  
  width: auto !important;;
  padding: 0;
  height: 100vh;
}
</style>
