const mongoose = require('../config/DBConfig');


const AddressSchema = {
    houseNo:{
        type:String,
        required:[true,'This field is required!']
    },
    area:{
        type:String,
        reqired:[true,'This field is required!']
    },
    city:{
        type:String,
        required:[true,'This field is required!']
    },
    state:{
        type:String,
        required:[true,'This field is required!']
    },
    country:{
        type:String,
        required:[true,'This field is required!']
    },
    pinCode:{
        type:String,
        required:[true,'This field is required!']
    }
};

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    mobileNumber:{
        type:String,
        max:10,
        min:10,
        required:[true,'This field is required!'],
        unique:true
    },
    // countryCode:{
    //     type:String,
    //     required:[true,'This field is required!']
    // },
    email:{
        type:String,
        required:false,
        //unique:true
    },
    isEmailVerified:{
        type:Boolean,
        default:false,
        required:false
    },
    password:{
        type:String,
        required:[true,'This field is required!'],
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:false
    },
    isUser:{
        type:Boolean,
        default:false,
        required:false
    },
    isEmployee:{
        type:Boolean,
        default:false,
        required:false
    },
    isRetailer:{
        type:Boolean,
        default:false,
        required:false
    },
    address:{
        type:AddressSchema,
        required:false
    },
    profileImg:{
        type:String,
        required:false
    },
    isOnline:{
        type:Boolean,
        required:false,
        default:false
    },
    isActive:{
        type:Boolean,
        reqired:false,
        default:false
    }
},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
});

UserSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        // ret.id = ret['_id']
        // delete ret['_id']
        return ret
    }
})

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;