import { FormEvent} from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../../assets/img/logo.svg";
import emptyQuestionsImg from '../../assets/img/empty-questions.svg';

import { Button } from "../../compoments/Button";
import { Question } from "../../compoments/Question";
import { RoomCode } from "../../compoments/RoomCode";
import { useAuth } from "../../hooks/useAuth";

import { database } from "../../service/firebase";
import { Link } from 'react-router-dom';
import "./styles.scss";

type RoomParams = {
  id: string;
};
export function SearchRoom() {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState("");
  const params = useParams<RoomParams>();
  const roomId = params.id;

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <Link to="/"><Button> Sair </Button></Link>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala </h1>
   
        </div>

     
        <div className="question-list">
        
        </div>
      </main>
    </div>
  );
}
