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

export const AddClassSchema = Yup.object({
    class: Yup.string().min(1).required("Please enter class"),
});

export const  addStudentSchema = Yup.object({
    name: Yup.string().min(3).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    type: Yup.string().required("Please enter your type "),
    country: Yup.string().min(3).required("Please enter your Country Name"),
    mobile:Yup.string().min(6).max(14).required("Please enter your number"),
    student_number:Yup.string().required("Please enter your number"),
    class_id:Yup.string().required("Please enter your class"),
});

export const addTeacherSchema=Yup.object({
    name: Yup.string().min(3).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    country: Yup.string().min(3).required("Please enter your Country Name"),
    mobile:Yup.string().min(6).max(14).required("Please enter your number"),
    // classes:Yup.string().required("Please enter your class"),
    license:Yup.string().required("Please enter your license number"),
    address:Yup.string().required("Please enter your address"),
    // course:Yup.string().required("Please enter your course"),
    gender:Yup.string().required("Please enter your gender"),
    date_of_birth:Yup.string().required("Please enter your date of birth"),
})

export const addCourseSchema = Yup.object({
    course_name: Yup.string().min(3).required("Please enter course name"),
    course_code: Yup.string().min(3).required("Please enter course code"),
    class_id: Yup.string().required("Please select class"),
    credit_hours: Yup.number().min(1).required("Please enter credit hours"),
});

export const addUnitSchema = Yup.object({
    unit_name: Yup.string().min(3).required("Please enter unit name"),
    unit_code: Yup.string().min(3).required("Please enter unit code"),
    course_id: Yup.string().required("Please select course"),
    credit_hours: Yup.number().required("Please enter credit hours"),
});

export const addAssignment = Yup.object({
    title: Yup.string().required("Please enter assignment title"),
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