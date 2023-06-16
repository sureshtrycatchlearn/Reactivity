import {  useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props{
    placeholder:string;
    name:string;
    options:any;
    lable?:string;
}

export default function MySelectInput(props:Props){
    const [field, meta, helpers] = useField(props.name)
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.lable}</label>
            <Select 
            clearable
            options={props.options} 
            value={field.value|| null}
            onChange={(e,d)=>helpers.setValue(d.value)}
            onBlur={()=>helpers.setTouched(true)}
            placeholder='placeholder'
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            )  : null}
        </Form.Field>
    )
}