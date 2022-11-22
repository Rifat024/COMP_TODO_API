import { AppConfig } from "../commons/environment/appconfig";
import { validateRequestFields } from "../commons/utils/validateUtils";
import { currentDateTime, lockExpiryTime } from "../commons/constants";
import { apiResponse, apiError } from "../commons/http-helpers/api-response";
import { v4 as uuidv4 } from "uuid";
import {
    addRecord, getRecord,
} from "../commons/utils/dbMgmt";
import { log as parentLogger } from "../commons/utils/logger";
export const addTodo = async (record) => {
    let recordObj = JSON.parse(record["body"]);
    let requiredFileds = ["todoId", "title"];
    recordObj.todoId = uuidv4();
    // const validationResponse = validateRequestFields(recordObj, requiredFileds);
    // if (validationResponse === true) {
        let addResponse = await addRecord(
            recordObj,
            requiredFileds,
            AppConfig.DBT_TODO_INFO
        );
    // }
    if (addResponse != null && addResponse.statusCode == "200") {
        // let getResponse = await getApiHistoryCore(recordObj);
        // console.log(`getResponse:: ${getResponse.body.Items[0]}`);
        const params = {
            TableName: AppConfig.DBT_TODO_INFO,
            KeyConditionExpression: "todoId = :todoId",
            ExpressionAttributeValues: {
              ":todoId": recordObj.todoId,
            },
        };
       const response=await getRecord(params); 

        return apiResponse(response);
    } else {
        return apiError(500, addResponse);
    }

  };
