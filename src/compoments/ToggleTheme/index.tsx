import { useContext , FormEvent} from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import './styles.scss'
export const ToggleTheme = () => {
 const context = useContext(ThemeContext)
  function toggle(event: FormEvent){
    event.preventDefault();
    context.toggleThemeMode()
  }
return (
    
    <button className="toggle-btn" onClick={(event) =>  toggle(event)}>
       Trocar tema!
    </button>
    
  )
}