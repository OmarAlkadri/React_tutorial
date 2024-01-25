/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable spaced-comment */
import * as React from 'react'
import { CssBaseline } from '@mui/material'
import { showErrorMessage } from './../../notification'
import Loader from '../../components/loaderComponent/Loader'

interface IPropTypes {

}
const UserManagement = (props: IPropTypes) => {
    React.useEffect(() => {
        fetchUsers()
    }, [])
    const [loading, setLoading] = React.useState(true);



    const fetchUsers = async () => {
        try {

            setLoading(false)
        } catch (error: any) {
            showErrorMessage({
                message: '',
                description: error.message,
            })
        }
    }


    return (
        <Loader loaded={!loading} onlySpinner={false}>
            <CssBaseline></CssBaseline>

        </Loader>
    )
}

export default UserManagement
