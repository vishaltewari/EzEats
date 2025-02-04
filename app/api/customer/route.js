import { connectionstr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

 export async function GET(request,content){
    let queryparams =request.nextUrl.searchParams
    // console.log(queryparams.get('location'))
    let filter={}
    if(queryparams.get('location')){
        let city=queryparams.get('location')
    filter={city:{$regex:new RegExp(city,'i')}} //to make it case insensitive 
    }else if(queryparams.get("restaurant")){
        let name=queryparams.get('restaurant')
    filter={name:{$regex:new RegExp(name,'i')}} //to make it case insensitive 
    }
    await mongoose.connect(connectionstr, {useNewUrlParser: true});

    let result=await restaurantSchema.find(filter)
    return NextResponse.json({success:true,result});
 }