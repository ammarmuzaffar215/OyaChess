import { faker } from "@faker-js/faker";
export default (user, count, userIdIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      puzzleId: faker.datatype.boolean("8"),
      userId: userIdIds[i % userIdIds.length],
      result: faker.datatype.boolean(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
