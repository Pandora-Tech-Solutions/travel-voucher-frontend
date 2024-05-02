import Image from "next/image";

import BannerImage from "../../images/banner-image.jpg"
import LaikeLogo from "../../public/laike.svg";
import ValeViagem from "../../public/vale-viagem.svg";
import Gift from "../../icons/gift.svg";
import Calendar from "../../icons/schedule.svg";
import Globe from "../../icons/travel.svg";
import Money from "../../icons/money.svg";
import PigMoney from "../../icons/pig-money.svg";
import Card from "../../icons/card.svg";
import Travelers from "../../images/travelers.png";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.heroBannerWrapper}>
        <div className={styles.headerHomeWrapper}>
          <Image
            src={LaikeLogo}
            alt="Laike Turismo Logo"
            className={styles.logo}
          />
          <h1 className={styles.pageTitle}>Vale Viagem</h1>
          <div className={styles.heroBanner}>
            <Image src={ValeViagem} alt="Garanta seu Vale Viagem" />
          </div>
        </div>
      </header>
      <div className={styles.banner}>
        <Image src={BannerImage} alt="Viaje com o Vale Viagem Laike" loading="eager" />
      </div>
      <section className={styles.body}>
        <div>
          <h2 className={styles.bodyTitle}>Viaje mais com o Vale-Viajem Laike</h2>
          <div className={styles.cardWrapper}>
            <div className={styles.card}>
              <Image src={Money} alt="Viaje sem preocupações financeiras!" />
              <h3>Viaje sem preocupações financeiras!</h3>
              <p>
                Com o Vale Viagem, aproveite o pagamento em até 4x sem juros,
                dividindo o valor da sua aventura conforme suas necessidades.
                Garanta uma experiência inesquecível com comodidade e
                flexibilidade.
              </p>
            </div>
            <div className={styles.card}>
              <Image src={Card} alt="Mantenha sua aventura viva!" />
              <h3>Mantenha sua aventura viva!</h3>
              <p>
                Recarregue seu Vale Viagem a partir de R$200, com recargas
                ilimitadas. Controle o valor conforme seus planos de viagem,
                proporcionando flexibilidade e liberdade.
              </p>
            </div>
            <div className={styles.card}>
              <Image src={Calendar} alt="Liberdade de Escolha!" />
              <h3>Liberdade de Escolha!</h3>
              <p>
                Com o Vale Viagem, escolha a data e destino que melhor se
                adequam a você. Desfrute da liberdade total para escapadas de
                fim de semana ou jornadas internacionais, decidindo conforme
                suas preferências.
              </p>
            </div>
            <div className={styles.card}>
              <Image src={Gift} alt="Surpreenda com segurança!" />
              <h3>Surpreenda com segurança!</h3>
              <p>
                O Vale Viagem é o presente ideal, proporcionando experiências
                únicas. Permita que os destinatários escolham suas próprias
                aventuras, garantindo momentos inesquecíveis com total
                tranquilidade.
              </p>
            </div>
            <div className={styles.card}>
              <Image src={Globe} alt="Explore seu país ou descubra novos horizontes!" />
              <h3>Explore seu país ou descubra novos horizontes!</h3>
              <p>
                O Vale Viagem é aceito em destinos nacionais e internacionais,
                oferecendo possibilidades ilimitadas para vivenciar experiências
                memoráveis ao redor do mundo.
              </p>
            </div>
            <div className={styles.card}>
              <Image src={PigMoney} alt="Economize inteligentemente com o Vale Viagem!" />
              <h3>Economize inteligentemente com o Vale Viagem!</h3>
              <p>
                Planeje com antecedência, aproveite descontos exclusivos e
                transforme cada centavo investido em momentos memoráveis durante
                suas viagens.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.formWrapper}>
        <div className={styles.bg} />
        <form action="">
          <h3>Entre em contato e fale com um de nossos <b>especialistas</b></h3>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="WhatsApp" />
          <button type="submit">Enviar Solicitação</button>
        </form>
        <Image src={Travelers} alt="Entre em contato, e viva aventuras!S" />
      </section>
      <footer>
        <section>
          <Image src={LaikeLogo} alt="Laike Turismo Logo" />
          <div>
            <span>(19) 98706-2611</span>
            <span>(19) 3722-0900</span>
            <Link href="#">FAÇA PARTE DO NOSSO TIME</Link>
          </div>
        </section>
      </footer>
    </main>
  );
}
