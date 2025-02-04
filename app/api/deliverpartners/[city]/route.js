import { connectionstr } from "@/app/lib/db"
import { deliverypartnerschema } from "@/app/lib/deliverypartnersmodel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request,content){
let city=content.params.city
let success=false
await mongoose.connect(connectionstr,{useNewUrlParser:true})
let filter={city:{$regex:new RegExp(city,'i')}}
const result=await deliverypartnerschema.find(filter)
return NextResponse.json({result})
}