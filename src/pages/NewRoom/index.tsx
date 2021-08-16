import { Link } from 'react-router-dom';

import illustationImg from "../../assets/img/illustration.svg";
import logoImg from "../../assets/img/logo.svg";
import { Button } from "../../compoments/Button";

import './styles.scss';
export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p> Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
         <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}