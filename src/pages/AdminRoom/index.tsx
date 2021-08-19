import { useParams, useHistory } from "react-router-dom";

import logoImg from "../../assets/img/logo.svg";
import deleteImg from '../../assets/img/delete.svg';

import { Button } from "../../compoments/Button";
import { Question } from "../../compoments/Question";
import { RoomCode } from "../../compoments/RoomCode";
// import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../service/firebase";

import '../Room/styles.scss';


type RoomParams = { 
    id:string;
}
export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();
    const { questions , title } = useRoom(roomId);

    async function handleEndRoom(){
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
      history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
      if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      }
    }

  return (
    <div id="page-room">
     <header>
        <div className="content">
            <img src={logoImg} alt="Letmeask" />
            <div>
                <RoomCode code={roomId} />
                <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
            </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
        </div>

        <div className="question-list">
        { questions.map( question => {
          return( 
            <Question
              key={question.id}   
              content={question.content}
              author={question.author}
            >
              <button
              type="button"
              onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta"/>
              </button>
            </Question>
          )
        })}
        </div>
      </main>
    </div>
  );
}
