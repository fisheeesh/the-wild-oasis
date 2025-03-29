/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabinFormFields } from "../../utils/zSchema";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: isEditSession ? editValues : {},
    resolver: zodResolver(createCabinFormFields)
  })

  const queryClient = useQueryClient()

  const { mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created.')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: err => toast.error(err.message)
  })

  const { mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited.')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: err => toast.error(err.message)
  })

  const onCreateCabin = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    if (isEditSession) {
      const newCabin = {
        name: data.name,
        maxCapacity: data.maxCapacity,
        regularPrice: data.regularPrice,
        discount: data.discount,
        description: data.description,
        image: data.editImage[0] ? data.editImage[0] : data.image
      }
      editCabin({ newCabinData: newCabin, id: editId })
    }
    else {
      createCabin({ ...data, image: data.image[0] })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onCreateCabin)}>
      <FormRow label="Cabin name" errorMessage={errors?.name?.message}>
        <Input disabled={isSubmitting} type="text" id="name" {...register('name')} />
      </FormRow>

      <FormRow label={'Max Capacity'} errorMessage={errors?.maxCapacity?.message}>
        <Input disabled={isSubmitting} type="number" id="maxCapacity" {...register("maxCapacity", { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Regular price'} errorMessage={errors?.regularPrice?.message}>
        <Input disabled={isSubmitting} type="number" id="regularPrice" {...register('regularPrice', { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Discount'} errorMessage={errors?.discount?.message}>
        <Input disabled={isSubmitting} type="number" id="discount" defaultValue={0} {...register('discount', { valueAsNumber: true })} />
      </FormRow>

      <FormRow label={'Description'} errorMessage={errors?.description?.message}>
        <Textarea disabled={isSubmitting} type="number" id="description" defaultValue="" {...register('description')} />
      </FormRow>

      <FormRow label={'Cabin photo'} errorMessage={errors?.image?.message}>
        <FileInput disabled={isSubmitting} id="image" accept="image/*" {...register(isEditSession ? 'editImage' : 'image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSubmitting} variation="secondary" type="reset">
          Cancel
        </Button>
        {isEditSession ? <Button disabled={isSubmitting}>{isSubmitting ? 'Editing...' : 'Edit cabin'}</Button> : <Button disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create new cabin'}</Button>}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;