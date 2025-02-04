import { connectionstr } from "@/app/lib/db";
import orderschema from "@/app/lib/ordersmodel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    await mongoose.connect(connectionstr, { useNewUrlParser: true });

    const orderobj = new orderschema(payload);
    const result = await orderobj.save();

    if (result) {
      return NextResponse.json({ result, success: true });
    } else {
      return NextResponse.json({ success: false, message: "Order creation failed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  } finally {
    mongoose.connection.close();
  }
}
export async function GET(request) {
  const userid = request.nextUrl.searchParams.get('id');
  await mongoose.connect(connectionstr, { useNewUrlParser: true });
  let result = await orderschema.find({ user_id: userid })
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