import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <img src="/vercel.svg" alt="Laike Turismo Logo" className={styles.logo} />
        <h1>Vale Viagem</h1>
        <div className="heroBanner">
          <img src="#" alt="Garanta seu Vale Viagem" />
        </div>
      </header>
      
    </main>
  );
}
