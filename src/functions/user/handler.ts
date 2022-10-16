import { connect } from "mongoose";
import { formatErrorResponse, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import UserModel, { MONGODB_URL } from "../../db/model";
import { APIGatewayProxyEvent } from "aws-lambda";

const find = async (event: APIGatewayProxyEvent) => {
  try {
    const id = event.pathParameters.id;

    await connect(MONGODB_URL);

    const user = await UserModel.findOne({ userId: id });

    if (!user) {
      throw new Error("User not found");
    }

    return formatJSONResponse({
      message: `successfully find a user`,
      user,
    });
  } catch (error) {
    return formatErrorResponse(
      {
        message: error.message ?? `Something when wrong during finding user`,
        error,
      },
      500
    );
  }
};

export const main = middyfy(find);
