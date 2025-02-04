import { connectionstr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import User from "@/app/lib/usermodel";
import { deliverypartnerschema } from "@/app/lib/deliverypartnersmodel";
export async function POST(request){
    const payload=await request.json()
    let success=false
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const result=await deliverypartnerschema.findOne({mobile:payload.mobile,password:payload.password})
    if(result){
        success=true
    }

    return NextResponse.json({result,success})
}