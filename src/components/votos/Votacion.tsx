import { Alert, Button, Card, InputGroup, Intent, Label } from '@blueprintjs/core';
import React, { useState }  from 'react';
 import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Casa } from '../../services/casas/index';
import { CasaDialog } from '../casas/CasaDialog';
import { Classes } from "@blueprintjs/core";
import { useDispatch } from 'react-redux';
import { postVoto } from '../../services/votos';

interface IVotacionesProps {
	casas: Casa[],
	updateCasas: (casas: Casa[])=>void,
	canVote: boolean,
}


export const formatNumber = (num: number)=>{
	const intl = new Intl.NumberFormat('es-ES', {style: 'currency', currency: "EUR"});
	const fullFormat = intl.format(num);

	return fullFormat.substring(0, fullFormat.length-2);
}


const DragNDrop = ({casas, handleOnDragEnd, handleOpenDialogCasa} : any) => {
	
	return (
	<DragDropContext  onDragEnd={handleOnDragEnd}>
		<Droppable droppableId="casas">
			{(provided)=> (
				<ul className="lista-casas" {...provided.droppableProps} ref={provided.innerRef}>								{
						casas.map((({nombre, localizacion, imagenes, precio, numeroDeHuespedes, url} : any, index: number) => (
							<Draggable key={nombre} draggableId={nombre} index={index}>
								{
									(provided)=>(
										<li  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											<Card interactive={true} onClick={()=>handleOpenDialogCasa({nombre, localizacion, imagenes, precio, numeroDeHuespedes, url})} className="casa-card">
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
)}
 

export const Votaciones : React.FunctionComponent<IVotacionesProps> = (props:IVotacionesProps) => {
	const dispatch = useDispatch();
	const _casas = props.casas
	const [casas, updateCasas] = useState(_casas);
	const [openCasaDialog, toggleCasaDialog] = useState(false);
	const [currentCasa, updateCasa] = useState({
		nombre: "",
		localizacion: "",
		imagenes: [],
		precio: 0,
		numeroDeHuespedes: 0,
		url: ''
	} as Casa);
	const [openAlert, toggleAlert] = useState(false);

	const handleAlert = ()=>toggleAlert(!openAlert)

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

	const sendVotacion = ()=>{
		dispatch(postVoto(casas))
		toggleAlert(!openAlert)
	};

	const containerClases = "votacion-container " + Classes.CARD

	return (
		<div className={containerClases}>
			<div className="votacion-exp">
				<h1>Votación por Ranking</h1>
				<p>
					Ordena la lista de casas por orden de favorito, la primera siendo la que más te guste, y la última la que menos.
				</p>
				<p>
					Se hará un cómputo de todas las puntuaciones para cada casa para decidir la casa ganadora.
				</p>
				<p>
					Para más información sobre las casas, haz click sobre cualquier de ellas.
				</p>
			</div>
			<div className="lista-votacion">
				{
					DragNDrop({casas, handleOnDragEnd, handleOpenDialogCasa})
				}
			</div>
			<Button
				icon="send-message"
				text="Enviar"
				onClick={()=>handleAlert()}
				disabled={!props.canVote}
			/>
			<CasaDialog casa={currentCasa} isOpen={openCasaDialog} toggleOpen={()=>{handleOpenDialogCasa(currentCasa)}} />
			<Alert
				cancelButtonText="Cancelar"
				confirmButtonText="Enviar"
				intent={Intent.PRIMARY}
				isOpen={openAlert}
				onCancel={()=>handleAlert()}
				onConfirm={()=>sendVotacion()}
			>
				<p>
					Solo puedes votar una vez, ¿estás seguro de tu elección?
				</p>
			</Alert>
		</div>
	)
}