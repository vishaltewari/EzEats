import { connectionstr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(request,content) {
    const id=content.params.id;
    // console.log(id);
let success=false;
await mongoose.connect(connectionstr, { useNewUrlParser: true });
const result=await foodSchema.find({resto_id:id});
if(result){

    success=true
}else{
    success=false
}
    return NextResponse.json({ result,success});

}
export async function DELETE(request,content) {
    const id=content.params.id
    let success=false
    await mongoose.connect(connectionstr, { useNewUrlParser: true });
    const result=await foodSchema.deleteOne({_id:id});
    if(result.deletedCount>0){ 
        success=true
    }
    return NextResponse.json({ result,success});
}