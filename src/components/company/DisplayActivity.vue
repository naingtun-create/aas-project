<template>
    <div id="displayactivity">
        <div id ="contents">
            <v-list-item  v-for="activity in activities" :key="activity.id">
                <div id='box'>
                    <img id="images" :src="activity.image" dark>
                    <div id="afterimages">
                        <ul>
                            <v-list-item>
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
                            <v-list-item>
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
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="indigo">mdi-map-marker</v-icon>
                                </v-list-item-icon>
                                <div class="my-4 subtitle-1">{{activity.location}}</div>
                            </v-list-item>
                            <v-list-item>
                                <error-prevention-dialog :itemName="activity.title" :itemID="activity.id" type="activities"/>
                                <activity-information :itemData="activity"/>
                            </v-list-item>
                        </ul>
                    </div>
                    </div>
            </v-list-item>
        </div>
    </div>
</template>

<script>
import db from "../../firebase.js";
import ErrorPreventionDialog from "./ErrorPreventionDialog.vue"
import ActivityInformation from "./ActivityInformation.vue"

export default {
    name: "ActivityDisplay",
    data: () => {
        return {
            activities: [],
        }
    },
    props: ["companyID"],
    methods: {
        fetchActivity: async function() {
            let activity = {};
            await db.collection("activities").where("companyID", "==", this.companyID).get().then((docs) => {
                docs.forEach((doc) => {
                    activity = doc.data();
                    activity.id = doc.id;
                    this.activities.push(activity);
                })
            }) 
            this.activities = this.activities.sort(this.compareDates);
        },
        deleteActivity: async function(id) {
            await db.collection("activities").doc(id).delete();
        },
        compareDates: function(a, b) {
            if (a.timestamp > b.timestamp) {
                return -1;
            } else if (a.timestamp < b.timestamp) {
                return 1;
            } else {
                return 0;
            }
        },
    },
    components: {
        ErrorPreventionDialog: ErrorPreventionDialog,
        ActivityInformation: ActivityInformation
    },
    created() {
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
    width:100%;
    text-align: left;
}
li {
    margin:30px;
}
ul {
    list-style-type: none;
}
#box{
    width:100%;
    margin:40px;
    height:auto;
    border: 5px solid #4ca08b;
    
}
p{
    padding-left:20px;
}
#images {
    float:left;
    width:330px;
    height:330px;
}
#afterimages {
    width:70%;
    float:right;
}
</style>