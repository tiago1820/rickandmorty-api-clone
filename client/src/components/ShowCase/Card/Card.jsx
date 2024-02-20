import styles from './Card.module.css';

export const Card = (props) => {

    return (
        <div className={styles.characterCard}>
            <div className={styles.characterImg}>
                image
            </div>
            <div className={styles.characterInfo}>
                <h3>Beth Smith</h3>
                <p>Alive - Human</p>
                <p>Last known location: Morty's Story</p>
                <p>First seen in: Never Ricking Morty</p>
            </div>
        </div>
    )
}