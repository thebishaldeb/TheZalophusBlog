const BlogModel=require('../../models/blog');

module.exports={
    blogs:async (args, request)=>{
        if(!request.isAuth){
            console.log("Error");
            throw new Error("Unauthenticated");
        }
        try{
            const result=[
                { _id:1, title:"1", image:"1",body:"1", creator:"2", created:"2" }
            ]
            return result
        }catch(err){
            console.log(err);
        }
    }
}