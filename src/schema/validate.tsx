import * as Yup from "yup";


// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// export const singUpSchema = Yup.object({
//     firstName: Yup.string().min(3).max(25).required("Please enter your firstname"),
//     lastName: Yup.string().min(3).max(25).required("Please enter your lastname"),
//     address: Yup.string().min(3).max(25).required("Please enter your address"),
//     email: Yup.string().email().required("Please enter your email"),
//     phone: Yup.string().min(10).max(10).required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid'),
//     password: Yup.string().min(6)
//         .required("Please enter your password")
//         .matches(/^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Password must contain at least one uppercase, one number and one special case character"),
//     cpassword: Yup.string().required("Please enter your password").oneOf([Yup.ref('password')], "Password must match")

// });

export const loginUpSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6)
        .required("Please enter your password")
        .matches(/^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Password must contain at least one uppercase, one number and one special case character")

});

export const  addStudentSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your Product Name"),
    email: Yup.string().email().required("Please enter your email"),
    type: Yup.string().required("Please enter your type "),
    country: Yup.string().min(3).required("Please enter your Country Name"),
    mobile:Yup.number().min(10).max(10).required("Please enter your number"),
    studentnumber:Yup.string().required("Please enter your number")
});

// export const billlingDetailSchema = Yup.object({
//     name: Yup.string().min(3).required("Please enter your Product Name"),
//     phone: Yup.string().min(10).max(10).required("Please enter your phone number").matches(phoneRegExp, 'Phone number is not valid'),
//     address: Yup.string().min(3).required("Please enter address"),
//     email: Yup.string().email().required("Email required"),
//     city: Yup.string().min(3).required("Please enter your city"),
//     state: Yup.string().min(3).required("Please enter your state"),
//   date:Yup.string(),
//   paymentType: Yup.string().required("Please select payment type"),
// });