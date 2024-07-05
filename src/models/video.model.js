import mongoose ,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoschema=new Schema({
    videoFile:{
        type:String, // cloudinary url aaega
        required:true,

    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number, // y bhi cloudinary se hga kyuki jab bhi hm koi video upload krte h toh url k saath us video ka info bhi milta hai jese duration
         required:true
    },
    views:{
        type:Number,
        default:0,

    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

videoschema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video", videoschema)

