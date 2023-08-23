import React, { useState } from 'react'
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const  UsersInsert = (props) => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: ''
    })
    const [isLoading, setLoding] = useState(false);

    const saveUser = async () => {
        setLoding(true);
        try {
            await api.insertUser(user).then(res => {
                window.alert(`User inserted successfully`)
                setUser({
                    firstname: '',
                    lastname: '',
                    email: ''
                })
                setLoding(false);
            })
        } catch(error) {
            setLoding(false);
            alert(error.response.data.error ? error.response.data.error : 'Internal server error.');
        }
    }

    return (
        <Wrapper>
            <Label>First Name: </Label>
            <InputText
                type="text"
                value={user.firstname}
                onChange={(e)=> {
                    setUser({
                        ...user,
                        firstname: e.target.value
                    })
                }}
            />

            <Label>Last Name: </Label>
            <InputText
                type="text"
                value={user.lastname}
                onChange={(e)=> {
                    setUser({
                        ...user,
                        lastname: e.target.value
                    })
                }}
            />

            <Label>Email: </Label>
            <InputText
                type="text"
                value={user.email}
                onChange={(e)=> {
                    setUser({
                        ...user,
                        email: e.target.value
                    })
                }}
            />

            <Button onClick={saveUser} disabled={isLoading || !user.firstname || !user.lastname || !user.email}>
                {isLoading? 'Saving...' : 'Save'}
            </Button>
            <CancelButton href={'/users/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default UsersInsert