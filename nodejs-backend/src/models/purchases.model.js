
    module.exports = function (app) {
        const modelName = 'purchases';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId, ref: "users" },
itemId: { type: Schema.Types.ObjectId, ref: "items" },
qty: { type: Number, required: false, max: 10000000 },
total: { type: Number, required: false, max: 10000000 },
timestamp: { type: Date, required: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };