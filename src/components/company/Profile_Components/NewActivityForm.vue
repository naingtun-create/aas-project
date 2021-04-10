<template>
<div id="NewProductForm">
    <v-dialog v-model="dialog" persistent width="600px">
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          New Activity
        </v-btn>
      </template>
        <v-card>
            <v-toolbar
              color="primary"
              dark
              class="headline"
            >Promote a New Activity!</v-toolbar>
            <div id="content"> 
                <v-card-text>
                    <v-form ref="form" lazy-validation>
                        <v-text-field v-model="title" :counter="80" label="Title" required outlined></v-text-field>
                        <v-textarea v-model="description" label="Description" required outlined></v-textarea>
                        <v-file-input label="Promotion Poster" v-model="image" @change="onFilePicked" truncate-length="15" outlined></v-file-input>
                        <img :src="imageURL" height="150"/><br/>
                        <v-text-field v-model="location" label="Location Address" required outlined></v-text-field>
                        <v-menu
                            ref="startMenu"
                            v-model="startMenu"
                            :close-on-content-click="false"
                            :return-value.sync="startDate"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startDate"
                            label="Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="startDate"
                            no-title
                            scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            v-on:click="startMenu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.startMenu.save(startDate)"
                        > OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-menu
                        ref="endMenu"
                        v-model="endMenu"
                        :close-on-content-click="false"
                        :return-value.sync="endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="endDate"
                            label="End Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="endDate"
                            no-title
                            scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="endMenu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.endMenu.save(endDate)"
                        > OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>

                        <v-btn color="success" v-on:click="addActivity" class="mr-4">Submit</v-btn>
                        <v-btn color="error" class="mr-4" v-on:click="reset">Reset Form</v-btn>
                        <v-btn class="mr-4" v-on:click="close">Close</v-btn>
                    </v-form>
                </v-card-text>
            </div>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '../../../firebase.js'
import firebase from "firebase";

export default {
    name: "NewActivityForm",
    data: () => {
        return {
            dialog: false,
            valid: false,
            title: "",
            description: "",
            location: "",
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            startMenu: false,
            endMenu: false,
            image: [],
            imageURL: ""
            
        }
    },
    props: ["companyID"],
    methods: {
        addActivity: async function() {
         
            if (this.title==""|| this.description==""||this.location==""){
                alert("Inputs required in order to add a new activity/");
            } else if (this.endDate < this.startDate) {
                alert("End date must be later than start date")
            } else{

                var k = db.collection("activities").doc().id;

                var activity = {
                    "companyID": this.companyID,
                    "title":this.title,
                    "description": this.description,
                    "location": this.location,
                    "image": [],
                    "startDate": this.startDate,
                    "endDate": this.endDate
                };

                //Putting it in the storage
                try {
                    //Its is place ProductImages => CompanyId => productiD
                    //Reference to the storage
                    var storageRef = firebase.storage().ref("ActivityImages/" + this.companyID + "/" +  k);

                    //Waiting till it uploaded to firebase storage
                    await storageRef.put(this.image);
                    var _extension = this.image.name.split(".")[1];

                    //Update the metadata to be uploaded as image
                    var newMetadata = {
                        contentType: 'image/' + _extension
                    };

                    await storageRef.updateMetadata(newMetadata);

                    //Retrieving the download URL for the product Image
                    await storageRef.getDownloadURL().then(function(url) {
                        activity.image = url.toString();
                    });


                    await db.collection('activities').add(activity).then( () => {
                        console.log("Activity added");
                        alert("Activity added");
                        this.close()
                    });
                } catch (e) {
                    console.log(e)
                }
            }
            
        },
        reset: function()  {
            console.log("reset");
            this.$refs.form.reset();
            this.imageURL="";
            location.reload();
        },
        close: function() {
            console.log("close dialog");
            this.reset();
            this.dialog = false;
        },
        onFilePicked: function() {
        
            var reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onload = () => {
                this.imageURL = reader.result;
            }
        }
    }
}
</script>

<style scoped>

#content {
    padding: 3%
}


</style>