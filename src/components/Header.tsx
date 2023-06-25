import logo from '../../public/logo.png'
import styles from './Header.module.css';

export default function Header() {
    return (
        <section className={styles.section}>
            <img alt="logomarca" src={logo} />
        </section>
    );
}