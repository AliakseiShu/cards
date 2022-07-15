import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {ShowPacks} from './showPacks/ShowPacks';
import {TablePacks} from './tablePacks/TablePacks';
import {PATH} from '../../enums/path';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {fetchCardPacks} from './packsListReducer';

export const PacksList = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
    const page = useAppSelector(state => state.tablePacks.page);
    const pageCount = useAppSelector(state => state.tablePacks.pageCount);
    const searchPackName = useAppSelector(state => state.tablePacks.packName);
    const sortPackName = useAppSelector(state => state.tablePacks.sortPacks);
    const commonUserId = useAppSelector(state => state.tablePacks.user_id);
    const commonMin = useAppSelector(state => state.tablePacks.min);
    const commonMax = useAppSelector(state => state.tablePacks.max);

    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page, pageCount, sortPackName, searchPackName, commonUserId, commonMin, commonMax]);
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.container}>
            <ShowPacks/>
            <TablePacks/>
        </div>
    )
};