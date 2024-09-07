<h1 align="center">
  OnTick AfterEvent
</h1>

<br>

<h2 align="center">
  Parameters
</h2>

### • **callback**: () => void
Your Arrow Function, that will be run every Tick

Returns *void*

<br>

### Example

```ts
import { AfterEvents } from "api/@syylaxx/Events/AfterEvents";

AfterEvents.OnTick(() => {
    world.sendMessage(String(system.currentTick));
});
```
