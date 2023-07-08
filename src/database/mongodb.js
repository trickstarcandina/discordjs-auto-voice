const { insertNewChannel, findByChannelId, findByParentId, deleteByChannelId } = require('./query/voiceChannel')

module.exports.insertNewChannel = insertNewChannel;
module.exports.findByChannelId = findByChannelId;
module.exports.findByParentId = findByParentId;
module.exports.deleteByChannelId = deleteByChannelId