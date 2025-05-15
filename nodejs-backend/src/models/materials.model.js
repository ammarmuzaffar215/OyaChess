
    module.exports = function (app) {
        const modelName = 'materials';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            title: { type:  String , required: true },
packageId: { type: Schema.Types.ObjectId, ref: "packages" },
videoUrl: { type:  String , required: true },
materials: { type:  [Schema.Types.ObjectId], ref: "document_storages" , required: true },

            
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