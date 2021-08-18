import { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../../assets/img/logo.svg";
import { Button } from "../../compoments/Button";
import { Question } from "../../compoments/Question";
import { RoomCode } from "../../compoments/RoomCode";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../service/firebase";
import './styles.scss';

type FirebaseQuestions = Record<string,{
  author:{
    name:string;
    avatar:string;
  }
  content:string;
  isAnswered:boolean;
  isHighlighted:boolean;
}>

type QuestionType = {
  id:string;
  author:{
    name:string;
    avatar:string;
  }
  content:string;
  isAnswered:boolean;
  isHighlighted:boolean;
}

type RoomParams = {
    id:string;
}
export function Room() {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType []>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [title,setTitle] = useState('');
    const params = useParams<RoomParams>();
    const roomId = params.id;

    useEffect(() => {
      const roomRef = database.ref(`rooms/${roomId}`);

      roomRef.on('value',room => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

        const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
          return{
            id:key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        })
        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions);
      })
    },[roomId]);

    async function handleSendQuestion(event: FormEvent){
      event.preventDefault();

      if(newQuestion.trim() === ''){
        return;
      }

      if(!user){
        throw new Error('You must be logged in');
      }

      const question = {
        content: newQuestion,
        author:{
          name: user.name,
          avatar: user.avatar,
        },
        isHighlighted: false,
        isAnswered: false
      };
      await database.ref(`rooms/${roomId}/questions`).push(question);

      setNewQuestion('');
    }

  return (
    <div id="page-room">
     <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
          placeholder="O que você quer perguntar?"
          onChange={event => setNewQuestion(event.target.value)}
          value={newQuestion}
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar}/>
                <span>{user.name}</span>
              </div>
            ):
            <span>Para enviar uma pergunta, <button>faça seu login</button></span> 
            }
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
        <div className="question-list">
        { questions.map( question => {
          return( 
            <Question
              key={question.id}   
              content={question.content}
              author={question.author}
            />
          )
        })}
        </div>
      </main>
    </div>
  );
}
