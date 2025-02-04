import { connectionstr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import { restaurantSchema } from "@/app/lib/restaurantsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request,content){
    console.log(content.params.id)//in local console
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const details = await restaurantSchema.findOne({_id:content.params.id}) 
    const fooditems=await foodSchema.find({resto_id:content.params.id})
    return NextResponse.json({success:true,details,fooditems})

}