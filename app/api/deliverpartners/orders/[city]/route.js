import { connectionstr } from "@/app/lib/db";
import orderschema from "@/app/lib/ordersmodel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request,content) {
    const id = content.params.id
    await mongoose.connect(connectionstr, { useNewUrlParser: true });
    let result = await orderschema.find({ deliverypartner_id: id })
    let success = false
    if (result) {
      let restodata = await Promise.all(result.map(async (item) => {
        let restoinfo = {}
        restoinfo.data = await restaurantSchema.findOne({ _id: item.resto_id })
        restoinfo.amount =item.amount
        restoinfo.status=item.status
        return restoinfo
      }))
      
      result=restodata
      success = true
    }
  
    return NextResponse.json({ result,success })
  }