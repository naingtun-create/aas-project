<template>
    <v-row justify="space-around">
        <v-col cols="auto">
            <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600" persistent>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn x-small v-bind="attrs" v-on="on">Learn more</v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar color="#4ca08b" dark>{{itemData.title}}</v-toolbar>
                        <br />
                        <v-card-text>
                            <v-card-actions>
                                <h4 class="title">Description</h4>
                                <v-spacer></v-spacer>
                                <v-btn icon @click="show = !show">
                                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <h4 class="title">Company Name</h4>
                            <a id='titlecompany' v-on:click="reroute">{{itemData.companyname}}</a>
                            <v-divider></v-divider>
                            <v-expand-transition>
                                <div v-show="show">
                                    <v-card-text>{{itemData.description}}</v-card-text>
                                </div>
                            </v-expand-transition>
                            <h4 class="title">Start Date</h4>
                            {{itemData.startDate}}
                            <v-divider></v-divider>
                            <h4 class="title">End Date</h4>
                            {{itemData.endDate}}
                            <v-divider></v-divider>
                            <h4 class="title">Location</h4>
                            {{itemData.location}}
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="dialog.value = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>

export default {
    props: ["itemData"],
    data() {
        return {
            dialog: false,
            show: false
        };
    },
    methods: {
        toggleDialog: function() {
            this.dialog = !this.dialog;
        },
        reroute: function() {
            var companyID = this.itemData.companyID;
            this.$router.push({ name: "viewCompanyPage", params: { id: companyID } });
        }     
    }
};
</script>

<style scoped>
* {
  text-align: left;
}
#titlecompany{
    color:#4ca08b;
}
</style>