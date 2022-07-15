import {AppStateType, AppThunk} from '../../../app/store';
import {setAppErrorAC, setAppStatusAC} from '../../../app/reducer/app-reducer';
import {AxiosError} from 'axios';
import {
    cardNameAPI,
    CardsTypeResponseType,
    CardType,
} from '../apiCardName/apiPackName';

const initialState: CardsNameStateType = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    cardsPack_id: '',
    cardQuestion: '',
    name: '',
    cardAnswer: '',
    sortCards: '',
    cardId: '',
    question: '',
    answer: '',
    min: 0,
    max: 0,
}

export const cardsNameReducer = (state: CardsNameStateType = initialState, action: CardsNameActionsType): CardsNameStateType => {
	switch (action.type) {
		case 'CARDS-NAME/SET-CARDS-PARAMS':
			return {...state, ...action.data}
		case 'CARDS-NAME/SET-CARDS-QUESTION':
			return {...state, cardQuestion: action.searchCardQuestion};
		case 'CARDS-NAME/SET-USER-CARD-NAME':
			return {...state, name: action.name};
		case 'CARDS-NAME/SET-CARDS-PAGE':
			return {...state, page: action.page};
		case 'CARDS-NAME/SET-CARDS-PAGE-COUNT':
			return {...state, pageCount: action.pageCount};
		case 'CARDS-NAME/SET-CARDS-TOTAL-COUNT':
			return {...state, cardsTotalCount: action.cardsTotalCount};
		case 'CARDS-NAME/SET-USER-ID':
			return {...state, cardsPack_id: action.userId};
		case 'CARDS-NAME/SET-CARD-ID':
			return {...state, cardId: action.id}
		case 'CARDS-NAME/SET-CARD-ANSWER':
			return {...state, answer: action.answer}
		case 'CARDS-NAME/SET-CARD-QUESTION':
			return {...state, question: action.question}
        case 'CARDS-NAME/SET-SORT-CARDS':
            return {...state, sortCards: action.sortCards};
		default:
			return state
	}
}

//actions
export const setSearchQuestion = (searchCardQuestion: string) =>
	({type: 'CARDS-NAME/SET-CARDS-QUESTION', searchCardQuestion} as const);

export const setUserCardId = (userId: string) =>
	({type: 'CARDS-NAME/SET-USER-ID', userId} as const);

export const setUserCardName = (name: string) =>
	({type: 'CARDS-NAME/SET-USER-CARD-NAME', name} as const);

export const getCardsNameData = (data: CardsTypeResponseType) =>
	({type: 'CARDS-NAME/SET-CARDS-PARAMS', data} as const);

export const setCardsPage = (page: number) =>
	({type: 'CARDS-NAME/SET-CARDS-PAGE', page} as const)

export const setCardsPageCount = (pageCount: number) =>
	({type: 'CARDS-NAME/SET-CARDS-PAGE-COUNT', pageCount} as const)

export const setCardsTotalCount = (cardsTotalCount: number) =>
	({type: 'CARDS-NAME/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)

export const setCardId = (id: string) =>
	({type: 'CARDS-NAME/SET-CARD-ID', id} as const)

export const setCardQuestion = (question: string) =>
	({type: 'CARDS-NAME/SET-CARD-QUESTION', question} as const)

export const setCardAnswer = (answer: string) =>
	({type: 'CARDS-NAME/SET-CARD-ANSWER', answer} as const)

export const setSortCards = (sortCards: string) => ({type: 'CARDS-NAME/SET-SORT-CARDS', sortCards} as const)

//thunks
export const fetchCardsTC = (): AppThunk => (dispatch, getState: () => AppStateType) => {
	const {cardsPack_id, page, pageCount, packUserId, cardQuestion, cardAnswer, min, max, sortCards} = getState().cardPack
	const params = {cardsPack_id, page, pageCount, packUserId, cardQuestion, cardAnswer, min, max, sortCards}

    dispatch(setAppStatusAC('loading'));

    cardNameAPI.getCard(params)
        .then(res => {
            dispatch(getCardsNameData(res.data));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            const error = e.response ? e.response.data.error : e.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        })
}

export const addCardTC = (cardsPack_id: string, question: string, answer: string): AppThunk => dispatch => {
	const card = {cardsPack_id, question, answer}

	dispatch(setAppStatusAC('loading'))
	cardNameAPI.createCard(card)
		.then(() => {
			dispatch(fetchCardsTC())
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
			dispatch(setAppStatusAC('idle'));
		})
}

export const removeCardTC = (_id: string): AppThunk => dispatch => {
	dispatch(setAppStatusAC('loading'))

	cardNameAPI.deleteCard(_id)
		.then(() => {
			dispatch(fetchCardsTC())
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
			dispatch(setAppStatusAC('idle'));
		})
}

export const updateCardTC = (_id: string, question: string, answer: string): AppThunk => dispatch => {
	const card = {_id, question, answer}
	dispatch(setAppStatusAC('loading'))

	cardNameAPI.updateCard(card)
		.then(() => {
			dispatch(fetchCardsTC())
		})
		.catch((e: AxiosError<{ error: string }>) => {
			const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
			dispatch(setAppErrorAC(error))
			dispatch(setAppStatusAC('idle'));
		})
}

//types
export type CardsNameStateType = CardsTypeResponseType & {
	cardsPack_id: string
	cardQuestion?: string
	name: string
	cardId: string
	question: string
	answer: string
	cardAnswer: string
	sortCards: string
	min: number
	max: number
}
export type CardsNameActionsType =
	| ReturnType<typeof getCardsNameData>
	| ReturnType<typeof setSearchQuestion>
	| ReturnType<typeof setCardsPage>
	| ReturnType<typeof setCardsPageCount>
	| ReturnType<typeof setCardsTotalCount>
	| ReturnType<typeof setUserCardId>
	| ReturnType<typeof setUserCardName>
	| ReturnType<typeof setCardId>
	| ReturnType<typeof setCardQuestion>
	| ReturnType<typeof setCardAnswer>
    | ReturnType<typeof setSortCards>

