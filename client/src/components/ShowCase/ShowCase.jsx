import { Card } from './Card/Card';
import styles from './ShowCase.module.css';

export const ShowCase = (props) => {

    return (
        <div className={styles.container}>
            <div className={styles.cardWrapper}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )


}