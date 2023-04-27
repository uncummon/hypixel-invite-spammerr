const mineflayer = require('mineflayer')
const prompt = require('prompt-sync')();
var sleep = require('system-sleep');

const accounts = [
//  {username: 'USERNAME', password: 'PASSWORD'},
//  {username: 'USERNAME', password: 'PASSWORD'},
//  {username: 'USERNAME', password: 'PASSWORD'},
]

console.clear();
console.log('')
const username = prompt('Target username: ');

const bots = []

accounts.forEach((account, index) => {
  setTimeout(() => {
    const bot = mineflayer.createBot({
      host: 'mc.hypixel.net',
      version: "1.8.9",
      username: account.username,
      password: account.password,
      auth: 'microsoft'
    })

    bot.on('login', () => {
      console.log(`\n${bot.username} has logged in, starting the invites!\n`)
      setInterval(() => {
        bot.chat(`/p ${username}`)
        sleep(500);
        bot.chat('/p leave')
      }, 1000)
    })

    bot.on('messagestr', async (message) => {
      if (message.includes((username))) {
        bot.chat(`/p warp`)
      }
  });

  bot.on('messagestr', async (message) => {
    if (message.includes(`You cannot invite that player`)) {
      console.log(`\n ${username} has invites disabled.`)
      process.exit(1);
    }
});

bot.on('messagestr', async (message) => {
  if (message.includes(`invited`)) {
    console.log(`Successfully invited.`);
    }
});

    bot.on('error', console.log)
    bot.on('kicked', console.log)

    bots.push(bot)
  }, index * 5100)
})