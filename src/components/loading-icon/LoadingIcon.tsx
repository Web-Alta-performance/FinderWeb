import '../../css/main.css';
import loadingIcon from './loading.svg'
import styles from './loading.module.css';

const LoadingIcon = ({
    width = 50
}) => {
    return (
        <div className='flex center'>
            <img className={styles.loading} alt='loading' src={loadingIcon} style={{ width, margin: 20 }} />
        </div>
    )
}

export { LoadingIcon };