# Disc_bot_1.0
Just my discord bot ran with node
you have to replace YOUR_CHANNEL_ID in main src code (for sending a message to a specifc channel in discord)
there's also a collab version for this in the collab branch

Basically, just install the requirements:
# .env openai@4 node discord.js

# note - your filetree should look like below

# "src" folder
--> index.js
--> "functions" folder
--> "events" folder
--> "commands" folder

# "functions" folder
Note - you have to replace YOUR_GUILD_ID with thte right one and YOUR_CLIENT_ID witth the right one.
--> handleCommands.js
--> handleEvents.js

# "events" folder does not contain anything but is required to be there

# "commands" folder
--> "community" folder

# "community" folder
--> 8ball.js
--> rizz-generate.js
--> image-generate.js

