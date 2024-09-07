<h1 align="center">
  BlockPlaced BeforeEvent
</h1>

<br>

<h2 align="center">
  Parameters
</h2>

### • callback: () => void
Your Arrow Function, that will be run everytime some player breaks a Block.

Returns *void*

<br>

<h2 align="center">
  Properties
</h2>

### • cancelEvent
`cancelEvent: () => void`
<br>
<br>
Function that cancels the Event.
<br>
<br>
Type: *Function*

<br>

### • player
`player: Player`
<br>
<br>
Player that placed the Block.
<br>
<br>
Type: *Player*

<br>

### • block
`block: Block`
<br>
<br>
The instance of the placed Block.
<br>
<br>
Type: *Block*

<br>

<h2 align="center">
  Example
</h2>

```ts
import { BeforeEvents } from "api/@syylaxx/Events/BeforeEvents";

BeforeEvents.BlockPlaced(({ cancelEvent, player: { isOp }, block: { typeId } }) => {
    if (isOp() && typeId !== "minecraft:dirt")
        return;

    cancelEvent();
});
```
