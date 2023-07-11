const { upsertNewChannel, findByChannelId, findByParentId, deleteByChannelId } = require('./query/voiceChannel')

module.exports.upsertNewChannel = upsertNewChannel;
module.exports.findByChannelId = findByChannelId;
module.exports.findByParentId = findByParentId;
module.exports.deleteByChannelId = deleteByChannelId