import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function clearDatabase() {
	await prisma.user.deleteMany()
	await prisma.organization.deleteMany()
	await prisma.event.deleteMany()
	await prisma.eventAttendee.deleteMany()
}

async function closeDatabase() {
	await prisma.$disconnect()
}

async function createEventAttendee(role: string) {
	const user = await prisma.user.create({
		data: {
			firstName: 'Alicia',
			lastName: 'Kamencu',
			password: '#@!$#1dk __a&!',
			email: 'alicia.@gmail.com'
		}
	})

	let volunteer: any;

	if (role === 'volunteer') {
		volunteer = await prisma.user.create({
			data: {
				firstName: 'Volunteer',
				lastName: 'Bureti',
				password: '12445,,89df',
				email: 'edgarb@gmail.com'
			}
		})
	}

	const organization = await prisma.organization.create({
		data: {
			name: 'Health4All',
			town: 'Kisumu',
			userId: user.id
		}
	})

	const event = await prisma.event.create({
		data: {
			organizationId: organization.id,
			title: 'Health4All Awareness Drive',
			startTime: new Date(),
			endTime: new Date(),
			cost: 559,
			creatorId: user.id,
			description: 'On the 3rd of August, 2024 we march to create awareness on Health4All!',
			volunteerRoles: {
				create: {
					title: 'Route Marshall'
				}
			}
		}
	})

	const eventWithVolunteerDetails = await prisma.event.findFirst({
		include: {
			volunteerRoles: true,
			participantRoles: true
		}
	})

	const eventAttendee = await prisma.eventAttendee.create({
		data: {
			userId: volunteer.id,
			eventId: event.id,
			volunteerRoleId: eventWithVolunteerDetails?.volunteerRoles[0].id
		}
	})
}

beforeEach(() => {
	return clearDatabase()
})
afterAll(() => {
	return closeDatabase()
})

test('EventAttendee is created, given all required details', async () => {
	await createEventAttendee('volunteer');

	const eventAttendee = await prisma.eventAttendee.findFirst({
		include: {
			user: true,
		}
	})

	expect(eventAttendee?.user.firstName).toBe('Volunteer')
})