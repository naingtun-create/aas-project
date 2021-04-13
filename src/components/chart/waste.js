import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
                { 
                    type:"line",
                    data: [],
                    fill:false,
                    borderColor:"blue",
                    label:"Waste Disposal"
                },
                { 
                    type:"line",
                    data: [],
                    borderColor:"green",
                    backgroundColor:"Cornsilk",
                    label:"Waste Recycling"
            
                },
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'Annual Waste Disposal vs Recycling in Singapore',
              fontSize:25,
            },
            scales: {
                yAxes: [{ 
                    scaleLabel: {
                          display: true,
                          labelString: "Millon Tonnes",
                          fontSize:20,
                    }
                }],
                xAxes: [{ 
                    scaleLabel: {
                          display: true,
                          labelString: "Year",
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
        axios.get(`https://data.gov.sg/api/action/datastore_search?resource_id=7918b229-0e79-4d74-b725-e34183a56c01&limit=15`)
        .then(response => {
            var records = response.data.result.records
            for(var i = 0; i < records.length; i++){
                this.datacollection.labels.push((parseInt(records[i].year) + 6).toString())
                this.datacollection.datasets[0].data.push(records[i].waste_disposed_of)
                this.datacollection.datasets[1].data.push(records[i].waste_recycled)
            }

            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}