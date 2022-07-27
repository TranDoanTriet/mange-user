import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from './services/userService';
import { toast } from 'react-toastify';
const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props
    const [fistName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // const [job, setJob] = useState('')

    const handleEditUser = async () => {
        let res = await putUpdateUser(fistName, lastName)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: fistName,
                last_name: lastName,
                id: dataUserEdit.id
            })
            handleClose()
            toast.success('Update succeed')
        }
    }



    useEffect(() => {
        if (show) {
            setFirstName(dataUserEdit.first_name)
            setLastName(dataUserEdit.last_name)
        }
    }, [dataUserEdit])
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" value={fistName}
                                    onChange={(event) => setFirstName(event.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" value={lastName}
                                    onChange={(event) => setLastName(event.target.value)} />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleEditUser() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditUser;