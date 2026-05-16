import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    email: string;
    password?: string;
    name: string;
    role: 'landlord' | 'admin' | 'tenant';
    isActive: boolean;
    subscription: 'free' | 'starter' | 'professional' | 'business' | 'enterprise';
    subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
    subscriptionPeriod?: 'monthly' | 'yearly';
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
    subscriptionCanceledAt?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['landlord', 'admin', 'tenant'],
        default: 'landlord',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    subscription: {
        type: String,
        enum: ['free', 'starter', 'professional', 'business', 'enterprise'],
        default: 'free',
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'canceled', 'past_due', 'trialing', 'incomplete'],
        default: 'active',
    },
    subscriptionPeriod: {
        type: String,
        enum: ['monthly', 'yearly'],
    },
    subscriptionStartDate: {
        type: Date,
    },
    subscriptionEndDate: {
        type: Date,
    },
    subscriptionCanceledAt: {
        type: Date,
    },
    stripeCustomerId: {
        type: String,
        sparse: true,
        unique: true,
    },
    stripeSubscriptionId: {
        type: String,
        sparse: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre<IUser>('save', async function () {
    if (this.isModified('password')) {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    this.updatedAt = new Date();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
