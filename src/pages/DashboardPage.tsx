import { useContext, useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { AppContext } from "../context/AppContext"
import * as api from '../api/index'
import { useNavigate } from "react-router-dom"
import { getEventPosts, _Event } from "../api/events"
import { EventPost } from "../components/EventPost"
import { getUsers, User } from "../api/users"

export const DashboardPage = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  console.log('profile context:');
  console.log(context);
  const [eventPosts, setEventPosts] = useState<_Event[]>([]);
  const [filteredEventPosts, setFilteredEventPosts] = useState<_Event[]>([]);
  const [filterText, setFilterText] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [userFilter, setUserFilter] = useState('All');

  useEffect(() => {
    const loadEventPosts = async() => {
      const _posts = await getEventPosts();
      setFilteredEventPosts(_posts);
      setEventPosts(_posts);
    }

    const loadUsers = async() => {
      const _users = await getUsers();
      setUsers(_users);
      console.log('users loaded');
    }
    loadEventPosts();
    if (users.length < 1) loadUsers();
    
  }, []);

  useEffect(() => {
    let filtered = [...eventPosts];

    if (userFilter !== "All") {
      const targetUser = users.find(user => user.username === userFilter);
      if (targetUser) {
        filtered = filtered.filter(p => p.userId === targetUser.id);
      }
    }

    if (filterText.trim() !== "") {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    setFilteredEventPosts(filtered);
  }, [userFilter, filterText]);
  


  const handleFilter = (filter: string) => {
    if (filter === 'All') {
      setFilteredEventPosts(eventPosts);
      return
    }
    const targetUser = users.find(user => user.username === filter);
    if (targetUser == undefined) return;

    const filtered = eventPosts.filter(post => post.userId == targetUser.id);
    console.log('filtered posts');
    console.log(filtered);
    
    setFilteredEventPosts(filtered);
  }

  const renderPosts = () => {

    return filteredEventPosts.map(post => {
      console.log('user: ' + post.userId);
      
      return <EventPost key={`${post.id}`} eventPost={post}/>
    });
  }

  return (
    <div className="flex flex-col gap-4 p-6 w-full max-w-[650px] h-[100vh] overflow-auto">
      <div className="">
        <input className="input-style w-full h-10 mb-4" 
          type="text" 
          placeholder="Filter by title" 
          value={filterText}
          onChange={e => {
            setFilterText(e.target.value);
          }}
        />
        <select className="input-style h-10" name="" id=""
          onChange={(e) => {
            setUserFilter(e.target.value);
//          handleFilter(e.target.value);
//          console.log(e.target.value);
          }}
        >
          <option value="All">All</option>
          {users.map(user => <option value={user.username}>{user.username}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {renderPosts()}
      </div>

    </div>
  )
}

