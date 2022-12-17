import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';
import TodoDeskHeader from '../molecules/TodoDeskHeader';
import TodoList from '../molecules/TodoList';
import { TodosTasks } from '../../store/TodosTasks';
import { IDeskTodos } from 'src/store/DeskTodos';

type Props = {
  data: IDeskTodos
}
const TodoDesk: React.FC<Props> = ({data}) => {
    const tasksList = useRecoilValueLoadable(TodosTasks(data.id))
    const refresh = useRecoilRefresher_UNSTABLE(TodosTasks(data.id))
    if (tasksList.state === 'loading') {
      return (
        <div className="w-3/12 h-full shrink-0 rounded-xl p-2 gap-2 flex flex-col bg-neutral-800">
          <TodoDeskHeader refresh={refresh} listName={data.title} />
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
            <div className="w-full h-full rounded-xl animate-pulse bg-neutral-700" />
          </div>
        </div>
      )
    } else return (
      <div className="w-3/12 h-full shrink-0 rounded-xl p-2 gap-2 flex flex-col bg-neutral-800">
          <TodoDeskHeader refresh={refresh} listName={data.title} />
          <TodoList deskID={data.id} list={tasksList.getValue()} />
      </div>
    )
}

export default TodoDesk