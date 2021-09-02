import axios from "axios";
import {useEffect, useState} from "react";
const EndPoint = 'https://reqres.in/api/users?page=';

const Users = ()=>{
    const [page,setPage] = useState(1);
    const [users,setUsers] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [err,setError] = useState(false);

    useEffect(()=>{
        fetchUsers();
    },[page]);

    const fetchUsers =async ()=>{
        console.log(`${EndPoint}${page}`);
        if(!err) {
            const res = await axios.get(`${EndPoint}${page}`);
            if (res.data.data.length > 0) {
                setUsers(users.length > 0 ? [...users, res.data.data] : [res.data.data]);
                setCurrentPage(page);
            } else {
                setError(true);
                setPage(page - 1);
            }
        }
        console.log(users);
    }
    return(
        <div>
            {console.log(users,page,currentPage,err)}
            {
                err? <h1>Example heading <span className="badge bg-secondary">No data found</span></h1>:<ul className="list-group w-50 m-auto">
                    {
                        users[currentPage-1] && users[currentPage-1].map((u,index)=>
                            <li className="page-item"><a className="page-link" href="#">{u.first_name}</a></li>
                        )
                    }
                </ul>
            }

            <nav aria-label="..." className="mx-auto my-5 justify-content-center w-25">
                <ul className="pagination ">

                    {
                        users && users.map((u,index)=>
                            <li className="page-item"><a className="page-link" href="#" onClick={()=>{
                                setCurrentPage(index+1);
                                setError(false);
                            }}>{index+1}</a></li>
                        )
                    }
                    <li className="page-item" onClick={()=> setPage(page+1)}>
                        <a className="page-link" href="#" >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export  default  Users;
