
    module.exports = function (app) {
        const modelName = 'gamelogs';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId },
opponentName: { type:  String , required: true },
openingName: { type:  String , required: true },
notation: { type:  String , maxLength: 150, index: true, trim: true },
date: { type: Date, required: false },

            
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