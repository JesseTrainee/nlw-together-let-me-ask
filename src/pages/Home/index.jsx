import { useHistory } from "react-router-dom";

import { auth, firebase } from '../../service/firebase';
import googleIconImg from "../../assets/img/google-icon.svg";
import illustationImg from "../../assets/img/illustration.svg";
import logoImg from "../../assets/img/logo.svg";
import { Button } from "../../compoments/Button";

import './styles.scss';
export function Home() {
  const history = useHistory();

  function handleCreateRoom(){
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      
      history.push('/rooms/new');
    })

    
  }  

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">out entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
