const bcrypt=require('bcryptjs');

const UserModel=require('../../models/user');

module.exports={
    createUser: async (args)=>{
        try{
            const isUser=await UserModel.findOne({ email:args.userInput.email });
            if(isUser){
                throw new Error('User already registered');
            }
            
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new UserModel({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();
            console.log(result);
            return { ...result._doc, password: null, _id: result.id };
        }catch(err){
            throw err;
        }
    }
}