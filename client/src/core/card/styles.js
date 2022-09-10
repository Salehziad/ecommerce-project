import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    media: {
        height: 250,
        minWidth:350
        // min-width: 305px;
    },
    border: {
        border: 'solid'
    },
    fullHeightCard: {
        height: '100%'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottom: '10px solid white',
        minWidth: '400px',
    },
    activeCard: {
        borderBottom: '10px solid #22289a'
    },
    grid: {
        display: 'flex'
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    title: {
        padding: '0 16px'
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: 'none'
    },
    card1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'white'
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 0
    }
});