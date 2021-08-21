import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { database, auth } from '../../service/firebase';
import illustationImg from "../../assets/img/illustration.svg";
import logoImg from "../../assets/img/logo.svg";
import { Button } from "../../compoments/Button";
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';
export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom,setNewRoom] = useState('');
  
  async function handleLogout(){
    await auth.signOut();
    history.push('/');
  }
  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title:newRoom,
      authorId:user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`)
  }
  async function handleSearchRoom(event: FormEvent){
    event.preventDefault();

    history.push(`/search/rooms/${user?.id}`)
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
         <form onSubmit={handleCreateRoom}>
            <h3>Olá,{user?.name}</h3>
            <input type="text" placeholder="Nome da sala" value={newRoom} onChange={(event) => setNewRoom(event.target.value)}/>
            <Button type="submit">Criar sala</Button>
            <button className="btn-logout" onClick={handleLogout}>
              Trocar de conta
            </button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
          <button onClick={handleSearchRoom}>Ver suas salas</button>
       
        </div>
      </main>
    </div>
  );
}
