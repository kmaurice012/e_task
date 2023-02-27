<template>
  <v-card width="90%" class="main_card">
    <v-dialog v-model="dialog" width="500px">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          @click="resetInput(), (dialogTitle = 'Create')"
          v-bind="props"
          class="pa-2 ma-2"
        >
          Create Task
        </v-btn>
      </template>

      <v-card class="pa-5">
        <v-card-title>
          <span>{{ dialogTitle }} Task</span>
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
          @update:modelValue="getProjectUsers()"
          :items="projects"
          item-title="name"
          item-value="id"
        ></v-select>
        <v-select
          label="Owner"
          variant="outlined"
          v-model="editedItem.user_id"
          v-if="editedItem.project_id !== ''"
          :items="users"
          item-title="user_name"
          item-value="user_id"
        ></v-select>
        <v-select
          label="Status"
          variant="outlined"
          v-model="editedItem.status"
          :items="statuses"
        ></v-select>
        <v-dialog v-model="dialog_start_date" width="250px">
          <template v-slot:activator="{ props }">
            <v-text-field
              label="Start Date"
              v-bind="props"
              variant="outlined"
              v-model="editedItem.start_date"
            ></v-text-field>
          </template>

          <v-card>
            <DatePicker
              v-model="editedItem.start_date"
              :model-config="modelConfig"
            />
            <v-card-actions>
              <v-btn
                color="success"
                @click="(dialog_start_date = false), test()"
                >Ok
              </v-btn>
              <v-btn color="danger" @click="dialog_start_date = false"
                >Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog_end_date" width="250px">
          <template v-slot:activator="{ props }">
            <v-text-field
              label="End Date"
              variant="outlined"
              v-bind="props"
              v-model="editedItem.end_date"
            ></v-text-field>
          </template>

          <v-card>
            <DatePicker
              v-model="editedItem.end_date"
              :model-config="modelConfig"
            />
            <v-card-actions>
              <v-btn color="success" @click="(dialog_end_date = false), test()"
                >Ok
              </v-btn>
              <v-btn color="danger" @click="dialog_end_date = false"
                >Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card-actions>
          <v-btn color="success" @click="save" variant="outlined" class="mr-4">
            Save Task
          </v-btn>
          <v-btn
            color="danger"
            variant="outlined"
            @click="dialog = false"
            class="mr-4"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-table fixed-header height="600px" style="padding: 30px">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">Owner</th>
          <th class="text-left">Project</th>
          <th class="text-left">Status</th>
          <th class="text-left">Start Date</th>
          <th class="text-left">End Date</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tasks" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.user_name }}</td>
          <td>{{ item.project_name }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td class="d-flex">
            <v-icon icon="mdi-pencil" @click="editItem(item)"></v-icon
            ><v-icon icon="mdi-delete" @click="deleteItem(item)"></v-icon>
          </td>
        </tr>
      </tbody>
      <v-dialog
        v-model="dialogDelete"
        width="400px"
        height="200px"
        transition="dialog-top-transition"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar color="primary" title="Delete Confirmation"></v-toolbar>
            <v-card-text>
              <div>Are you sure you want to delete this Item!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="deleteConfirm(), (isActive.value = false)"
                >Confrm</v-btn
              >
              <v-btn variant="text" @click="isActive.value = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-table>
    <div class="text-center ma-2">
      <v-snackbar v-model="alert" :color="alertType" variant="tonal">
        {{ alertData }}

        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-card>
</template>
<script>
// import API from "../services/projects_api.js";
// import { DatePicker } from "v-calendar";
// import "v-calendar/dist/style.css";
export default {
  // components: {
  //   DatePicker,
  // },
  data() {
    return {
      tasks: [],
      projects: [],
      users: [],
      alert: false,
      dialog_start_date: false,
      dialog_end_date: false,
      modelConfig: {
        type: "string",
        mask: "YYYY-MM-DD", // Uses 'iso' if missing
      },
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
    };
  },
  created() {
    // this.getTasks();
    // this.getSelects();
  },
  methods: {
    // getTasks() {
    //   API.getTasks()
    //     .then((response) => {
    //       this.tasks = response.data.data;
    //     })
    //     .catch((error) => {
    //       console.log("There was an error:", error);
    //     });
    // },
    // test() {
    //   console.log("CHANGE");
    // },
    // getSelects() {
    //   API.getProjects()
    //     .then((response) => {
    //       this.projects = response.data.data;
    //     })
    //     .catch((error) => {
    //       console.log("There was an error:", error);
    //     });
    // },
    // getProjectUsers() {
    //   // console.log(this.editedItem.project_id, "Project Id");
    //   API.getProjectUsers(this.editedItem.project_id)
    //     .then((response) => {
    //       console.log("🚀 ", response)
          
    //       this.users = response.data.data;
    //     })
    //     .catch((error) => {
    //       console.log("There was an error:", error);
    //     });
    // },
    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogTitle = "Edit";
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogTitle = "Edit";
      this.dialogDelete = true;
    },
    // deleteConfirm() {
    //   API.deleteTask(this.editedItem.id)
    //     .then((response) => {
    //       this.alert = true;
    //       this.alertType = "sucess";
    //       this.alertData = response.data.message;
    //       this.tasks.splice(this.editedIndex, 1);
    //       this.dialog = false;
    //       this.resetInput();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       this.alert = true;
    //       this.alertType = "warming";
    //       this.alertData = error.response.data.message;
    //     });
    // },
    resetInput() {
      (this.editedItem.name = ""),
        (this.editedItem.project_id = ""),
        (this.editedItem.user_id = ""),
        (this.editedItem.description = ""),
        (this.editedItem.status = ""),
        (this.editedItem.start_date = ""),
        (this.editedItem.end_date = "");
    },
    // save() {
    //   if (this.editedIndex > -1 || this.dialogTitle === "Edit") {
    //     API.updateTasks(this.editedItem)
    //       .then((response) => {
    //         // Object.assign(this.tasks[this.editedIndex], response.data.data);
    //         this.alert = true;
    //         this.alertType = "sucess";
    //         this.alertData = response.data.message;
    //         this.dialog = false;
    //         this.resetInput();
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         this.alert = true;
    //         this.alertType = "warming";
    //         this.alertData = error.response.data.message;
    //       });
    //   } else {
    //     API.createTask(this.editedItem)
    //       .then((response) => {
    //         this.alert = true;
    //         this.alertType = "sucess";
    //         this.alertData = response.data.message;
    //         this.dialog = false;
    //         this.tasks.unshift(response.data.data);
    //         this.resetInput();
    //         this.dialog = false;
    //       })
    //       .catch((error) => {
    //         this.alert = true;
    //         this.alertType = "warming";
    //         this.alertData = error.response.data.message;
    //       });
    //   }
    // },
  },
};
</script>
<style scoped>
.main_card {
  margin: 40px;
  height: 90%;
}
</style>
