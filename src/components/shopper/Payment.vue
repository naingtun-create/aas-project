<template>
    <div id = "PaymentPage">
      <shopper-header></shopper-header>
        <nav>
        <v-card size="1000" id="order">
            <v-container>
                <ul>
                <li v-for="(item,id) in items" :key="id">
                  <div class="d-lg-flex flex-no-wrap">
                    <v-avatar position='static' size="10vw" tile>
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
          <v-dialog v-model="uploadDialog" transition="dialog-top-transition" max-width="600" persistent >
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="#c9AA88" dark>How to get invoice number?</v-toolbar>
                <br>
                <v-card-text>
                  <p> After making payment: </p><br>
                  <p> Step 1: Click on History tab</p>
                  <img
                    src="../../assets/paylah-step1.jpeg"
                    height="280" width="150"
                  ><br><br>
                <p> Step 2: Click on the Payment made to AAS</p>
                  <img
                    src="../../assets/paylah-step2.png"
                    height="200" width="160"
                  ><br><br>
                  <p> Step 3: Retrieve the Transaction Ref No.</p><br>
                  <img
                    src="../../assets/paylah-step3.jpg"
                    height="320" width="290"
                  >  
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn id='upload' text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

            <img src = "../../assets/payment_code.png" width = "350px" >
            <p>Please scan the QR code</p> 
            <p>Pay the required amount as stated in the subtotal</p>
            <div class='rowC'>
            <NewPaymentForm  v-bind:paidPrice = "subtotal" v-bind:paidItems = "items"></NewPaymentForm>
            <button  v-on:click="toggleUploadDialog">How to get invoice number</button>
            </div>
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
        uploadDialog: false,
    }
  },
  components: {
      NewPaymentForm: NewPaymentForm,
  },
  close: function() {
    this.uploadDialog = false;
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
              completed:false,
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
    toggleUploadDialog: function() {
      this.uploadDialog = !this.uploadDialog;
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
button {
  height: 40px;
  width:20%;
  background-color: #4000ff;
  border-radius: 10px;
  font-weight: bold;
  color:white;
  border: 10px solid #4000ff;
  border-width: 1px;
  text-align:center;
  margin-left:2.8vw;
  margin-top:1.8vw;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8vw;
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
  position:relative;
}
#upload{
  width:150px;
}
.rowC{
  padding-left:5.5vw;
  align-content: center;
  display:flex; 
  
  flex-direction:row;
  
  }
</style>