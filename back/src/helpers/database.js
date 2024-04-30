import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.URI_SECOUR}${process.env.DB_SECOUR}` || '');
        console.log(`MongoDB Connected...`);

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
