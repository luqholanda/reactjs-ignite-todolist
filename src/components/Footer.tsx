import styles from "./Footer.module.css";
import { IconFacebook, IconGithub, IconInstagram, IconTwitter } from "./icons/Icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.social}>
          <div className={styles.copyright}>© 2023 Lucas Holanda. Todos os direitos reservados</div>

          <div className={styles.socialIcons}>
            <ul>
              <li>
                <a href="https://github.com/luqholanda/reactjs-ignite-todolist" target="_blank" title="Github">
                  <IconGithub />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/luqqen" target="_blank" title="Facebook">
                  <IconFacebook />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/luqhh" target="_blank" title="Twitter">
                  <IconTwitter />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/luqhh/" target="_blank" title="Instagram">
                  <IconInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
