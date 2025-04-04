import { Webhook } from "svix";
import User from "../models/user.js";
//API controller function

export const clerkWebhook = async (req, res) => {
    try{

        //create a new webhook instance
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);   
        //verify the webhook signature
        await webhook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        //getting data from request body

        const {data,type}  = req.body
        //switch case for diff events
        switch (type){
            case 'user.created':{
                const userData ={
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " +data.last_name,
                    image:data.image_url,
                    resume: ''
                }
                await User.create(userData)
                console.log("User Created")
                res.json({})
                break;

            }
            case 'user.updated':{
                const userData ={
                    email: data.email_addresses[0].email_addresses,
                    name: data.first_name + " " +data.last_name,
                    image:data.image_url,
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
                
            }
            default:{
                break
            }
        }

    } catch (error){
        console.log(error.message  );
        res.json({succes:false,message:"WebHooks Error"})
        
    }
}