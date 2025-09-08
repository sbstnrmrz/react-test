import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import * as api from '../api/index'
import { _Event } from "../api/events";
import {EventPost} from "../components/EventPost"
import { modifyUser, saveUserToLocalStorage } from "api/users";

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
  console.log('context loggedUser');
  console.log(loggedUser);

  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>()
  const [data, setData] = useState('');

  const [user, setUser] = useState<api.Users.User | undefined>();
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [saveChangesButtonDisabled, setSaveChangesButtonDisabled] = useState(false);

  const [posts, setPosts] = useState<_Event[]>([]);

  
  const navigate = useNavigate();
  const {username} = useParams();

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();
    
    // loads user info
    const loadUser = async() => {
      try {
        if (username == undefined) return;
        const _user = await api.Users.getUser(username);
        console.log(`load user: ${username}`);
        if (_user.id == undefined) return;
        const _posts = await api.Events.getUserEventPosts(_user.id);

        setUser(_user);
        setPosts(_posts);
        console.log('logged user:');
        console.log(loggedUser);
        console.log('fetched event posts:');
        console.log(posts);
        
        if (_user.username === loggedUser?.username) {
          console.log('tralalero tralala');
          setIsUserLogged(true); 
        }

      } catch (error) {
        throw `Error loading user: ${username}. Error: ${error}`
      }
    }

    loadUser();
    return () => {
      controller.abort();
    }
  }, [loggedUser]);


  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    if (loggedUser == undefined) return;    

    const checkUserExists = await api.Users.checkUserExists(data.username);
    if (checkUserExists && loggedUser.username != data.username) return; 
    
    // copies the logged user and modifies it to send it to the backend
    const user: api.Users.User = {
      ...loggedUser,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    setSaveChangesButtonDisabled(true);
    await modifyUser(user);
    setSaveChangesButtonDisabled(false);
    saveUserToLocalStorage(user);
    hideModal();

    navigate(`/profile/${user.username}`);
  }

  const renderPosts = () => {
    return posts.map(post => {
      return <EventPost key={post.id} eventPost={post}/>
    })
  }

  return (
    <div className=" p-6 w-full max-w-[650px] h-[100vh] overflow-auto">
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
              <input className="input-style3" type="text" 
                {...register("firstName", {
                  value: loggedUser?.firstName,
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
              <input className="input-style3" type="text" 
                {...register("lastName", {
                  value: loggedUser?.lastName,
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
              <input className="input-style3" type="text" 
                {...register("username", {
                  value: loggedUser?.username,
                  required: 'username is required',
                  pattern: {
                    value: /^[A-Za-z0-9$*#_\-.]+$/,
                    message: 'invalid username',
                  },
                })
                } 
              />
            </div>
            <button className="button-style" disabled={saveChangesButtonDisabled}>Save Changes</button>
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
          {loggedUser?.username == user?.username &&
            <button 
              className="button-style h-10"
              onClick={() => setShowEditModal(!showEditModal)}
            >
              Edit Account Info
            </button>
          }
        </div>
        <hr className="my-4"/>
        <div className="event-posts-container" onClick={() => {}}> 
          {renderPosts()}
        </div>
      </div>

    </div>
  )
}
