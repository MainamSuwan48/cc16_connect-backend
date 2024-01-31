const db = require('../models/db')
const tryCatch = require('../utils/tryCatch')

exports.createHomework = tryCatch(async (req, res, next) => {
  const { question,startdate,duedate,published,subject_id,teacher_id } = req.body
  // validation
  console.log(req.body)
  if(req.user.role !== 'teacher') {
      throw new Error('Unauthorized::400')
  }
  const rs = await db.homework.create({ 
      data: {
        subject_id : +subject_id,
        question,
        startdate : new Date(startdate),
        duedate : new Date(duedate),
        published,
        teacher_id : req.user.id
      } })
  res.json({result: rs})
})