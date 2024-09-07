<h1 align="center">
  MessageSent BeforeEvent
</h1>

<br>

<h2 align="center">
  Parameters
</h2>

### • callback: () => void
Your Arrow Function, that will be run everytime some player sends a Chat Message.

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
Player that sent the Chat Message.
<br>
<br>
Type: *Player*

<br>

### • message
`message: string`
<br>
<br>
The content of the sent Chat Message.
<br>
<br>
Type: *string*

<br>

<h2 align="center">
  Example
</h2>

```ts
import { AfterEvents } from "api/@syylaxx/Events/AfterEvents";

BeforeEvents.MessageSent(({ message, player: { name } }) => {
    world.sendMessage(` §b${name}§7 » ${message}`);
});
```
