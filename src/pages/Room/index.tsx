import { useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../../assets/img/logo.svg";
import { Button } from "../../compoments/Button";
import { RoomCode } from "../../compoments/RoomCode";

import './styles.scss';

type RoomParams = {
    id:string;
}
export function Room() {
    const [newQuestion, setNewQuestion] = useState('');
    const params = useParams<RoomParams>();
    const roomId = params.id;
  return (
    <div id="page-room">
      <header>
        <img src={logoImg} alt="letmeask" />
        <RoomCode code={roomId} />
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span> 4 perguntas </span>
        </div>

        <form>
          <textarea 
          placeholder="O que você quer perguntar?"
          onChange={event => setNewQuestion(event.target.value)}
          />

          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
