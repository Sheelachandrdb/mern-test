import React, { useEffect, useState } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoding] = useState(false);

    const initUsers = async () => {
        setLoding(true);
        try {
            await api.getAllUsers().then(users => {
                setUsers(users.data.data);
                setLoding(false);
            })
        } catch(error) {
            setLoding(false);
            setUsers([]);
        }
    }

    const columns = [
        {
            Header: 'First Name',
            accessor: 'firstname',
            filterable: false,
        },
        {
            Header: 'Last Name',
            accessor: 'lastname',
            filterable: false,
        },
        {
            Header: 'Email',
            accessor: 'email',
            filterable: false,
        },
    ]

    useEffect(() => {
        initUsers();
    }, []);

    return (
        <Wrapper>
            <ReactTable
                data={users}
                columns={columns}
                loading={isLoading}
                defaultPageSize={10}
                showPageSizeOptions={true}
                minRows={0}
            />
        </Wrapper>
    )
}

export default UsersList