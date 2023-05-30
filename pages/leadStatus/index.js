import * as React from 'react';
import DataGrid from '../../components/DataGrid'
import { useSelector, useDispatch } from 'react-redux'
import { getCity, deleteCity } from '../../feature/citySlice'
import { getstatusleads,delleadStatusbyId } from '../../feature/leadSlice'
import Dashboard from '../../components/DashboardView'
import Modal from '../../components/Modal'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddEditModel from '../../components/LeadStatus/AddEditModal';
import Button from '../../components/Button'



export default function MiniDrawer() {
  const dispatch = useDispatch()

  const [modalState, setmodalState] = React.useState(false)
  const [EditableId, setEditableId] = React.useState(null)
  const [Add, setAdd] = React.useState(false)

  const handleClose = () => setmodalState(false)
  const handleOpen = () => setmodalState(true)

  React.useEffect(() => {
    dispatch(getstatusleads())
  }, [])

  const leadList = useSelector(state => state.lead.LeadStatus)

  const columns = [
    {
      field: 'leadStatus',
      headerName: 'Lead Status',
      type: 'String',
      flex: 1,
    },
    {
      headerName: 'Action',
      width: 180,
      renderCell: (param) => (
        <div>
          {/* <span onClick={() => { handleOpen(), console.log(param.row) }} className='mx-2 cursor-pointer'><AddCircleOutlineIcon /></span> */}
          <span onClick={() => { handleOpen(), setEditableId(param.row._id), setAdd(false) }} className='mx-2 cursor-pointer'><ModeEditIcon /></span>
          <span onClick={ async () => {
            const data = {
              body: {
                id: param.row._id
              }
            }
           await dispatch(delleadStatusbyId(data))
           await dispatch(getstatusleads())
          }} className='mx-2 cursor-pointer'><DeleteForeverIcon /></span>
        </div>
      ),
    }
  ];

  return (
    <Dashboard title='Lead Status'>
      <Modal open={modalState} handleClose={handleClose} handleOpen={handleOpen} >
        <AddEditModel Add={Add} EditableId={EditableId} handleClose={handleClose} />
      </Modal>
      <div className='flex justify-end border-red-700'>
        <Button onClick={() => { handleOpen(), setEditableId(null), setAdd(true) }} color='error' css={'py-4'} text={'+ ADD'} />
      </div>
      <DataGrid columns={columns} data={leadList ?? []} />
    </Dashboard>
  );
}