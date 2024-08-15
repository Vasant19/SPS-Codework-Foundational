import moment = require('moment');
import { mst_users_log } from '../../models/mst_users_log';
import { dataToJSON } from '../../helpers/jsonConverter';

export default async function Dashboard(req, res) {
  if (req?.token_data?.is_admin) {
    try {
      const user_data: any = await mst_users_log.findAll({
        attributes: ['user_log_id', 'check_in_time'],
      });

      const LogData = dataToJSON(user_data);
      const total_data = LogData.length;
      const yesterday_data = LogData.filter(
        (item) =>
          moment().subtract(1, 'day').startOf('day') <
            moment(item.check_in_time) &&
          moment().subtract(1, 'day').endOf('day') > moment(item.check_in_time)
      ).length;
      const seven_days_data = LogData.filter(
        (item) =>
          moment().subtract(7, 'day').startOf('day') <
            moment(item.check_in_time) &&
          moment().endOf('day') > moment(item.check_in_time)
      ).length;
      const today_data = LogData.filter(
        (item) =>
          moment().startOf('day') < moment(item.check_in_time) &&
          moment().endOf('day') > moment(item.check_in_time)
      ).length;
      return res
        .status(200)
        .json({ total_data, today_data, yesterday_data, seven_days_data });
    } catch (error) {
      return res.status(500).json([{ message: 'Something went wrong' }]);
    }
  } else {
    res.status(401).json([{ message: 'Token invalid' }]);
  }
}
