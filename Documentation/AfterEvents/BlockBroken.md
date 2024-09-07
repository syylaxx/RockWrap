<h1 align="center">
  BlockBroken AfterEvents
</h1>

<br>

<h2 align="center">
  Parameters
</h2>

### • callback: () => void
Your Arrow Function, that will be run everytime some player breaks a Block.

Returns *void*

<h2 align="center">
  Properties
</h2>

<br>

### • player
`player: Player`
<br>
<br>
Player that destroyed the Block.
<br>
<br>
Type: *Player*

<br>

### • block
`block: Block`
<br>
<br>
The instance of the broken Block.
<br>
<br>
Type: *Block*

<br>

<h2 align="center">
  Example
</h2>

```ts
import { BeforeEvents } from "api/@syylaxx/Events/BeforeEvents";

BeforeEvents.BlockBroken(({ cancelEvent, player, block: { typeId } }) => {
    if (typeId === "minecraft:diamond_block")
        cancelEvent();

    player.sendMessage("You destroyed : " + typeId);
});
```