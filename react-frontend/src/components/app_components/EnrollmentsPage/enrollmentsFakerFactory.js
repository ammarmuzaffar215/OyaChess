
import { faker } from "@faker-js/faker";
export default (user,count,packageIdIds,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
packageId: packageIdIds[i % packageIdIds.length],
userId: userIdIds[i % userIdIds.length],
progress: faker.lorem.sentence(1),
schedule: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
