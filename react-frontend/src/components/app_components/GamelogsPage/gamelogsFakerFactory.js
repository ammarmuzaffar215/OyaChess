
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
opponentName: faker.lorem.sentence(1),
openingName: faker.lorem.sentence(1),
notation: faker.lorem.sentence(1),
date: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
