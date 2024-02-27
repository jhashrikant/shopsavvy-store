import styles from '/styles/searchbox.module.css'

const Searchbox = () => {
    return (
        <div>
            <label>
                <input className={styles.searchbox} type='text' placeholder='Search Items' />
            </label>
        </div>
    )
}

export default Searchbox;
