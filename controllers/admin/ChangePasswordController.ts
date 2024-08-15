import { EncryptToken } from '../../helpers/decryptToken';
import { dataToJSON } from '../../helpers/jsonConverter';
import { mst_admin_users } from '../../models/mst_admin_users';

export default async function ChangePassword(req, res) {
  try {
    const user_data: any = await mst_admin_users.findOne({
      where: {
        user_email: req.token_data.user_email,
      },
    });
    if (!!!user_data) {
      return res.status(404).json([{ message: 'User not found!' }]);
    } else {
      user_data
        .validateUserPassword(req.body.curr_password)
        .then(async (msg) => {
          if (msg) {
            user_data.user_password = req.body.new_password;
            return res.status(200).json({
              message: 'Password changed successfully',
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
