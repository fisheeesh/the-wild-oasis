import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner"
import Empty from '../../ui/Empty'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

import { useMoveBack } from "../../hooks/useMoveBack";
import { statusToTagName } from "../../utils/constants";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from './useDeleteBooking'
import usePageTitle from "../../hooks/usePageTitle";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate()
  const { booking, bookingLoading, bookingError } = useBooking();
  const { checkout, isCheckingout } = useCheckout()
  const { deleteBooking, isDeletingBooking } = useDeleteBooking()

  usePageTitle(`Booking #${booking?.id}`)

  const moveBack = useMoveBack();

  if (bookingLoading) return <Spinner />

  if (bookingError) return <Empty resourceName={'booking'} />

  const { status, id: bookingId } = booking



  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          <Modal.Open opens={'delete-booking'}>
            <Button variation='danger' disabled={isDeletingBooking}>
              Delete
            </Button>
          </Modal.Open>

          {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check In</Button>}
          {status === 'checked-in' && <Button disabled={isCheckingout} onClick={() => { checkout(bookingId) }}>Check Out</Button>}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name={'delete-booking'}>
          <ConfirmDelete resourceName={`Booking #${bookingId}`} disabled={isDeletingBooking} onConfirm={() => {
            deleteBooking(bookingId, {
              onSuccess: () => {
                moveBack()
              }
            })
          }} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
