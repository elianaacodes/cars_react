import React from 'react';
import Button from './Button';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useSelector } from 'react-redux';


interface CarInfoProps {
  id?: string;
}

const CarInfo = (props: CarInfoProps) => {
  console.log(props,"props")
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const store = useSelector((state) => state); // Replace with your actual state selector

  const onSubmit = async (data: any, event: any) => {
    console.log(`VIN: ${props.id}`);
    console.log(data);

    if (props.id) {
      server_calls.update(props.id, data);
      console.log(`Updated: ${data.vin} ${props.id}`);
      setTimeout(() => {
        window.location.reload();
      }, 100000);
      event.target.reset();
    } else {
      await server_calls.create(data);
      setTimeout(() => { window.location.reload() }, 1000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-wrap min-w-full min-h-full">
      <label htmlFor="VIN">VIN</label>
        <Input
          {...register('vin', { required: true })}
          placeholder='vin'
        />
        <label htmlFor="Make">Make</label>
        <Input
          {...register('make', { required: true })}
          placeholder='make'
        />
        <label htmlFor="Model">Model</label>
        <Input
          {...register('model', { required: true })}
          placeholder='model'
        />
        <label htmlFor="Year">Year</label>
        <Input
          {...register('year', { required: true })}
          placeholder='Year'
        />
        <label htmlFor="Color">Color</label>
        <Input
          {...register('color', { required: true })}
          placeholder='Color'
        />
        <Button>{props.id ? 'Update Car' : 'Create Car'}</Button>
      </form>
    </div>
  );
};

export default CarInfo;
