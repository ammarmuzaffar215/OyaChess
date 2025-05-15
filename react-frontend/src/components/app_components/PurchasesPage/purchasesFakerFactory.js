
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds,itemIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userId: userIdIds[i % userIdIds.length],
itemId: itemIdIds[i % itemIdIds.length],
qty: faker.lorem.sentence(1),
total: faker.lorem.sentence(1),
timestamp: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
