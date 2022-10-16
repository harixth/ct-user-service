import { model, Schema } from "mongoose";

export const MONGODB_URL =
  "mongodb+srv://altruist:XWQvOM56LJB49Iqd@user.xk1ho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// 1. Create an interface representing a document in MongoDB.
export interface User {
  userId: string;
  name: string;
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema = new Schema<User>({
  userId: { type: "String", unique: true },
  name: String,
});

// 3. Create a Model.
const UserModel = model<User>("User", UserSchema);

export default UserModel;
