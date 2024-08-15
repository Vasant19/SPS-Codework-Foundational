import { EncryptToken } from '../../helpers/decryptToken';
import { dataToJSON } from '../../helpers/jsonConverter';
import { mst_admin_users } from '../../models/mst_admin_users';

export default async function Login(req, res) {
  try {
    const user_data: any = await mst_admin_users.findOne({
      where: {
        user_email: req.body.email,
      },
    });
    if (!!!user_data) {
      return res.status(404).json([{ message: 'User not found!' }]);
    } else {
      user_data.validateUserPassword(req.body.password).then(async (msg) => {
        if (msg) {
          const token = EncryptToken({
            ...dataToJSON(user_data),
            is_admin: true,
          });
          return res.status(200).json({
            message: 'Login successfull',
            auth_token: token,
            full_name: user_data.user_full_name,
          });
        } else {
          return res.status(401).json([{ message: 'Invalid Credentials' }]);
        }
      });
    }
  } catch (error) {
    return res.status(500).json([{ message: 'Something went wrong' }]);
  }
}
