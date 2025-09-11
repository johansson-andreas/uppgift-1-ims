import { faker } from '@faker-js/faker';

const createRandomUsers = (amount: number) => {
    const users = []
    while(users.length < amount) {
        users.push({

        name: faker.internet.username(),
        email: { type: String, unique: true, required: true},
        phone: { type: String, unique: true, required: true}
        })
    }
}