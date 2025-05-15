
    module.exports = function (app) {
        const modelName = 'enrollments';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            packageId: { type: Schema.Types.ObjectId, ref: "packages" },
userId: { type: Schema.Types.ObjectId, ref: "users" },
progress: { type:  String , required: true },
schedule: { type: [Date], required: false },

            
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