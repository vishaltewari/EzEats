import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionstr } from "@/app/lib/db";

import { restaurantSchema } from "@/app/lib/restaurantsModel";
export async function GET(){
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    let result=await restaurantSchema.find()
     result=result.map((item)=>item?.city?.charAt(0).toUpperCase()+item?.city?.slice(1))  //if some city first letter is lowercase convert to uppercase and slice the rest of the string
     
     result=[...new Set(result.map((item)=>item))]//to eliminate duplicates in city
    return NextResponse.json({result,success:true})
}