import { Op } from 'sequelize';
import { getPagination } from '../../helpers/getPagination';
import { mst_users_log } from '../../models/mst_users_log';
import moment = require('moment');

export default async function ListVehicles(req, res) {
  if (req?.token_data?.is_admin) {
    try {
      const { limit, offset } = getPagination(req.body);
      const whereClause: any = {
        user_car_no: { [Op.like]: `%${req.body?.search_keyword ?? ''}%` },
      };
      if (req?.body?.start_date && req?.body?.end_date) {
        whereClause.check_in_time = {
          [Op.gt]: moment(req?.body?.start_date)
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
          [Op.lt]: moment(req?.body?.end_date)
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss'),
        };
      }
      const user_data: any = await mst_users_log.findAndCountAll({
        limit,
        offset,
        //   attributes: ['user_log_id', 'check_in_time'],
        where: whereClause,
        order: [['check_in_time', 'DESC']],
      });
      return res.status(200).json({
        total_pages: Math.ceil(user_data.count / limit),
        list: user_data.rows,
      });
    } catch (error) {
      return res.status(500).json([{ message: 'Something went wrong' }]);
    }
  } else {
    res.status(401).json([{ message: 'Token invalid' }]);
  }
}
