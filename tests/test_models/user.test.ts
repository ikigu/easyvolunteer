import { PrismaClient } from "@prisma/client";
import { after } from "node:test";

const prisma = new PrismaClient()

async function clearDatabase() {
	await prisma.user.deleteMany();
	await prisma.$disconnect();
}

async function initializeUserDatabase() {
	await prisma.user.deleteMany();


	await prisma.user.create({
		data: {
			firstName: 'Alfrida',
			lastName: 'Aluoch',
			password: 'Leonardo da Vinci',
			email: 'Alfrida1@gmail.com'
		}
	})
}

beforeEach(() => {
	return initializeUserDatabase();
});
afterEach(() => {
	return clearDatabase();
});

test('User is created successfully, given all required data', async () => {
	const user = await prisma.user.findFirst();
	expect(user?.firstName).toBe('Alfrida')
})

test('User has attribute profilePhoto', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('profilePhotoUrl')
})

test('User has attribute birthday', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('birthday')
})

test('User has attribute id', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('id')
})

test('User has attribute createdAt', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('createdAt')
})

test('User has attribute updatedAt', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('updatedAt');
})

test('User has attribute profilePhotoUrl', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('profilePhotoUrl')
})

test('User has attribute firstName', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('firstName')
})

test('User has attribute lastName', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('lastName')
})

test('User has attribute email', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('email')
})

test('User has attribute password', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('password')
})

test('User has attribute phoneNumber', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('phoneNumber')
})

test('User has attribute houseName', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('houseName')
})

test('User has attribute houseNumber', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('houseNumber')
})

test('User has attribute town', async () => {
	const user = await prisma.user.findFirst();
	expect(user).toHaveProperty('town')
})