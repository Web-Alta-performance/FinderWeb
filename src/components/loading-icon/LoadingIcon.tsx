import '../../css/main.css';
import loadingIcon from './loading.svg'
import styles from './loading.module.css';

const LoadingIcon = ({
    width = 50,
    showText = false,
    text = '',
}) => {
    const textComponent = showText
        ? <p className='text center size-115' style={{ margin: 0 }}>{text ? text : 'Carregando...'}</p>
        : <></>

    return (
        <div className='flex center column'>
            <img className={styles.loading} alt='loading' src={loadingIcon} style={{ width, margin: 20 }} />
            {textComponent}
        </div>
    )
}

export { LoadingIcon };