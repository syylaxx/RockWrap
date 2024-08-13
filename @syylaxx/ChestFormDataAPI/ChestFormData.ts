import { ActionFormData } from '@minecraft/server-ui'
import { typeIdToDataId, typeIdToID } from "./TypeIdentifiers"
import { Player } from '@minecraft/server'

const
    number_of_1_16_100_items = 0,
    sizes = new Map([
        [5, ['§c§h§e§s§t§0§5§r', 5]],
        [9, ['§c§h§e§s§t§0§9§r', 9]],
        [18, ['§c§h§e§s§t§1§8§r', 18]],
        [27, ['§c§h§e§s§t§2§7§r', 27]],
        [36, ['§c§h§e§s§t§3§6§r', 36]],
        [45, ['§c§h§e§s§t§4§5§r', 45]],
        [54, ['§c§h§e§s§t§5§4§r', 54]]
    ])

export class ChestFormData {
	private buttonArray: any[]
    private titleText: string
    public slotCount: number

	constructor(size = 27) {
		const
            sizing = sizes.get(size) ?? ['§c§h§e§s§t§2§7§r', 27],
            title = sizing[0] as string 
		this.titleText = title
		this.buttonArray = []

		for (let i = 0; i < size; i++)
			this.buttonArray.push(['', undefined])

		this.slotCount = size
	}

    /**
     * Sets your desired Title of your ChestFormData.
     * @param text Title of your ChestFormData in String.
     */

	public title(text: string) {
        this.titleText += text

        return this
	} 

    /**
     * Displays a Button on your ChestFormData.
     * @param slot The Index of wanted Slot.
     * @param itemName The Item name, use a new String to put a new Line.
     * @param texture The Texture of your Item, can be either a Minecraft Block or a Texture from "textures/".
     * @param stackSize How many items will be stacked, max Number is 99.
     * @param enchanted Displays a Enchantment Glint on your item, only works using Minecraft Blocks.
     */

	public button(slot: number, itemName: string[], texture: string, stackSize = 1, enchanted = false) {
		const
            ID = typeIdToDataId.get(texture) ?? typeIdToID.get(texture)

		this.buttonArray.splice(
            slot,
            1,
            [
                `stack#${Math.min(Math.max(stackSize, 1) || 1, 99).toString().padStart(2, '0')}§r${itemName?.length ? `\n§r${itemName.join('\n§r')}` : ''}`,
                (((ID + (ID < 256 ? 0 : number_of_1_16_100_items)) * 65536) + (Number(enchanted) * 32768)) || texture
	        ]
        )

		return this
	}

    /**
     * Puts a Orange-Yellow Border out of Glass around.
     */

	public glassBorder() {
        for (let i = 0; i <= 9; i++)
            this.button(i, [], "textures/blocks/glass_orange")

        for (let i = 1; i <= 10; i++)
            this.button(i - this.slotCount, [], "textures/blocks/glass_orange")

        return this
    }

    /**
     * Shows the Player ChestFormData
     * @param player Targeted player that ChestFormData will be shown to.
     */

	public show(player: Player) {
		const
            UI = new ActionFormData()

		UI.title(this.titleText as string)

        for (const button of this.buttonArray)
            UI.button(button[0], button[1]?.toString())

		return UI.show(player)
	}
}