import { mst_users_log } from '../../models/mst_users_log';

export default async function DeleteLog(req, res) {
  try {
    // Get exiting user name from database
    console.log('🚀 => req.body.customer_id', req.body.customer_id);
    const customer: any = await mst_users_log.destroy({
      where: { user_log_id: req.body?.user_log_id },
    });
    if (customer) {
      return res.status(200).json({
        message: 'Deleted Log Successfully',
      });
    } else {
      return res.status(404).json([
        {
          message: 'Log do not exist.',
        },
      ]);
    }
  } catch (error) {
    console.log('🚀 => DeleteLog => error', error);
    // Response send with error
    return res.status(500).json([{ message: 'Something went wrong' }]);
  }
}
