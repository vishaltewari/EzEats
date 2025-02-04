import { connectionstr } from "@/app/lib/db"
import { deliverypartnerschema } from "@/app/lib/deliverypartnersmodel"
import User from "@/app/lib/usermodel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    const payload=await request.json()
    let success=false
    await mongoose.connect(connectionstr, { useNewUrlParser: true, useUnifiedTopology: true })
    const user=new deliverypartnerschema(payload)
    const result=await user.save()
    if(result){
        success=true
    }
    return NextResponse.json({result,success}) 
}