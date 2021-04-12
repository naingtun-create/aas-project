<template>
    <div id ="contents">
        <ul>
            <li v-for="activity in activities" :key="activity.id">
                <v-card
                    max-width="1000"
                    class="mx-auto">
                    <div id="images">
                    <v-img
                    :src="activity.image"
                    height="400"
                    dark
                >
                    </v-img>
                    <div id="afterimages">
                    <v-list>
                    <v-list-item >
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-subtitles</v-icon>
                        </v-list-item-icon>
                        <div class="my-4">{{activity.title}}</div>
                    </v-list-item>
                    <v-divider inset></v-divider>

                    <v-list-item >
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-message-bulleted</v-icon>
                        </v-list-item-icon>
                        <div class="my-4 subtitle-2">{{activity.description}}</div>
                    </v-list-item>
                    <v-divider inset></v-divider>

                    <v-list-item >
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-bookmark</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <div class="my-4 subtitle-3">{{activity.startDate}}</div>
                        <v-list-item-subtitle>Start Date</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-content>
                        <div class="my-4 subtitle-3">{{activity.endDate}}</div>
                        <v-list-item-subtitle>End Date</v-list-item-subtitle>
                        </v-list-item-content>                        
                    </v-list-item>
                    <v-divider inset></v-divider>

                    <v-list-item >
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-map-marker</v-icon>
                        </v-list-item-icon>
                        <div class="my-4 subtitle-1">{{activity.location}}</div>
                    </v-list-item>



                    <v-list-item>


                        <v-list-item-content>
                        <v-list-item-title>{{activity.location}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                    </div>
                    </div>
                    </v-card>
            </li>
        </ul>
    </div>
</template>

<script>
import db from "../../../firebase.js";
//import ErrorPreventionDialog from "./ErrorPreventionDialog.vue"
//import ActivityInformation from "./ActivityInformation.vue"

export default {
    name: "ActivityDisplay",
    data: () => {
        return {
            activities: [],
        }
    },
    props: ["companyID"],
    methods: {
        fetchActivity: async function () {
            let activity = {}
            await db.collection("activities").where("companyID", "==", this.companyID).get().then((docs) => {
                docs.forEach((doc) => {
                    activity = doc.data();
                    activity.id = doc.id;
                    this.activities.push(activity)

                })
            }) 

            console.log(this.activities)
            
        },
        deleteActivity: async function(id) {

            await db.collection("activities").doc(id).delete()


        }
    },
    components: {
        //ErrorPreventionDialog: ErrorPreventionDialog,
        //ActivityInformation: ActivityInformation
    },
    created () {
        this.fetchActivity();
    }
}
</script>

<style scoped>
#contents {
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    float:left;
    text-align: left;
}
li {
    margin:50px;
}
ul {
    list-style-type: none;
    margin:0px;
}

#images {
    display:flex;
    width:50%;
    height:400px;
}
#afterimages {
    display:flex;
    width:100%;
}
</style>