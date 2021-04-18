<template>
    <div id ="contents">
        <v-list-item  v-for="activity in activities" :key="activity.id">
            <div id='box'>
                <img id="images" :src="activity.image" dark>
                <div id="afterimages">
                    <ul>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-domain</v-icon>
                            </v-list-item-icon>
                                <div class="my-4">{{activity.companyname}}</div>
                        </v-list-item>

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
                            <activity-information :itemData="activity"/>
                            <v-btn v-if="routeButton" x-small v-on:click="reroute(activity.companyID)">View Company</v-btn>
                        </v-list-item>
                    </ul>
                </div>
            </div>
        </v-list-item>
    </div>
</template>

<script>
import db from "../../firebase.js";
import ActivityInformation from "./ActivityInformation.vue"

export default {
    name: "ActivityDisplay",
    data: () => {
        return {
            activities: [],
            routeButton: true,
        }
    },
    props: ["companyID"],
    methods: {
        fetchActivity: async function () {
            let activity = {}
            if (this.companyID) {
                this.routeButton = false;
                await db.collection("activities").where("companyID", "==", this.companyID).get().then((docs) => {
                    docs.forEach((doc) => {
                        activity = doc.data();
                        activity.id = doc.id;
                        this.activities.push(activity);
                    })
                })
            } else {
                await db.collection("activities").get().then((docs) => {
                    docs.forEach((doc) => {
                        activity = doc.data();
                        activity.id = doc.id;
                        this.activities.push(activity);
                    })
                })
            }
            this.activities = this.activities.sort(this.compareDates);
            console.log(this.activities)           
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
        reroute: function(companyID) {
            this.$router.push({ name: "viewCompanyPage", params: { id: companyID } });
        }
    },
    components: {
        ActivityInformation: ActivityInformation
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
  height: auto;
  float:left;
  text-align: left;
  width:100%;
}
li {
  margin:30px;
}
ul {
  list-style-type: none;
}
#box{
    margin:40px;
    height:auto;
    border: 5px solid #4ca08b;
    width:100%;
}
p{
    padding-left:20px;
}
#images {
    float:left;
    width:350px;
    height:350px;
}
#afterimages {
    width:70%;
    float:right;
}
</style>