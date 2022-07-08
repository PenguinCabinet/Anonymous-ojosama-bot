//const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"]}, {partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const exec=require("child_process").exec;

/*
let temp=exec("find / -name ojosama", function(error, stdout, stderr) {
	if (error !== null) {
	  console.log('exec error: ' + error);
	  return;
	}
  
	console.log('stdout: ' + stdout);
})*/

//console.log("TEMP")
/*temp.on("close",async function(code){
	console.log((await temp.stdin));
});*/

async function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`wait: ${time}`);
    }, time);
  });
}

function send_frame(v){
	return `#お嬢様;匿名希望\n${v}`
}

async function to_ojosama(v){
	return new Promise(async function(resolve){
    			
		let ojosama=exec(
				`/root/go/bin/ojosama`,
				async function(error, stdout, stderr) {
					console.log("generated ojosama text");
					resolve(stdout);
				});
		ojosama.stdout.pipe(process.stdout);

		ojosama.stdin.setEncoding('utf-8');
		ojosama.stdin.write(v);
		ojosama.stdin.end();

		let is_command_end=false;

	});
}


client.once('ready', () => {
    console.log('Ready');
});

client.on('disconnect',message=>
{
	console.log("Disconnect");
	connection[message.guild.id]=null;
});

client.on('messageCreate', (async function(message)
{
	if(message.content.slice(0,1)=="!"){
		return;
	}

	if(message.author.id!=client.user.id&&
		message.channel.name=="匿名お嬢様"
	){
		let ojosamlized_text=send_frame((await to_ojosama(message.content)));
		console.log(ojosamlized_text);
		const reply = await message.channel.send(ojosamlized_text)
		await message.delete()	
	}
	

}));

console.log(process.env.BOT_KEY);

client.login(process.env.BOT_KEY);

console.log("software started");

