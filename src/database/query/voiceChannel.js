const voiceChannelSchema = require('../schema/voiceChannel')

module.exports.insertNewChannel = async function (channelId, parentId, count) {
    let newVoiceChannel = new voiceChannelSchema({
        channelId: channelId,
        parentId: parentId,
        count: count
    });
    await newVoiceChannel.save().catch((err) => console.log(err));
    return newVoiceChannel;
}

module.exports.findByChannelId = async function (key) {
    return await voiceChannelSchema.findOne({ channelId: key });
};

module.exports.findByParentId = async function (parentId) {
    return await voiceChannelSchema.find({ parentId: parentId });
};

module.exports.deleteByChannelId = async function (key) {
    return await voiceChannelSchema.deleteOne({ channelId: key })
}