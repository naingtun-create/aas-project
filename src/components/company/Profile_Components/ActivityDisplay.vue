<template>
    <div id ="activityDisplay">
        <ul>
            <li v-for="activity in activities" :key="activity.id">
                <v-card
                    max-width="375"
                    class="mx-auto">
                    <v-img
                    :src="activity.image"
                    height="300px"
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
                        <v-icon color="indigo">mdi-event</v-icon>
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
        ErrorPreventionDialog: ErrorPreventionDialog
    },
    created () {
        this.fetchActivity();
    }
}
</script>

<style scoped>

li {
    list-style: none;
}

</style>