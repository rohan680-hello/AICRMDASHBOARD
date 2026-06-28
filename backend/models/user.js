import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true, 
    select: false // SECURITY: This hides the password from database queries by default
  },
  company: { 
    type: String 
  },
  avatar: { 
    type: String, 
    default: '' 
  },
  role: { 
    type: String, 
    enum: ['owner', 'member'], 
    default: 'owner' 
  }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

// Pre-save hook: Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  // Only run this if the password was actually modified (or is brand new)
  if (!this.isModified('password')) return next();
  
  // Create salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Helper method: Compare entered password with hashed password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);