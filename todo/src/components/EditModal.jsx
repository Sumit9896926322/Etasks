import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import {useState} from "react";

const EditModal = ({todoText,editTodo,todoId,setModalVisible})=>{
    {console.log('hello')}
    const [editText,setEditText] = useState(todoText);
    return(
        <Modal show={setModalVisible} onHide={()=>setModalVisible(false)}>
            <Modal.Header >
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        aria-label="Default"
                        onChange={(e)=>setEditText(e.target.value)}
                        aria-describedby="inputGroup-sizing-default"
                        defaultValue={todoText}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setModalVisible(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=> {
                    editTodo(todoId,editText);
                    setModalVisible(false);
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        // <div show={true} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
        //      aria-hidden="true">
        //     <div className="modal-dialog">
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
        //                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //             </div>
        //             <div className="modal-body">
        //                 {todoText}
        //             </div>
        //             <div className="modal-footer">
        //                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setModalVisible(false)}>Cancel</button>
        //                 <button type="button" className="btn btn-primary" onClick={()=> editTodo(todoId)}>Save changes</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
export default  EditModal;
