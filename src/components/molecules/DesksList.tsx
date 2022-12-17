import { IDeskTodos } from '../../store/DeskTodos';
import TodoDesk from '../organisms/TodoDesk';
import NewDeskTodo from './NewDeskTodo';
type Props = {
  list: IDeskTodos[]  
}
const DesksList: React.FC<Props> = ({list}) => {
    return (
      <>
          {
              list.map((desk) => <TodoDesk data={desk} key={desk.id} />)
          }
      </>
    )
}

export default DesksList