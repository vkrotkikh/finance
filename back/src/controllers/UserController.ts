const User = require('./../models/User')

export const getUserIdbyTelegramName = async (name: string) => {
    const user = await User.findOne({ telegramNames: { $in: [name] }})
    return user.id
}