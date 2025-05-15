
import { faker } from "@faker-js/faker";
export default (user,count,packageIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
title: faker.lorem.sentence(1),
packageId: packageIdIds[i % packageIdIds.length],
videoUrl: faker.lorem.sentence(1),
materials: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
