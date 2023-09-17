import { DragEvent, useState} from 'react';

const DragAndDropComponent = () => {
    const [draggedItem, setDraggedItem] = useState<string>('');
    const [items, setItems] = useState([
        {id: 'item1', content: 'Item 1'},
        {id: 'item2', content: 'Item 2'},
        {id: 'item3', content: 'Item 3'},
    ]);

    const onDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
        e.dataTransfer.setData('text/plain', id);
        setDraggedItem(id);
    };

    const onDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>, id: string) => {
        e.preventDefault();
        const draggedItemId = e.dataTransfer.getData('text/plain');
        const updatedItems = [...items];
        const draggedItemIndex = updatedItems.findIndex(item => item.id === draggedItemId);
        const droppedItemIndex = updatedItems.findIndex(item => item.id === id);

        // Swap items
        [updatedItems[draggedItemIndex], updatedItems[droppedItemIndex]] = [updatedItems[droppedItemIndex], updatedItems[draggedItemIndex]];

        setItems(updatedItems);
        setDraggedItem('');
    };


    return (
        <div style={{ display: 'flex' }}>
            <div
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'dropArea')}
                style={{
                    width: '200px',
                    height: '300px',
                    border: '2px solid #ccc',
                    margin: '10px',
                    padding: '10px',
                }}
            >
                {items.map(item => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, item.id)}
                        style={{
                            margin: '5px',
                            padding: '5px',
                            backgroundColor: '#f9f9f9',
                            cursor: 'move',
                        }}
                    >
                        {item?.content}
                    </div>
                ))}
            </div>
            <div
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'dragArea')}
                style={{
                    width: '200px',
                    height: '300px',
                    border: '2px solid #ccc',
                    margin: '10px',
                    padding: '10px',
                }}
            >
                {draggedItem ? (
                    <div
                        style={{
                            margin: '5px',
                            padding: '5px',
                            backgroundColor: '#f9f9f9',
                            cursor: 'move',
                        }}
                    >
                        {items.find(item => item.id === draggedItem)?.content}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>Drop Area</div>
                )}
            </div>
        </div>
    );
};

export default DragAndDropComponent;