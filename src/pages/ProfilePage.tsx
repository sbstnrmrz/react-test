import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import * as api from '../api/index'

type Inputs = {
  firstName: string,
  lastName: string,
  username: string,
};

export const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const showModal = () => setShowEditModal(true);
  const hideModal = () => setShowEditModal(false);
  const {loggedUser} = useContext(AppContext);

  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const [data, setData] = useState('');

  const [user, setUser] = useState<api.Users.User | undefined>();
  const [isUserLogged, setIsUserLogged] = useState(false);
  
  const navigate = useNavigate();

  const {username} = useParams();
//if (username == undefined) {
//  navigate('/login');
//}

  useEffect(() => {
    const loadUser = async() => {
      try {
        if (username == undefined) return;
        const _user = await api.Users.getUser(username);
        console.log(`load user: ${username}`);
        
        setUser(_user);
        console.log('logged user:');
        console.log(loggedUser);
        if (_user.username == loggedUser?.username) {
          console.log('tralalero tralala');
          setIsUserLogged(true); 
        }
      } catch (error) {
        throw `Error loading user: ${username}. Error: ${error}`
      }
    }

    loadUser();
    return;
  }, [username]);


  const onSubmit: SubmitHandler<Inputs> = async(data) => {

  }

  return (
    <div>
      {showEditModal &&
        <div className="modal-container">
          <div className="p-8 bg-[#292929] shadow-xl rounded-[8px]">
            <div className="flex justify-end">
              <button 
              className="flex cursor-pointer items-center justify-center w-[32px] h-[32px] text-[24px] hover:text-white/60"
              onClick={hideModal}
              >
              X
              </button>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div>
              <span className="block text-base font-bold">First name</span>
              <input className="input-style" type="text" 
                {...register("firstName", {
                  value: 'nombre',
                  required: 'first name is required',
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Invalid first name',
                  },
                  maxLength: 30
                })
                } 
              />
            </div>
            <div>
              <span className="block text-base font-bold">Last name</span>
              <input className="input-style" type="text" 
                {...register("lastName", {
                  value: 'apellido',
                  required: 'last name is required',
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Invalid last name',
                  },
                  maxLength: 30
                })
                } 
              />
            </div>
            <div>
              <span className="block text-base font-bold">Username</span>
              <input className="input-style" type="text" 
                {...register("username", {
                    value: 'user',
                  required: 'username is required',
                  pattern: {
                    value: /^[A-Za-z0-9$*#_\-.]+$/,
                    message: 'invalid username',
                  },
                })
                } 
              />
            </div>
            <button className="button-style">Save Changes</button>
          </form>
          </div>

        </div>
      }

      <div className="p-8 bg-[#292929] shadow-xl rounded-[8px]">
        <div className="flex justify-between items-center">
          <div>
            <span className="block text-[22px] font-bold">{`${user?.firstName} ${user?.lastName}`}</span>
            <span className="block text-base">{`@${user?.username}`}</span>
            {isUserLogged && 
              <span className="text-base">{`${user?.email}`}</span>
            }
          </div>
          <button 
            className="button-style h-10"
            onClick={() => setShowEditModal(!showEditModal)}
          >
            Edit Account Info
          </button>
        </div>
        <hr className="my-4"/>
        <div className="event-posts-container" onClick={() => {}}> <div className="event-post p-4 rounded-[6px] border-white border-1 break-words">
          <p>ajsdklashdlkashdkaslahskdbaskdbajsdkabdbajkbsdkjabdkabskdjbkasdhasdkjahdjkahdkahsdkjashdkhsa</p>
          <div className="bottom-0 text-gray-400">
            Creado el: 04/05/25 | Ocurre el: 08/08/25 | Tiempo restante: 20 dias
          </div>
        </div>
          <div className="event-post p-4 rounded-[6px] border-white border-1 break-words">
            <p>ajsdklashdlkashdkaslahskdbaskdbajsdkabdbajkbsdkjabdkabskdjbkasdhasdkjahdjkahdkahsdkjashdkhsa</p>
            <div className="bottom-0 text-gray-400">
              Creado el: 04/05/25 | Ocurre el: 08/08/25 | Tiempo restante: 20 dias
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
