import mongoose from "mongoose";
import { connectionstr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionstr, { useNewUrlParser: true });
    const data = await restaurantSchema.find();
    console.log(data);

    return NextResponse.json({ result: data});
}
export async function POST(request){
    let payload=await request.json()
    let result
    // console.log(payload)
    let success=false
    await mongoose.connect(connectionstr, { useNewUrlParser: true });
    if(payload.login){ //for login
        result=await restaurantSchema.findOne({email:payload.email,password:payload.password})
        if(result){  //if email and password matched same as database then succes will be true otherwise false indicating login failed
            success=true
        }
    }
    else{  //for signup
        let restaurant = new restaurantSchema(payload);
         result=await restaurant.save()
         if(result){  
            success=true
        }
    }
    
    return NextResponse.json({ result,success});
}