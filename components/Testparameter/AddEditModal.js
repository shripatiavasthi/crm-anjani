import React, { useState } from 'react'
import TextField from '../TextField';
import DropdownList from '../DropdownList';
import { postCity,getCityById,getCity,patchCityById } from "../../feature/citySlice";
import { postTestParameter,getTestParam } from "../../feature/testParaSlice";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button'

function AddEditModel(props) {
    const { handleClose,EditableId,Add } = props
    const [cityName, setcityName] = useState("")
    const editCityData = useSelector(state => state.city.cityToEdit)
    const dispatch = useDispatch()

    console.log(EditableId,"here")

    React.useEffect(() => {
        if(EditableId !== "" && Add == false){
            const data = {
                body : {
                    id : EditableId
                }
            }
            dispatch(getCityById(data))
        }else if(Add){
            setcityName('')
        }
        
    }, [EditableId])

    React.useEffect(() => {
        if(editCityData && Add == false){
            setcityName(editCityData?.cityName)
        }
    }, [editCityData])

    const afterSubmit = async () => {
        if (cityName && cityName.trim() !== "" && Add) {
            const data = {
                body: {
                    title : cityName
                }
            }
            await dispatch(postTestParameter(data))
            await dispatch(getTestParam())
            handleClose()
        }else if(!Add){
            dispatch(patchCityById(data))
        }
    }

    const onChange = (e) => {
        setcityName(e.target.value)
    }

    return (
        <div>
            <TextField value={cityName} onChange={onChange} label='Test Parameter' />
            <div className='flex justify-center align-middle'>
                <Button onClick={afterSubmit} css={'py-4 mx-2'} text={'Submit'} />
                <Button onClick={() => { handleClose() }} css={'py-4 mx-2'} text={'Cancel'} color='error' />
            </div>
        </div>
    )
}

export default AddEditModel