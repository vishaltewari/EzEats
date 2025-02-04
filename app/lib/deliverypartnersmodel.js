const mongoose = require("mongoose");

const deliverypartnersmodel= new mongoose.Schema({
    name:String,
    mobile:String,
    password:String,
    city:String,
    address:String,
   
});
export const deliverypartnerschema=mongoose.models.deliverypartners || mongoose.model('deliverypartners', deliverypartnersmodel);