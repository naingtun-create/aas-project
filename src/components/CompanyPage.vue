<template>
    <div id="companyPage">
    <v-dialog
      v-model="dialog"
      persistent
      width="500">
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>
        <NewProductForm></NewProductForm>
    </v-dialog>
    </div>
</template>

<script>
import NewProductForm from './NewProductForm.vue'

export default {
    name: "companyPage",
    data: () => {
        return {
            dialog: false
        }
    },
    components: {
        NewProductForm: NewProductForm
    }
}
</script>
