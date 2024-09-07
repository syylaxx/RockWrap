<h1 align="center">
  RockWrap
</h1>

<p align="center">
  <b>
    A easy and optimized Wrapper for Minecraft Script API.
  </b>
</p>

<h2 align="center">
  What is it?
</h2>

<p>
  This is a Wrapper that includes Events, Managers and other Tools, which help you create better Addons.
</p>

<p>
  This is a Wrapper built in TypeScript for the Minecraft Script API.
</p>

<p>
  It has different Managers which help you manage Minecraft Classes, makes your Code faster, easier and smaller.
</p>

<p>
  Events have been also changed, subscribing to a Event happens only once, so lags are reduced even more!
</p>

<h2 align="center">
    How do i use it?
</h2>

**1. You install the Repository and put it in your Addon.**

```
> AddonProject
| > src
| | > api
| | | > @syylaxx
| | Main.ts
| manifest.json
| pack_icon.png
```

> [!TIP]
> You can put the @syylaxx folder into a api/wrapper subfolder, for better File Structure.

**2. You import the needed Manager or Feature, and use it!**

```ts
import { system, world } from "@minecraft/server";

import { AfterEvents } from "api/@syylaxx/Events/AfterEvents";
import { BeforeEvents } from "api/@syylaxx/Events/BeforeEvents";
import { ItemStackDataBase } from "api/@syylaxx/DataBases/ItemStackDataBase";

BeforeEvents.MessageSent(({ message, cancelEvent, player: { name } }) => {
    cancelEvent();

    world.sendMessage(` §b${name}§7 » ${message}`);
});

AfterEvents.OnTick(() => {
    world.sendMessage(String(system.currentTick));
});

AfterEvents.ItemUsed(({ itemStack }) => {
    new ItemStackDataBase("TestItem").saveItemStack(itemStack);

    const
        savedItemStack = new ItemStackDataBase("TestItem").getItemStack();

    console.log(savedItemStack.typeId);
});
```
> [!IMPORTANT]
> Some Vanilla events return `source` or `sender` instead of `player`, I recommend you to checkout [Documentation](https://github.com/syylaxx/RockWrap/edit/main/README.md#--what-does-it-have).

<h2 align="center">
  Why should I use it?
</h2>

I created this Wrapper because the Minecraft Script API doesn't have features I want.
<br><br>
So I added **Managers**, **DataBases**, **Before-** and **AfterEvents**, aswell a **onTick** event.
<br><br>
It makes your Code more **readable**, **smaller** **faster**.
<br><br>
Just test it out and see!

<h2 align="center">
  What does it have?
</h2>
  
<h3>
  AfterEvents
</h3>

- [**OnTick**](Documentation/AfterEvents/OnTick.md)
- [**MessageSent**](Documentation/AfterEvents/MessageSent.md)
- [**BlockBroken**](Documentation/AfterEvents/BlockBroken.md)
- [**BlockPlaced**](Documentation/AfterEvents/BlockPlaced.md)
- [**ItemUsed**](Documentation/AfterEvents/ItemUsed.md)
- [**PlayerSpawned**](Documentation/AfterEvents/PlayerSpawned.md)

<h3>
  BeforeEvents
</h3>

- [**MessageSent**](Documentation/BeforeEvents/MessageSent.md)
- [**BlockBroken**](Documentation/BeforeEvents/BlockBroken.md)
- [**BlockPlaced**](Documentation/BeforeEvents/BlockPlaced.md)
- [**ItemUsed**](Documentation/BeforeEvents/ItemUsed.md)

<h3>
  Managers
</h3>

- [**BlockManager**](Documentation/Managers/BlockManager.md)
- [**DynamicPropertyManager**](Documentation/Managers/DynamicPropertyManager.md)
- [**PlayerManager**](Documentation/Managers/PlayerManager.md)

<h3>
  DataBases
</h3>

- [**ItemStackDataBase**](Documentation/DataBases/ItemStackDataBase.md)

> [!IMPORTANT]
> Some Events, like BlockBroken AfterEvent or BlockManager, are not 100% done, and may be useless or broken. It will be resolved soon.
