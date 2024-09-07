<h1 align="center">
  ItemUsed BeforeEvent
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
Player that used the ItemStack.
<br>
<br>
Type: *Player*

<br>

### • itemStack
`itemStack: ItemStack`
<br>
<br>
The instance of the used ItemStack.
<br>
<br>
Type: *Block*

<br>

<h2 align="center">
  Example
</h2>

```ts
import { BeforeEvents } from "api/@syylaxx/Events/BeforeEvents";

BeforeEvents.ItemUsed(({ cancelEvent, player: { location, dimension }, itemStack: { typeId } }) => {
    if (typeId !== "minecraft:diamond_shovel")
        return;

    dimension.spawnEntity("minecraft:creeper", location);
    cancelEvent();
});
```
