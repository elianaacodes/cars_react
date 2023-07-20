import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux';
import { chooseVIN, chooseMake, chooseModel, chooseYear, chooseColor} from "../redux/slices/RootSlice";

// interfaces

interface CarInfoProps {
  id?: string[]
}

const CarInfo = (props: CarInfoProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.vin } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 500);
      event.target.reset()
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseVIN(data.vin));
      dispatch(chooseMake(data.make));
      dispatch(chooseModel(data.model));
      dispatch(chooseYear(data.year));
      dispatch(chooseColor(data.color));

      server_calls.create(store.getState())
      setTimeout( () => {window.location.reload()}, 500);
    }
    
  }

  return (


    <div >
      <form onSubmit={handleSubmit(onSubmit)} className="flex-wrap min-w-full min-h-full">
        <div >
          <label htmlFor="vin">VIN</label>
          <Input {...register('vin')} type="text" pattern="^[a-zA-Z0-9]+$" name='vin' placeholder="VIN"/>
        </div>
        <div>
          <label htmlFor="make">Make</label>
          <Input {...register('make')} type="text" pattern=" " name='make' placeholder="Make"/>
        </div>
        <div >
          <label htmlFor="model">Model</label>
          <Input {...register('model')} type="text" pattern="any" name='model' placeholder="Model"/>
        </div>
        <div >
          <label htmlFor="year">Year</label>
          <Input {...register('year')} type="text" pattern="[0-9]*"  name='year' placeholder="Year"/>
        </div>
        <div >
          <label htmlFor="color">Color</label>
          <Input {...register('color')} type="text" pattern="any" name='color' placeholder="Color"/>
        </div>
        <div className="flex p-1">
          <Button
            className="flex justify-items-center items-center m-2 bg-slate-500 p-2 rounded  hover:bg-slate-700 text-white"
            >
              Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CarInfo