import { dataToJSON } from '../helpers/jsonConverter';

export const RequestValidator = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(400).json(
      dataToJSON(err).details.map((item: any) => ({
        message: item.message.replaceAll('"', ''),
        key: item.context.key,
      }))
    );
  }
};
