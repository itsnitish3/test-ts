import mongoose, { ObjectId } from 'mongoose';

interface UserAttrs {
    email: string;
    fullName: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    id: ObjectId;
    email: string;
    fullName: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

userSchema.pre('save', async function (done) {
    done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
