import { controllerAPI } from '../../api/controller.api';
const Auth = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
        <button onClick={() => controllerAPI.signIn()} className="px-3 py-1 rounded-xl font-bold bg-blue-600">Войти с помощью Google</button>
    </div>
  )
}

export default Auth