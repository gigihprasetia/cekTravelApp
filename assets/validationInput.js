import * as Yup from 'yup';

export const validationLogin = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('required').min(6, 'to short'),
});
