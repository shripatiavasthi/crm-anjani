import * as React from 'react';
import DataGrid from '../../components/DataGrid'
import { useSelector, useDispatch } from 'react-redux'
import { getTest } from '../../feature/testSlice'
import Dashboard from '../../components/DashboardView'
import Modal from '../../components/Modal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddEditModel from '@/components/Leads/AddEditModel';
import Button from '../../components/Button'



export default function MiniDrawer() {
  const dispatch = useDispatch()
  const [modalState, setmodalState] = React.useState(false)
  const [EditableId, setEditableId] = React.useState(null)
  const [Add, setAdd] = React.useState(false)

  const handleClose = () => setmodalState(false)
  const handleOpen = () => setmodalState(true)

  React.useEffect(() => {
    dispatch(getTest())
  }, [])

  const leads = useSelector(state => state.lead.LeadDetails)

  const columns = [
    {
      field: 'phoneNumber',
      headerName: 'Number',
      type: 'Number',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'String',
      flex: 1,
    },
    {
      field: 'city',
      headerName: 'City',
      type: 'String',
      valueGetter: ({ row }) => {
        return row?.city?.cityName
      },
      flex: 1,
    },
    {
      field: 'leadStatus',
      headerName: 'Status',
      type: 'String',
      valueGetter: ({ row }) => {
        return row?.leadStatus?.leadStatus
      },
      flex: 1,
    },
    {
      field: 'url',
      headerName: 'Url',
      type: 'String',
      flex: 1,
    },
    {
      field: 'leadSource',
      headerName: 'Source',
      type: 'String',
      flex: 1,
    },
    {
      field: 'pending',
      headerName: 'Next Update On',
      type: 'String',
      flex: 1,
    },
    {
      headerName: 'Action',
      width: 180,
      renderCell: (param) => (
        <div>
          {/* <span onClick={() => { handleOpen(), console.log(param.row) }} className='mx-2 cursor-pointer'><AddCircleOutlineIcon /></span> */}
          <span onClick={() => { handleOpen(), setEditableId(param.row._id),setAdd(false) }} className='mx-2 cursor-pointer'><ModeEditIcon /></span>
          <span  onClick={async () => {
            const data = {
              body: {
                id: param.row._id
              }
            }
           await dispatch(deleteleads(data))
           await dispatch(getleads())
          }} className='mx-2 cursor-pointer'><DeleteForeverIcon /></span>
        </div>
      ),
    }
  ];

  return (
    <Dashboard title='Leads'>
      <Modal heading={'ADD LEAD'} width={600} open={modalState} handleClose={handleClose} handleOpen={handleOpen} >
        <AddEditModel Add={Add} handleClose={handleClose} EditableId={EditableId} />
      </Modal>
      <div className='flex justify-end border-red-700'>
        <Button onClick={() => {handleOpen(),setAdd(true)}} color='error' css={'py-4'} text={'+ ADD'}/>
      </div>
      <DataGrid columns={columns} data={leads} />
    </Dashboard>
  );
}