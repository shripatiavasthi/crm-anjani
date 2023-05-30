import React, { useState } from 'react'
import TextField from '../TextField';
import { poststatusleads,getstatusleadsbyId,getstatusleads,patchleadStatusbyId } from "../../feature/leadSlice";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button'


function AddEditModel(props) {
    const { handleClose, EditableId, Add } = props
    const [leadStatus, setleadStatus] = useState("")
    const editleadData = useSelector(state => state.lead.LeadStatusId)
    const dispatch = useDispatch()

    console.log(editleadData, "here")

    React.useEffect(() => {
        if (EditableId !== "" && Add == false) {
            const data = {
                body: {
                    id: EditableId
                }
            }
            dispatch(getstatusleadsbyId(data))
        } else if (Add) {
            setleadStatus('')
        }

    }, [EditableId])

    React.useEffect(() => {
        if (editleadData && Add == false) {
            setleadStatus(editleadData?.leadStatus)
        }
    }, [editleadData])

    const afterSubmit = async () => {
        if (leadStatus && Add) {
            const data = {
                body: {
                    leadStatus
                }
            }
            await dispatch(poststatusleads(data))
        
        }else if(!Add){
            const data = {
                body: {
                    leadStatus
                },
                id: EditableId
            }
            await dispatch(patchleadStatusbyId(data))
        }
        await dispatch(getstatusleads())
        handleClose()
    }

    const onChange = (e) => {
        setleadStatus(e.target.value)
    }

    return (
        <div>
            <TextField value={leadStatus} onChange={onChange} label='Lead Status' />
            <div className='flex justify-center align-middle'>
                <Button onClick={afterSubmit} css={'py-4 mx-2'} text={'Submit'} />
                <Button onClick={() => { handleClose() }} css={'py-4 mx-2'} text={'Cancel'} color='error' />
            </div>
        </div>
    )
}

export default AddEditModel