import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Profile = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [userData, setUserData] = useState({ name: "", email: "" });

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/user/details', { headers: { token } });
            if (response.data.success) {
                setUserData(response.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) fetchUserProfile();
    }, [token]);

    return (
        <div className='pt-10 border-t'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>
            
            <div className='flex flex-col gap-4 p-8 mt-10 border bg-gray-50 rounded-lg max-w-lg'>
                <div>
                    <p className='text-gray-500 text-sm'>Full Name</p>
                    <p className='text-lg font-medium text-gray-800'>{userData.name || "Loading..."}</p>
                </div>
                <hr />
                <div>
                    <p className='text-gray-500 text-sm'>Email Address</p>
                    <p className='text-lg font-medium text-gray-800'>{userData.email || "Loading..."}</p>
                </div>
                <hr />
                <div className='mt-4'>
                    <button className='bg-black text-white px-8 py-2 text-sm active:bg-gray-700'>EDIT PROFILE</button>
                </div>
            </div>
        </div>
    )
}

export default Profile