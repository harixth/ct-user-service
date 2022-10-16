import { connect } from "mongoose";
import {
  formatErrorResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import UserModel, { MONGODB_URL } from "../../db/model";

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    await connect(MONGODB_URL);

    const { userId, name } = event.body;

    const newUser = new UserModel({
      userId,
      name,
    });

    const user = await newUser.save();

    return formatJSONResponse({
      message: `successfully created new user`,
      user,
    });
  } catch (error) {
    let message = error.message ?? `Something when wrong during creating user`;
    return formatErrorResponse(
      {
        message,
        error,
      },
      500
    );
  }
};

export const main = middyfy(create);
