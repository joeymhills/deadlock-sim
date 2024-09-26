
- As complexity grows, I might need to introduce a "scheduler" that schedules events instead of leaving the events to schedule themselves;

SIM NOTES:
- headshot functionality
- tier based stat buffs

- Add channel time
- Add reload time
- autocast option
- item components
- long range uses ammo multiplier
- need to have a max health stat(most likely just need to just add base and bonus health)
- need to go back and fix all of the percentage base ammo stuff


- use steam api/0auth
- add abilities + ability points
- add health regen to sim:

TYPES OF PASSIVE "CRITERIA":
- number of enemies nearby
- is headshot
- owner health
- target health
- bullet hits enemy
- bullet hit creates stack
- damage taken stacks
- damage increase as you fire

- bleed debuff


NOTES ON ITEM ITERACTIONS:
General:
- Headshot multiplier is 2x on most heroes(not seven)

NITPICKY UI SHIT:
- Remove state for hovering(i.e. replace with hover:bg-opacity-50)
- add loaders before fonts load to prevent ui shift
- add loaders and animations for everything else