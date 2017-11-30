import Item from '../Items/Item';

export default interface RandomDrop {
	roll(): Item;
}
