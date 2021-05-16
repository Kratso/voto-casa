import { Card } from '@blueprintjs/core';
import React, { useState }  from 'react';
 import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Casa } from '../../services/casas/index';


interface IVotacionesProps {
	casas: Casa[],
	updateCasas: (casas: Casa[])=>void
}
export const Votaciones : React.FunctionComponent<IVotacionesProps> = (props:IVotacionesProps) => {

	const [casas, updateCasas] = useState(props.casas);

	const handleOnDragEnd = (result: any)=>{
		if (!result.destination) return;
		const items = Array.from(casas);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateCasas(items);
		props.updateCasas(items)
	}

	return (
		<div className="lista-votacion">
			<DragDropContext  onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="casas">
					{(provided)=> (
						<ul className="lista-casas" {...provided.droppableProps} ref={provided.innerRef}>
							{
								casas.map((({nombre, localizacion, imagenes, precio, numeroDeHuespedes}, index) => (
									<Draggable key={nombre} draggableId={nombre} index={index}>
										{
											(provided)=>(
												<li  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<Card>
														{localizacion + "\n" + imagenes[0]+"\n"+precio+"\n"+numeroDeHuespedes}
													</Card>
												</li>
											)
										}
										
									</Draggable>
								)))
							}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}