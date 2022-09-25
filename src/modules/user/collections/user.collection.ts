import * as mongoose from 'mongoose';

const modelName = 'User';
const collectionName = 'user_profile';
const userProfile = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
};

const UserProfile = new mongoose.Schema(userProfile, { strict: true });

export default {
    modelName,
    collectionName,
    schema: UserProfile,
};
