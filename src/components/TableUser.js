
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from './services/userService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEdit';
import _, { debounce } from 'lodash'
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
const TableUser = () => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [sortBy, setSortBy] = useState('asc')//increasing
    const [sortField, setSortField] = useState('id')

    const [keyWord, setKeyWord] = useState('')

    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        cloneListUser[index].last_name = user.last_name
        cloneListUser[index].email = `${user.first_name}.${user.last_name}@reqres.in`

        setListUsers(cloneListUser)
    }
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
        console.log(user)
    }
    useEffect(() => {
        //call api
        getUsers(1)
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data) {
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true)
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        // let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUsers(cloneListUser)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)

        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUsers(cloneListUser)
    }
    const handleSearch = debounce((event) => {
        let searchKeyWord = event.target.value
        if (searchKeyWord) {
            let cloneListUser = _.cloneDeep(listUsers)
            cloneListUser = cloneListUser.filter(item => item.email.includes(searchKeyWord))
            // cloneListUser = _.includes(cloneListUser, )
            console.log(cloneListUser)
            setListUsers(cloneListUser)
        } else {
            getUsers(1)
        }
    }, 500)

    const getUsersExport = (event, done) => {
        let result = []
        if (listUsers && listUsers.length > 0) {
            result.push(['Id', 'Email', 'First Name', 'Last Name'])
            listUsers.map((item, index) => {
                let arr = []
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(arr)
            })
            setDataExport(result)
            toast.success('Export succeed')
            done()
        }
    }
    const handleImportCSV = (event) => {
        // if (event.target.files?.[0]) {
        //     let file = event.target.files[0]
        //     if (file.type !== 'text/csv') {
        //         toast.error('only accept csv file')
        //         return
        //     }
        //     console.log(file)

        //     Papa.parse(file, {
        //         header: true,
        //         complete: function (results) {
        //         }
        //     })
        // }
        toast.warning('Function is updating')

    }
    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span><b>List Users:</b></span>
                <div className='group-btn mt-sm-2'>
                    <label htmlFor='test' className='btn btn-warning'><i className="fa-solid fa-file-import"></i> Import</label>
                    <input id='test' type='file' hidden
                        onChange={(event) => handleImportCSV(event)}
                    />
                    {/* <button className='btn btn-warning'></button> */}
                    <CSVLink
                        filename={"user.csv"}
                        className="btn btn-primary"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    ><i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>

                    <button
                        className='btn btn-success'
                        onClick={() => setIsShowModalAddNew(true)}
                    >
                        <i className="fa-solid fa-circle-plus"></i> Add New </button>
                </div>

            </div>
            <div className='col-12 col-sm-5 my-3' style={{ border: '1px solid #a2a1a1' }}>
                <input style={{ border: 'none' }} type='text' className='form-control' placeholder='search user by email...' onChange={(event) => handleSearch(event)} />
            </div>
            <div className='custom-table'>

                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span className='sort-icon'>
                                        <i
                                            onClick={() => handleSort('desc', 'id')}
                                            className="fa-solid fa-arrow-down-long"
                                        ></i>
                                        <i
                                            onClick={() => handleSort('asc', 'id')}
                                            className="fa-solid fa-arrow-up-long"
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className='sort-header'>
                                    <span>First Name</span>
                                    <span className='sort-icon'>
                                        <i
                                            onClick={() => handleSort('desc', 'first_name')}
                                            className="fa-solid fa-arrow-down-long"
                                        ></i>
                                        <i
                                            onClick={() => handleSort('asc', 'first_name')}
                                            className="fa-solid fa-arrow-up-long"
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers && listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className='btn btn-warning mx-3'
                                                onClick={() => handleEditUser(item)}
                                            >Edit</button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteUser(item)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table >
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />


            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
                handleClose={handleClose}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />

        </>
    );
};

export default TableUser;