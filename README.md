# 12a-mean

## What am I looking at?

Development of a multiplayer turn-based game. In space!

## Looking for Crew ##
5 real people on board a ship, performing different duties:
- Chief Tactician: Controls the tactical aspects of running the ship, including space combat, repelling boarding parties or boarding other ships.
- Chief of Intelligence: Scans space for mysteries and potential tactical issues, or just anything interesting.
- Chief Medical Officer: Heals injured or troubled crew members.
- Chief Engineer: Optimises and fixes the ship.
- Chief Navigator: Takes you to exciting new places.

Each of them can provide certain kinds of 'buff':
- Tactical: Enemies can force your crew to steer tactically and slow you down and force your crew to work harder. The Chief Tactician can either reduce this for a couple of days by advising the crew on the forseeable future, or remove such a debuff outright by blowing the offending vessel into the next universe.
- Intelligence: Knowledge of the surrounding area, general scanner optimisations or direct scanner feeds can keep the whole crew up to date on a wide variety of things which may relevant to them. Fixing the engines? Did you know the area you're flying through has a high density of rich colombian dark matter? Best configure the engines appropriately.
- Medical: The crew can be injured during difficult times. Sure, hardly anyone dies anymore, because this is the future, and what are we? Cave-men? They will naturally heal eventually, but the medic could get them up and back to work much faster than that. Furthermore, they can put crew members in a better frame of mind with short therapy sessions. Or drugs. Whatever.
- Engineer: Anything mechanical can be made to run a bit better. Weapons, shields, medical equipment, engines, scanners, the coffee machines. Anything.
- Navigator: If you're on a space ship, the chances are you're going to want to go somewhere at some point. The Navigator will stack up a list of planets visited. If your ship has been there in the last two days, that means you can complete your official or *ahem* private missions or trade transactions. Without them, everyone can find something to do, but it's just not the same...

## Why would you do this?

For a long time I have wanted to make a multiplayer game. I wanted to include combat, an economy and spaceships, because spaceships are cool.

I also wanted other game mechanics, such as hacking, stealth, engineering, research, manufacturing and resource gathering, because those things are also cool.

I decided that the easiest approach was to abuse turn-based combat mechanics to express other kinds of potentially complex minigames, such as fixing the engines, scanning for enemies, hacking enemy vessels, and of course shooting other ships.

For that purpose I will build a turn-based engine suitable to switching between these contexts and containing the mechanic above. This will have it's own module, and the potential for export as it's own public node package if completed.

## Ok? What now?

Download and install the source code:

- Download/checkout
- Install node
- Run 'make'. This runs 'npm install', which builds the (mostly back-end) vendor packages.
- Run 'grunt'. This downloads more packages and builds the remaining (mostly front-end) vendor packages, using bower.

The software should now be ready to run.

To run it:

- Start a new command line (cmd.bat will do this for you in windows) and run 'mongo'.
- Start another new command line and run 'node server.js'. This will need to be restarted everytime you make changes to the node code.
- Start yet another new command line and run 'grunt watch'. This will update you with snarky, mechanical remarks about how your code looks funny and breaks unit tests.

## What the-? I don't even-

Correct. Either I haven't bothered to tell you something, or I don't understand it either. Ask me about it. At the very worst I will never get back to you, but it's more likely I'll give you a long rambling response in a flak-cannon approach to answering your question. That is, I will turn up with a flak cannon and right click.

Some might consider that to be almost (*sunglasses*) Unreal! :O

## Possible Contexts/Maps

A mapping of possible sprite-scales and their map-decoration/designs.

- Humanoid:
  - Vessel: On board a ship or spacestation.
  - Planetside: Any terrain.
  - Space: A spacewalk.
- Components:
  - Circuitboard
  - Mechanical
  - Cyberspace:
    - Sprites: Sprites are always some kind of data. Consist mostly of software interfaces, e.g. data streams and such. Terrain is usually in the form of bandwidth. Space is not represented at all. A single (albeit 'hilly') tile could be a connection to another ship, and multiple tiles would represent the size of the computer.
      - Software: When able to interact with other software, can have certain effects.
      - Data: Can be spawned by software and moved. Once spawned, can be moved by any software equipped to manage it.
    - Terrain: Represents latency and lossiness.
      - Memory: Easily passable area, usually suited to keeping data, including software.
      - Bad Sectors: If memory is turned into a bad sector while a unit is on it, the unit is lost. Nothing can be moved into bad sectors.
      - Connection: Usually has a latency and lossiness level.
      - Processor: A resource tile allowing software the processing power to run its operations.
    - Abilities:
      - Refactor (channeled): Sacrifice the health of a program and upgrade it. Includes a HoT buff.
      - Ping: Scan a piece of terrain for information. It will tell you whether the terrain causes harm or is hard to traverse.
      - Copy: Software copies itself.
      - Install: Installs a Software Copy
      - Delete: Clears data from a tile.
  - Biological
- Spaceships: 
  - Interstellar: Star systems for other sprites.
  - Interplanetary: Nodes will likely be planets or stars. Deep space might be empty except for ships.
  - Liquid Space?: This isn't really a thing. Is it? Shouldn't the number of tolerated atmospheres for a spaceship be between 1 and 0?

## Possible Games opened by quests.

Probably, all games should be available to all players, until they pick it up. If quit, it reopens to the other players. If success, it will disappear.

While playing, other quests may open. Sometimes this will include emergency quests. No quests can be taken while an emergency quest is available unless it's locked.

Consider assistance of quests in progress to avoid breaking causality and freeing up non-emergency quests faster.

- Boldly Go (Spaceships/*): Scan for anomalies until they turn out to be something else in the vacuum of space. Might turn out to be other ships. Could open Star Wars quests.
- Star Wars (Spaceships/Interplanetary): Ships destroy each other in the vacuum of space where nobody can hear you explode.
- Interplanetary Visit (Spaceships/Interplanetary): Move the ship around within a star system. A star system may contain many locations for trade/mining/arena combat/murderchess/other activities and give bonuses for other chief's budget and open opportunities which might not come up without a skilled navigator.
- Interstellar Visit (Spaceships/Interstellar): Move the ship between star systems. Different star systems have vastly different cultures and may present different quest opportunities for all players for rare parts, etc. Will open Interplanetary Visit quests.
- Hacking (Components/Cyberspace): Seek out and shut down scripts and bots being used to undermine your computer systems.
- Medical Mystery Tour (Components/Biological): What's wrong with my patient?
- Upgrade (Components/Circuitboard|Mechanical|Cyberspace): Upgrade the tech on any level.
- Warp Chase (Spaceships/Interstellar): Pursue a spaceship in deep space.
- Boarding Party (Humanoid/Spaceship|Spacewalk): Enter a ship. Commandeer it.
- Research (*/*): Some kind of tech-tree is needed and it should be a quest. Probably this will depend on many factors.
- Production/Manufacture (*/*): I like this is as a concept and setting up a manufacturing system may as well be a quest.
- Resources/Processing (*/*): Turning things into other things or digging them up. Similar theme. The important thing is making it fun. All quests will have sprite corpses dropping loot of some kind.

Quests always have the same format. Victory is achieved by defeating all the sprites within given restrictions (e.g. time limit), and defeat occurs under counter-conditions.

Victory can include rewards dependent on the quest configuration. Usually items (which can include data, software and AI configs) and currency.

Quests will arise automatically to apply buffs to the ship and crew. This way, players always have something to do, even if somebody is doing the quest chain.

## Quest Types

- Narrative - this is a conditional chain of quests opened from a 'root'. Victory requires killing all enemies within a number of turns. Victory and defeat may open different quests. Victory may come with a range of rewards.
- Emergency - this is a Narrative quest which must be completed before any other quests. It may open further emergency quests.
- Buff - this has no defeat condition. Enemies will spawn for five minutes. Each kill will add to the buff bonus, and the mission will be over when all the enemies are killed, applying the buffs.

## Narrative

Quest generation needs to have a tree of outcomes.

For example, the crew are given a mission to seek out a band of pirates. This is a navigational quest. On completion, they enter a Warp Chase.
- Victory (catch up):
  - Ideally this would open one hacking quest. The engines, weapons and defenses of each ship would be handled by sprites. If the enemy ship initiates this, it's an emergency quest.
    - Outcome: This is determined by the sprites left alive by the end of the battle. Opens a Star Wars quest. Engines determine retreat options, weapons determine available attacks and defenses determine whether the engineer has an emergency quest to fix the ship. The Star Wars quest is a second chance to disable the enemy weapons, engines and defenses. The enemy could do the same, which would result in your defeat.
      - Victory: Opens a Boarding Quest.
      - Defeat: Probably fix the ship, then try to pick up the trail again.
  - (Old) Opens a Hacking quest where you can attempt to:
    - undermine their engineering systems so they can't get away.
      - Victory: Opens a Star Wars quest, but they can't get away from you. This should be some kind of environmental condition that you can stack with adjacent quests, such that the resulting battle involves the enemy having no weapons, engines or defenses.
        - Victory: Gives you the option of:
          - destroying the ship. This could be some kind of 'morality' quest or something.
          - boarding the ship.
        - Defeat: Your engineer gets to repair your ship.
      - Defeat: Opens a Star Wars quest, but they have the option of retreat.
    - disable their weapons so they can't fight you.
  - Possibly opens an unknown medical quest where you heal crew members.
  - Opens an unknown medical quest where you buff boarding soldiers.
  - Opens an engineering quest to keep the ship together and able to continue fighting.
- Defeat: results in a quest to look for their trail. This is an intelligence quest. Victory is achieved by defeating a number of mysteries. There may be a time limit. Defeat is achieved otherwise.
  - Victory: Reopens the conditions of the root quest, but described as 'we have picked up the trail'.
  - Defeat: The chain ends. The pirates escape. Theoretically this could drive Plot.
