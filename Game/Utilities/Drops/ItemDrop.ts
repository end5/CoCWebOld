import { Item } from '../../Items/Item';

export interface ItemDrop {
    roll(): Item | undefined;
}
