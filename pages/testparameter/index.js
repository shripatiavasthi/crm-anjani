import * as React from 'react';
import DataGrid from '../../components/DataGrid'
import { useSelector, useDispatch } from 'react-redux'
import { getCity, deleteCity } from '../../feature/citySlice'
import { getTestParam} from '../../feature/testParaSlice'
import Dashboard from '../../components/DashboardView'
import Modal from '../../components/Modal'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddEditModel from '../../components/Testparameter/AddEditModal';
import Button from '../../components/Button'



export default function MiniDrawer() {
  const dispatch = useDispatch()

  const [modalState, setmodalState] = React.useState(false)
  const [EditableId, setEditableId] = React.useState(null)
  const [Add, setAdd] = React.useState(false)

  const handleClose = () => setmodalState(false)
  const handleOpen = () => setmodalState(true)

  React.useEffect(() => {
    dispatch(getTestParam())
  }, [])

  const TestParam = useSelector(state => state.testpara.TestParam)

  console.log(TestParam,"here")
  const columns = [
    {
      field: 'title',
      headerName: 'Test Parameter',
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
           await dispatch(deleteCity(data))
           await dispatch(getCity())
          }} className='mx-2 cursor-pointer'><DeleteForeverIcon /></span>
        </div>
      ),
    }
  ];

  return (
    <Dashboard title='Cities'>
      <Modal open={modalState} handleClose={handleClose} handleOpen={handleOpen} >
        <AddEditModel Add={Add} EditableId={EditableId} handleClose={handleClose} />
      </Modal>
      <div className='flex justify-end border-red-700'>
        <Button onClick={() => { handleOpen(), setEditableId(null), setAdd(true) }} color='error' css={'py-4'} text={'+ ADD'} />
      </div>
      <DataGrid columns={columns} data={TestParam ?? []} />
    </Dashboard>
  );
}