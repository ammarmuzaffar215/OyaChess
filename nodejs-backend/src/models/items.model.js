module.exports = function (app) {
  const modelName = "items";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const schema = new Schema(
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
      description: { type: String },
      qty: { type: Number, required: false, max: 10000000 },
      price: { type: Number, required: false, max: 10000000 },
      discount: { type: Number, required: false, max: 10000000 },
      imageUrl: { type: String },
      productLink: { type: String },
      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }

  return mongooseClient.model(modelName, schema);
};
