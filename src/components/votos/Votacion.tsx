import { Card, InputGroup, Label } from '@blueprintjs/core';
import React, { useState }  from 'react';
 import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Casa } from '../../services/casas/index';
import { CasaDialog } from '../casas/CasaDialog';
import { Classes } from "@blueprintjs/core";


interface IVotacionesProps {
	casas: Casa[],
	updateCasas: (casas: Casa[])=>void
}

export const formatNumber = (num: number)=>{
	const intl = new Intl.NumberFormat('es-ES', {style: 'currency', currency: "EUR"});
	const fullFormat = intl.format(num);

	return fullFormat.substring(0, fullFormat.length-2);
}




export const Votaciones : React.FunctionComponent<IVotacionesProps> = (props:IVotacionesProps) => {

	const [casas, updateCasas] = useState(props.casas);
	const [openCasaDialog, toggleCasaDialog] = useState(false);
	const [currentCasa, updateCasa] = useState(props.casas[0]);

	const handleOpenDialogCasa = (casa : Casa)=>{
		toggleCasaDialog(!openCasaDialog)
		updateCasa(casa)
	}
	
	const handleOnDragEnd = (result: any)=>{
		if (!result.destination) return;
		const items = Array.from(casas);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updateCasas(items);
		props.updateCasas(items)
	}

	const containerClases = "votacion-container " + Classes.CARD

	return (
		<div className={containerClases}>
			<div className="votacion-exp">
				<h1>Votación por Ranking</h1>
				<p>
					Ordena la lista de casas por órden de favorito, la primera siendo la que más te guste, y la última la que menos.
				</p>
				<p>
					Se hará un cómputo de todas las puntuaciones para cada casa para decidir la casa ganadora.
				</p>
				<p>
					Para más información sobre las casas, haz click sobre cualquier de ellas.
				</p>
			</div>
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
														<Card interactive={true} onClick={()=>handleOpenDialogCasa({nombre, localizacion, imagenes, precio, numeroDeHuespedes})} className="casa-card">
															<h2>{nombre}</h2>
															<h3>{localizacion}</h3>
															<img src={imagenes[0]} alt="Portada" />
															<Label className="bp3-inline">
																Precio: <InputGroup disabled leftIcon="euro" value={formatNumber(precio)} />
															</Label>
															<Label className="bp3-inline">
																Número de Huéspedes: <InputGroup disabled leftIcon="person" value={numeroDeHuespedes.toString()} />
															</Label>														
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
			<CasaDialog casa={currentCasa} isOpen={openCasaDialog} toggleOpen={()=>{handleOpenDialogCasa(currentCasa)}} />
		</div>
	)
}