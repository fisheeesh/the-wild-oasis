import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateEditCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens='cabin-form'>
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name='cabin-form'>
                <CreateEditCabinForm />
            </Modal.Window>

            {/* <Modal.Open opens='table'>
                <Button>Show Tables</Button>
            </Modal.Open>
            <Modal.Window name='table'>
                <CabinTable />
            </Modal.Window> */}
        </Modal>
    )
}


// export default function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(prev => !prev)}>Create a new Cabin</Button>
//             {
//                 isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateEditCabinForm onCloseModal={() => setIsOpenModal(false)} />
//                 </Modal>
//             }
//         </div>
//     )
// }
