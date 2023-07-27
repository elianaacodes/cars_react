import Button from "./Button"
import Input from "./Input"
import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux';
import { chooseVIN, chooseMake, chooseModel, chooseYear, chooseColor } from "../redux/slices/RootSlice";

interface CarInfoProps {
  vin?: string; // Change the ID type to string
}

const CarInfo = (props: CarInfoProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`VIN: ${props.vin}`);
    console.log(data);

    if (props.vin) {
      // Use VIN as the ID when updating
      server_calls.update(props.vin, data)
      console.log(`Updated: ${data.vin} ${props.vin}`)
      setTimeout(() => { window.location.reload() }, 5000);
      event.target.reset();
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseVIN(data.vin));
      dispatch(chooseMake(data.make));
      dispatch(chooseModel(data.model));
      dispatch(chooseYear(data.year));
      dispatch(chooseColor(data.color));
      server_calls.create(store.getState())
      setTimeout(() => { window.location.reload() }, 5000);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-wrap min-w-full min-h-full">
        {/* Your form fields and submit button */}
      </form>
    </div>
  )
}

export default CarInfo;