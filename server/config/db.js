import mongoose  from "mongoose";

 const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL, 
        //     {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }
        );
        console.log(`Mongodb connected: ${connect.connection.host}`)
    } catch (error) {
      console.log(`Error: ${error.message}`);
        process.exit();
    }
};

export default connectDB;