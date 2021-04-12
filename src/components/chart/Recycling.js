import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label: "RECYCLING RATE (%)",
                backgroundColor:['red','orange','yellow','purple','blue','aqua','green','brown','lightgreen','grey','Coral'],
                data: []
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'Resource Conservation: Recycling Rate By Waste Type 2020'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://data.gov.sg/api/action/datastore_search?resource_id=4d83d0be-55ba-46de-8430-2ff708fede5c&limit=11`)
        .then(response => {
            var materials = response.data.result.records
            //console.log(materials);
            for(var i = 0; i < materials.length; i++){
                this.datacollection.labels.push(materials[i].waste_type)
                //console.log(materials[i].waste_type);
                this.datacollection.datasets[0].data.push(materials[i].recycling_rate)
            }
            //console.log(this.datacollection);

            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}