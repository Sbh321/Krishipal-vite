import mongoose from "mongoose";

const connectDB = async (retryCount = 3) => {
  let attempt = 1;

  const connectWithRetry = async () => {
    try {
      const connectionInstance = await mongoose.connect(
        `${process.env.MONGODB_URL}`
      );

      console.log(
        `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
      );
    } catch (error) {
      console.error(`MONGODB connection attempt ${attempt} failed:`, error);

      if (attempt < retryCount) {
        console.log(
          `Retrying MongoDB connection (attempt ${
            attempt + 1
          } of ${retryCount})...`
        );
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        await connectWithRetry(); // Recursive call to retry connection
      } else {
        console.error(`Max retry attempts (${retryCount}) reached. Exiting...`);
        process.exit(1);
      }
    }
  };

  await connectWithRetry();
};

export default connectDB;
