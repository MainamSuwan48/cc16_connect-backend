const db = require('../models/db')
const tryCatch = require('../utils/tryCatch')

exports.getAll = tryCatch(async (req,res,next) => {
    const subjects = await db.subject.findMany({
        select : {
            id: true,
            title: true
        }
    })
    res.json({ subjects })
})