import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

// when use the static this time need to pass the UserModel
const UserScheme = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

//! pre save middle before save
UserScheme.pre('save', async function (next) {
  const user = this; //ref to the doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//! post save middleware after save
UserScheme.post('save', function (doc, next) {
  //  when this data will save this time the pass will empty string
  doc.password = '';
  next();
});

//*2nd make the static method and the function make in the interface
UserScheme.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

// this for check the pass
UserScheme.statics.isPasswordMatched = async function (
  plaintextPass,
  hashedPass,
) {
  return await bcrypt.compare(plaintextPass, hashedPass);
};

export const User = model<TUser, UserModel>('user', UserScheme);
