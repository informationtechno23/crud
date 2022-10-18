import React, { useEffect, useState } from 'react'
import axios from '../../axiosInstance/axios'
import { Link } from 'react-router-dom';
import { Spinner2 } from '../'
import { setLoading } from '../../app/features/mainReducer';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

const ListUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const LIMIT = 25;
  const [showSpinner, setShowSpinner] = useState(true);
  const [message, setMessage] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [disabledButton, setDisabledButtons] = useState(false)
  
  let skip = 0;
  const getUsers = () => {
    setLoading(true);
    axios.get('/?limit=' + LIMIT + '&skip=' + skip)
      .then(res => {
        if (res.status === 200) {
          appendUsers(res.data);
          skip += LIMIT;
        } else {
          setShowSpinner(false);
        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
      })
  }
  
  const appendUsers = (users: User[]) => {
    setUsers(users);
  } 
  
  console.log(users)
  useEffect(() => {
    getUsers();
    if (showSpinner) {
      window.addEventListener('scroll', () => {
          if ((window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight)) {
              setTimeout(() => {
                getUsers();
              }, 200);
          }
        })
    }
  }, []);
  
  const deleteUser = (id: string) => {
    setDisabledButtons(true);
    axios.delete('delete/' + id)
      .then(res => {
        const data = JSON.parse(JSON.stringify(res.data));
        setMessage(data.message);
        setSuccess(res.status === 202);
        // getUsers();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setDisabledButtons(false);
      })
  }
  return (
    <div className="flex flex-col mb-92">
      {message &&
        <div className={["Alert", success ? "AlertSuccess" : "AlertDanger",].join(" ")}>
          {message}
        </div>
      }
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="Table table-auto">
              <thead className="Thead">
                <tr>
                  <th scope="col" className="Table-Th">
                    #
                  </th>
                  <th scope="col" className="Table-Th">
                    Name
                  </th>
                  <th scope="col" className="Table-Th">
                    Email
                  </th>
                  <th scope="col" className="Table-Th">
                    Mobile
                  </th>
                  <th scope="col" className="Table-Th">
                    Actions
                  </th>
                </tr>
              </thead >
              <tbody>
                {users && users.map(user => {
                  return (
                    <tr className="Table-Tr " key={user.id}>
                      <td className="Table-Td">
                      {user.id}
                      </td>
                      <td className="Table-Td">
                        {user.name}
                      </td>
                      <td className="Table-Td">
                      {user.email}
                      </td>
                      <td className="Table-Td">
                      {user.mobile}
                      </td>
                      <td className='Table-Actions'>
                        <Link
                          to={`/user/${user.id}/edit`}
                          className="Btn BtnPrimary">Edit</Link>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className={['Btn BtnDanger', disabledButton ? 'disabled' : ''].join(" ")}>Delete</button>
                      </td>
                    </tr >
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Spinner2 show={showSpinner} />
    </div>
  )
}

export default ListUser