import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function clearUserDatabase() {
	await prisma.user.deleteMany()
}

async function createUser() {
	const user = await prisma.user.create({
		data: {
			firstName: 'BullDog',
			lastName: 'Kubwa',
			password: 'Leonardo da Vinci',
			email: 'bulldog@gmail.com'
		}
	})

	return user;
}

beforeEach(() => {
	return clearUserDatabase()
})

test('User is created successfully, given all required data', async () => {
	const user = await createUser()
	expect(user.firstName).toBe('BullDog')
})

test('User has attribute profilePhoto', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('profilePhotoUrl')
})

test('User has attribute birthday', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('birthday')
})

test('User has attribute id', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('id')
})

test('User has attribute createdAt', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('createdAt')
})

test('User has attribute updatedAt', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('updatedAt');
})

test('User has attribute profilePhotoUrl', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('profilePhotoUrl')
})

test('User has attribute firstName', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('firstName')
})

test('User has attribute lastName', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('lastName')
})

test('User has attribute email', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('email')
})

test('User has attribute password', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('password')
})

test('User has attribute phoneNumber', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('phoneNumber')
})

test('User has attribute houseName', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('houseName')
})

test('User has attribute houseNumber', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('houseNumber')
})

test('User has attribute town', async () => {
	const user = await createUser();
	expect(user).toHaveProperty('town')
})