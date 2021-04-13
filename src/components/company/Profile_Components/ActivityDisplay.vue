<template>
    <div id ="contents">
        <ul>
            <li v-for="activity in activities" :key="activity.id">
                <v-card
                    max-width="350"
                    class="mx-auto">
                    <v-img
                    :src="activity.image"
                    height="300"
                    dark
                >
                    </v-img>

                    <v-list two-line>
                    <v-list-item>
                        
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-message-bulleted</v-icon>
                        </v-list-item-icon>

                        <v-list-text>
                        
                        <div class="my-4 subtitle-1">
                            {{activity.title}}
                        </div>
                        <div class="my-4 subtitle-2">{{activity.description}}</div>
                        </v-list-text>

                    </v-list-item>

                
                    <v-divider inset></v-divider>

                    <v-list-item >
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-bookmark</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>{{activity.startDate}}</v-list-item-title>
                        <v-list-item-subtitle>Start Date</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item >
                        <v-list-item-action></v-list-item-action>

                        <v-list-item-content>
                        <v-list-item-title>{{activity.endDate}}</v-list-item-title>
                        <v-list-item-subtitle>End Date</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item>
                        <v-list-item-icon>
                        <v-icon color="indigo">mdi-map-marker</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>{{activity.location}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>

                    <v-divider inset></v-divider>

                    <v-list-item>
                        <v-list-item-content>
                            <error-prevention-dialog :itemName="activity.title" :itemID="activity.id" type="activities"/>
                            <activity-information :itemData="activity"/>
                        </v-list-item-content>
                    </v-list-item>
                    
                </v-card>
            </li>
        </ul>
    </div>
</template>

<script>
import db from "../../../firebase.js";
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
        ErrorPreventionDialog: ErrorPreventionDialog,
        ActivityInformation: ActivityInformation
    },
    created () {
        this.fetchActivity();
    }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 250px;
  text-align: center;
  padding: 10px;
  margin: 20px;
}
.v-card--reveal {
  align-items: flex-start;
  bottom: 0;
  justify-content: flex-start;
  opacity: 0.5;
  position: absolute;
  width: 100%; 
}
#productTitle {
  font-family: "Lucida Console", Times, serif;
  font-size: 15px;
  text-align:start;
  padding:10px;
}
p {
  text-align:start;
  padding-left:10px;
}
#description {
  font-family: "Lucida Console", Times, serif;
  font-size: 13px;
  text-align:start;
  margin-top:-5px;
}
</style>