export const emailQueue = []
let isQueueEmpty = true

export const emailManager = {
  emailInterval: () => {
    setInterval(async () => {
      try {
        if (emailQueue.length && isQueueEmpty === true) {
          isQueueEmpty = false
          const email = emailQueue.shift()
          await email
          isQueueEmpty = true
        }
      } catch (error) {
        throw error
      }
    }, 50)
  },
  pushEmail: (emailCallBack) => {
    emailQueue.push(emailCallBack)
  }
}