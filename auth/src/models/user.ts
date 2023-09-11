import mongoose, { Schema, model } from 'mongoose';
import { Password } from '../utils/password';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  // Mutate the view of returning document representation
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    },
  }
});

// An interface that define User document
interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Workaround to add build() static function into User Model
interface IUserModel extends mongoose.Model<IUserDoc> {
  build(user: IUser): IUserDoc;
}

// Encrypt password before saving in database
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
}

const User = model<IUserDoc, IUserModel>('User', userSchema);

export { User };