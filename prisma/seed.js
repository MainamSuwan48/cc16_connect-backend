const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync("123456", 10);

const teacherData = [
    { firstname : 'Andy', t_code :"t001", password:hashedPassword, email: "andy@ggg.mail"},
    { firstname : 'Anda', t_code :"t002", password:hashedPassword, email: "anda@ggg.mail"},
    { firstname : 'Anne', t_code :"t003", password:hashedPassword, email: "anne@ggg.mail"},
    { firstname : 'Anny', t_code :"t004", password:hashedPassword, email: "anny@ggg.mail"},

]

const run = async () => {
    await prisma.teacher.createMany({data:teacherData})
    
}

run()