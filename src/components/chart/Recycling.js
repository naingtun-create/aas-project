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
            legend: { display: false },
            title: {
              display: true,
              text: 'Resource Conservation: Recycling Rate By Type 2020',
              fontSize:25,
            },
            scales: {
              yAxes: [{ 
                  scaleLabel: {
                        display: true,
                        labelString: "RECYCLING RATE (%)",
                        fontSize:20,
                  }
              }],
              xAxes: [{ 
                  scaleLabel: {
                        display: true,
                        labelString: "Waste Types",
                        fontSize:20,
                  }
              }]
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