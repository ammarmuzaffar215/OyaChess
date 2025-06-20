module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const schema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: false,
        minLength: 2,
        maxLength: 100,
        index: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        maxLength: 150,
        index: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 300,
        index: true,
        trim: true,
      },
      role: {
        type: String,
        enum: ["Student", "Coach", "Admin"],
        default: "Student",
        required: true,
      },
      status: { type: Boolean, default: true },
    },
    {
      timestamps: true,
    }
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
