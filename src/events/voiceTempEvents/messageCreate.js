module.exports = function createEventMessageCreate(client, channels) {
    client.on('messageCreate', (message) => message.content === 'unregister' && manager.unregisterChannel(channels));
}