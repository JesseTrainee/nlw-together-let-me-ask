import { FormEvent, useState,} from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import googleIconImg from "../../assets/img/google-icon.svg";
import illustationImg from "../../assets/img/illustration.svg";
import logoImg from "../../assets/img/logo.svg";
import { Button } from "../../compoments/Button";
import toast, { Toaster } from 'react-hot-toast';
import { database, auth } from "../../service/firebase";

import './styles.scss';
export function Home() {
  const history = useHistory();
  const { signInWithGoogle } = useAuth();
  const [roomCode,setRoomCode] = useState('')

  async function handleCreateRoom(){
    auth.onAuthStateChanged(async function(user) {
      if(!user){
        await signInWithGoogle();
      }
      history.push('/rooms/new');
    })
  }  

 
  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      toast.error('Campo vazio')
      return  ;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      toast.error("Sala não existente");
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed.');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <Toaster />
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
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text" 
            placeholder="Digite o código da sala"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type="submit">

              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
