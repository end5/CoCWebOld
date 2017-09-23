import Inventory from "./Inventory";
import Material from "../Items/Material";
import Consumable from "../Items/Consumables/Consumable";

export default class CampChest extends Inventory<Material | Consumable> {

}