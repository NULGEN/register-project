import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import Success from "./Success";
//import { useHistory } from 'react-router-dom';

const initialValues = {
    ad: "",
    soyad: "",
    email: "",
    password: "",
   // terms: false,

}
const errorMessages = {
  ad:"İsim alanı en az 3 karakter olmalıdır ",
  soyad: "Soyad alanı en az 3 karakter olmalıdır  ",
  email: "Geçerli bir email adresi yazınız.",
  password: "En az 8 karakter, en az 1 büyük harf, küçük harf, en az 1 sembol ve rakam içermelidir ",
  
}


export default function Register(){


    const [formData, setFormData] = useState(initialValues);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
      ad: false,
      soyad: false,
      password: false,
      email: false,
     //terms: false,
    });

    //const history = useHistory();

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    let regex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/; 
   
  
    useEffect(()=>{
      if(validateEmail(formData.email) && 
         formData.ad.trim()>=3 && 
         formData.soyad.trim()>=3 &&
         regex.test(formData.password)
         /*&&*formData.terms*/)
        {
           setIsValid(true);
        }
      else{
        setIsValid(false);
      }
    }, [formData]);

    const handleChange = (event) =>{
        const {name, value, /*type, checked*/} = event.target;
       // value = type == "checkbox" ? checked : value;
        setFormData({...formData, [name]: value});

        if(name ==="ad"|| name==="soyad"){
          if(value.trim().length>=3){
            setErrors({...errors, [name]: false});
          }else{
            setErrors({...errors,[name]:true});
          }

        }
            
        if(name ==="email"){
            if(validateEmail(value)){
              setErrors({...errors, [name]: false});
            }else{
              setErrors({...errors,[name]:true});
            }
        }
        if(name ==="password"){
          if (regex.test(value)) { 
            setErrors({...errors, [name]: false});
          }else{
            setErrors({...errors, [name]: true});
          }
      }
      /*if (name === 'terms') {
        if (value) {
          setErrors({ ...errors, [name]: false });
        } else {
          setErrors({ ...errors, [name]: true });
        }
      }*/

        
    }

    const handleSubmit = (event) =>{
      event.preventDefault();
      if(!isValid) return;

      axios.post("https://regres.in/api/users", formData)
      .then((response)=>{
        setFormData(initialValues);
      })
      .catch((error)=>{
        console.warn(error);
        //history.push("/")
      })

      
    }

    return(
        <Card>
            <CardHeader>
                Kayıt Ol
            </CardHeader>
            <CardBody>
               <Form onSubmit={handleSubmit}>
                 <FormGroup>
                 <Label for="ad"> Ad:
                 </Label>
                 <Input
                 id="ad"
                 name="ad"
                 placeholder="Adınızı Giriniz"
                 type="text"
                 onChange={handleChange}
                 value= {formData.ad}
                 invalid= {errors.ad}
                 />
                 {errors.ad &&<FormFeedback>{errorMessages.ad}</FormFeedback>}
                 </FormGroup>

                 <FormGroup>
                 <Label for="soyad"> Soyad:
                 </Label>
                 <Input
                     id="soyad"
                     name="soyad"
                     placeholder="Soyadınızı Giriniz"
                     type="text"
                     onChange={handleChange}
                     value = {formData.soyad}
                     invalid= {errors.soyad}
                  />
                 {errors.soyad && <FormFeedback>{errorMessages.soyad}</FormFeedback>}
                 </FormGroup>
                 <FormGroup>
                 <Label for="email">
                   Email
                  </Label>
                  <Input
                  id="email"
                  name="email"
                  placeholder="Kurumsal email adresinizi giriniz"
                  type="email"
                  onChange={handleChange}
                  value = {formData.email}
                  invalid= {errors.email}
                  />
                 {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
                 </FormGroup>
                 <FormGroup>
                <Label for="password">
                  Password
                </Label>
                <Input
                   id="password"
                   name="password"
                   placeholder="Güçlü bir şifre seçiniz"
                   type="password"
                   onChange={handleChange}
                   value= {formData.password}
                   invalid= {errors.password}
                   />
                   {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
                 </FormGroup>
                 <Button disabled={!isValid}>
                   Kayıt Ol
                 </Button>
                 </Form>
                 </CardBody>
      
                 </Card>
    );
}

/*  <FormGroup check>
                  <Input
                   type="checkbox"
                   name="terms"
                   id="terms"
                   checked={formData.terms}
                   onChange={handleChange}
                   invalid={errors.terms}
                  />{' '}
                 <Label htmlFor="terms" check>
                   I agree to terms of service and privacy policy{' '}
                 </Label>
                 </FormGroup>*/