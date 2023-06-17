import { ErrorMessage, Form, Formik } from "formik";
import { values } from "mobx";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { error } from "console";

export default observer( function LoginForm(){
    const {userStore}=useStore();
    return(
        <Formik initialValues={{email:'', password:'', error:null }}
        onSubmit={(values, {setErrors})=> userStore.login(values).catch(error=>
        setErrors({error:'Invalid email or pasword'}))}>

            {({handleSubmit, isSubmitting, errors})=>(
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage
                        name='error'
                        render={() =>
                            <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})