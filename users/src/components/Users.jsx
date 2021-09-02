import axios from "axios";
import {useEffect, useState} from "react";
const EndPoint = 'https://reqres.in/api/users?page=';

const Users = ()=>{
    const [page,setPage] = useState(1);
    const [users,setUsers] = useState([]);
    const [currPage,setCurrentPage] = useState(0);
    const [err,setError] = useState(false);

    useEffect(()=>{
        fetchUsers(page);
    },[]);

    useEffect(()=>{
        console.log(currPage);
        if(users[currPage]) {
            setError(false);
            setPage(currPage+1);
        }
    },[currPage]);

    const fetchUsers =async (page)=>{
            const res = await axios.get(`${EndPoint}${page}`);
                if (res.data.data.length > 0 && !users[page-1]) {
                    setUsers(users.length > 0 ? [...users, res.data.data] : [res.data.data]);
                    setError(false);
                    setPage(page);
                } else {
                    setError(true);
                }
            setCurrentPage(page-1);

        // console.log(`${EndPoint}${page}`);
        // if(!err) {
        //     const res = await axios.get(`${EndPoint}${page}`);
        //     if (res.data.data.length > 0) {
        //         setUsers(users.length > 0 ? [...users, res.data.data] : [res.data.data]);
        //         setCurrentPage(page);
        //     } else {
        //         setError(true);
        //         setPage(page - 1);
        //     }
        // }
        // console.log(users);
    }
    return(
        <div>
            {console.log(users,page,err,currPage)}
            {
                err? <h1> <span className="badge bg-secondary my-5">No data found</span></h1>:<ul className="list-group w-50 my-5 m-auto">
                    {
                        users[currPage] && users[currPage].map((u,index)=>
                            <li style={{listStyleType:'none'}} className="page-item"><a className="page-link" href="#">{u.first_name}</a></li>
                        )
                    }
                </ul>
            }

            <nav aria-label="..." className="mx-auto my-5 justify-content-center w-25">
                <ul className="pagination  justify-content-center">

                    {
                        users && users.map((u,index)=>
                            <li className="page-item"><a className="page-link" href="#" onClick={()=>setCurrentPage(index)}>{index+1}</a></li>
                        )
                    }
                    <li className="page-item" onClick={()=> fetchUsers(page+1)}>
                        <a className="page-link" href="#" >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export  default  Users;
