import mongoose from 'mongoose'
const connect=()=>{
  mongoose.connect(
    ``,
    {   useNewUrlParser: true,
        // useCreateIndex:true,
        useUnifiedTopology: true
        // useFindAndModify:false
    },
      (err)=>{
        if(err)console.log("Error connecting to MongoDB",err);
        else console.log("Connected to MongoDB");
    }
  );
}

export default connect;