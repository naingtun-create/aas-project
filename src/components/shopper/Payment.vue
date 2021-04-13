<template>
    <div id = "PaymentPage">
      <shopper-header></shopper-header>
        <nav>
        <v-card size="1000" id="order">
            <v-container>
                <ul>
                <li v-for="(item,id) in items" :key="id">
                  <div class="d-lg-flex flex-no-wrap" >
                    <v-avatar class="ma-3" size="200" tile>
                      <v-img height="200" v-bind:src="item.image"></v-img>
                    </v-avatar>
                    <div id="productInfo">
                      <h1>{{item.title}}</h1>
                      <p v-for = "color in item.colors" :key="color.id">Color: {{color[0]}} | Quantity: {{color[1]}} | Size: {{color[2]}}</p>
                      <p id="cost"><b>Cost: ${{item.totalPrice}}</b></p>
                      <v-btn id="delete" class="ml-2 mt-5" color = "#4000ff" outlined x-large @click="deleteItem(item.cartID, item.id, item.totalPrice)">Delete</v-btn>    
                    </div>
                  </div><br>
                  <v-divider width="60%"></v-divider>     
                </li>
                    
                </ul>
                <p id="subtotal" > SUBTOTAL:${{this.subtotal}}</p>
            </v-container>
        </v-card>
        </nav>
        <div id="contents">
            <img src = "../../assets/payment_code.png" width = "350px" >
            <p>Please scan the QR code</p> 
            <p>Pay the required amount as stated in the subtotal</p>
            <NewPaymentForm v-bind:paidPrice = "subtotal" v-bind:paidItems = "items"></NewPaymentForm>
            
        </div>
    </div>
</template>

<script>
import db from '../../firebase.js'
import firebase from 'firebase'
import NewPaymentForm from './NewPaymentForm.vue'

export default {
  name: 'OnlineMarketPlacePage',
  data(){
    return{
        items:[],
        subtotal:0,
        absent:true,
        productInfo:[],  
    }
  },
  components: {
      NewPaymentForm: NewPaymentForm,
  },
  methods:{
    fetchItems:function(){
      var user = firebase.auth().currentUser;
      db.collection('cart').doc(user.uid).get().then(doc => {
        var product = {
          colors: [],
          title: '',
          image: '',
          id: '',
          totalPrice: 0,
          cartID:[],
          companyID:'',
          completed:false,
        }
        var details = []
        details = doc.data()

        for(var info in details){   
          for(var item in this.items){
            if(details[info].id == this.items[item].id){
              if(details[info].size == ""){
                this.items[item].colors.push([details[info].color, details[info].qty,'Not Applicable'])
              } else {
                this.items[item].colors.push([details[info].color, details[info].qty, details[info].size])            
              }
              this.items[item].totalPrice += details[info].price * details[info].qty
              this.subtotal += details[info].price * details[info].qty
              this.items[item].cartID.push(info)
              this.absent = false
              break   
            } else{
              this.absent = true
            } 
          }
          if(this.absent == true){
            if(details[info].size == ""){
              product.colors.push([details[info].color, details[info].qty, 'Not Applicable'])
            } else{
              product.colors.push([details[info].color, details[info].qty, details[info].size])
            }        
            product.id = details[info].id
            product.totalPrice += details[info].price * details[info].qty
            this.subtotal += details[info].price * details[info].qty
            product.cartID.push(info)
            this.items.push(product)
            product = {
              colors: [],
              title: '',
              image: '',
              id: '',
              totalPrice: 0,
              cartID:[],
              companyID:'',
              //completed:false,
            }
          }

        }this.subtotal= this.subtotal.toFixed(2)

        db.collection('products').get().then(snapshot => {
            let good = {}
            snapshot.docs.forEach(doc => {
                good = doc.data();
                this.productInfo.push([doc.id, good])
            });
        for(var pdt in this.items){
          for(var goods in this.productInfo){
            if(this.items[pdt].id == this.productInfo[goods][0]){
              this.items[pdt].image = this.productInfo[goods][1].image              
              this.items[pdt].title = this.productInfo[goods][1].title
              this.items[pdt].companyID = this.productInfo[goods][1].company
              //console.log(this.items) 
              break
            }
          }
        }
 
        });
      });
    },
    deleteItem:function(cart_id, pdt_id, price){
      var user = firebase.auth().currentUser;
      console.log(cart_id)
      for(var id of cart_id){
        db.collection('cart').doc(user.uid).update({         
          [id]: firebase.firestore.FieldValue.delete()
        });
      }
      this.filterList = this.items.filter((itemf) => itemf.id != pdt_id)
      this.subtotal -= price
      this.subtotal= this.subtotal.toFixed(2)
      this.items = this.filterList
      
    },   
    
  },


  created(){this.fetchItems()},

}
</script>

<style scoped>
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 500px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  width:1300px;
}
nav {
    float: left;
    width: 60%;
    padding:15px; 
    height: 1000px; 
    margin-top:10px;
    margin-left:10px;
}
#content {
    float: right;
    padding: 15px; 
    width: 45%;
    background-color: #FFFAF0;
    height: 1000px; 
}  
p{
  font-family: "Courier New", Times, serif;
  color:"black";
  font-size: 15px;
  font-weight: bold;
}
#subtotal{
    font-size: 20px;
    text-align:end;
    padding-right:100px;
    color:lightcoral;
}
#productInfo {
  padding-left:80px;
  text-align: start;
  
}

h1{
  font-size: 20px;
  font-family: "Copperplate", Times, serif;
  padding-bottom: 15px;
  color:"#A52A2A";
}

#delete {
  left: 300px;
}

#cost {
  color:red;
  font-weight: bolder;
}
#order{
  border: 2px solid #c9AA88;
}
</style>