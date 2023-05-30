import React, { useState } from 'react'
import TextField from '../TextField';
import DropdownList from '../DropdownList';
import { getCity } from "../../feature/citySlice"
import { getstatusleads,getleads,patchleadsbyId,postleads,getleadsbyId } from '../../feature/leadSlice'
import { useSelector, useDispatch } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import Button from '../../components/Button'


function AddEditModel(props) {
    const { handleClose, EditableId, Add } = props
    const dispatch = useDispatch()
    const [localState, setlocalState] = useState({
        'phoneNumber': null,
        'name': null,
        'email': null,
        'city': null,
        'leadStatus': null
    })
    const cities = useSelector(state => state.city.cityList)
    const leadStatus = useSelector(state => state.lead.LeadStatus)
    const LeadById = useSelector(state => state.lead.LeadById)

    console.log(LeadById,"here is data")
    React.useEffect(() => {
        dispatch(getCity())
        dispatch(getstatusleads())
        if(EditableId && !Add){
            const data = {
                body: {
                    id: EditableId
                }
            }
            dispatch(getleadsbyId(data))
        }
    }, [EditableId])

    React.useEffect(()=>{
        setlocalState({
        'phoneNumber': LeadById?.phoneNumber,
        'name': LeadById?.name,
        'email': LeadById?.email,
        'city': LeadById?.city._id,
        'leadStatus': LeadById?.leadStatus._id
        })
    },[LeadById])

    const handleChange = (e) => {
        setlocalState(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }


    
    const afterSubmit = async () => {
        if (localState.phoneNumber && Add) {
            const data = {
                body: {
                    ...localState
                }
            }
            await dispatch(postleads(data))
        }else if(!Add){
            const data = {
                body : {
                    ...localState,
                   
                },
                id: EditableId
            }
            await dispatch(patchleadsbyId(data))
        }

        await dispatch(getleads())
        handleClose()
    }

    const handleDropdownChange = (name,value) => {
        setlocalState(prev => ({
            ...prev,
            [name] : value
        }))
    }

    return (
        <>
            <div className='grid grid-rows-4 grid-cols-2 gap-4'>
                <TextField name={'phoneNumber'} value={localState.phoneNumber} onChange={handleChange} label='Phone Number' />
                <TextField name={'name'} value={localState.name} onChange={handleChange} label='Name' />
                <TextField name={'email'} value={localState.email} onChange={handleChange} label='Email' />
                {/* <TextField name={'phoneNumber'} label='Next Update On' /> */}
                <DropdownList title='City' name="city" value={localState.city} setvalue={handleDropdownChange} >
                    {cities?.map((item) => {
                        return (
                            <MenuItem value={item._id}>{item.cityName}</MenuItem>
                        )
                    })}
                </DropdownList>
                <DropdownList title='Lead Status' name="leadStatus" value={localState.leadStatus} setvalue={handleDropdownChange} >
                    {leadStatus?.map((item) => {
                        return (
                            <MenuItem value={item._id}>{item.leadStatus}</MenuItem>
                        )
                    })}
                </DropdownList>

            </div>
            <div className='flex justify-center align-middle'>
                <Button onClick={() => { afterSubmit() }} css={'py-4 mx-2'} text={'Submit'} />
                <Button onClick={() => { handleClose() }} css={'py-4 mx-2'} text={'Cancel'} color='error' />
            </div>
        </>
    )
}

export default AddEditModel