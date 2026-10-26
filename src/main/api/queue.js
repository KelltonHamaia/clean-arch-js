const { sendMailQueue } = require('../../infra/queue/bull')
const sendMailJob = require('./jobs/send-mail.job')

sendMailQueue.process(sendMailJob.handle)
